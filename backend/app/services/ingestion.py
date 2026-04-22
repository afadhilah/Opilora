"""
Ingestion Service — validates, deduplicates, persists, and auto-analyses mentions.
"""
import logging
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.collectors.base import RawMention
from app.core.database import async_session
from app.models.mention import Mention
from app.models.sentiment import Sentiment
from app.models.topic import Topic
from app.models.collection_log import CollectionLog

logger = logging.getLogger(__name__)

MIN_CONTENT_LENGTH = 10


@dataclass
class IngestionResult:
    """Summary of a single ingestion batch."""

    total_received: int = 0
    saved: int = 0
    duplicates: int = 0
    analyzed: int = 0
    errors: int = 0
    error_details: list[str] = field(default_factory=list)


async def _match_topic(db: AsyncSession, content: str) -> UUID | None:
    """Try to match content against existing topic keywords."""
    result = await db.execute(select(Topic).where(Topic.is_active == True))
    topics = result.scalars().all()

    content_lower = content.lower()
    best_match: tuple[UUID | None, int] = (None, 0)

    for topic in topics:
        hits = sum(1 for kw in (topic.keywords or []) if kw.lower() in content_lower)
        if hits > best_match[1]:
            best_match = (topic.id, hits)

    return best_match[0] if best_match[1] > 0 else None


async def _auto_analyze(mention: Mention, db: AsyncSession) -> bool:
    """Run ML sentiment pipeline on a mention and persist the result."""
    try:
        from app.ml.pipeline import get_pipeline

        pipeline = get_pipeline()
        result = await pipeline.analyze(mention.content, include_aspects=False)

        sentiment = Sentiment(
            mention_id=mention.id,
            label=result.sentiment.label,
            score=result.sentiment.score,
            confidence=result.sentiment.confidence,
            emotion=result.emotion.emotion,
            emotion_score=result.emotion.score,
            model_version="auto-ingest",
        )
        db.add(sentiment)
        return True
    except Exception as exc:
        logger.warning("Auto-analyze failed for mention %s: %s", mention.id, exc)
        return False


async def ingest(
    raw_mentions: list[RawMention],
    collector_name: str,
    topic_id: UUID | None = None,
    auto_analyze: bool = True,
) -> IngestionResult:
    """
    Validate, deduplicate, save to database, and optionally analyse a batch of
    raw mentions.
    """
    result = IngestionResult(total_received=len(raw_mentions))
    start = time.monotonic()

    async with async_session() as db:
        for raw in raw_mentions:
            try:
                # --- Validation ---
                if not raw.content or len(raw.content.strip()) < MIN_CONTENT_LENGTH:
                    result.errors += 1
                    result.error_details.append(f"Content too short: '{raw.content[:30]}...'")
                    continue
                if not raw.author:
                    result.errors += 1
                    result.error_details.append("Missing author.")
                    continue

                # --- Deduplication ---
                content_hash = raw.content_hash
                dup = await db.execute(
                    select(Mention.id).where(Mention.content_hash == content_hash)
                )
                if dup.scalar_one_or_none() is not None:
                    result.duplicates += 1
                    continue

                # --- Topic matching ---
                resolved_topic_id = topic_id
                if resolved_topic_id is None:
                    resolved_topic_id = await _match_topic(db, raw.content)

                # --- Persist ---
                mention = Mention(
                    content=raw.content.strip(),
                    author=raw.author,
                    author_id=raw.author_id,
                    author_avatar=raw.author_avatar,
                    platform=raw.platform,
                    source_url=raw.source_url,
                    published_at=raw.published_at,
                    collected_at=datetime.now(timezone.utc),
                    likes=raw.likes,
                    shares=raw.shares,
                    comments=raw.comments,
                    content_hash=content_hash,
                    collection_source=collector_name,
                    raw_data=raw.raw_data,
                    topic_id=resolved_topic_id,
                )
                db.add(mention)
                await db.flush()  # get mention.id
                result.saved += 1

                # --- Auto-analyze ---
                if auto_analyze:
                    ok = await _auto_analyze(mention, db)
                    if ok:
                        result.analyzed += 1

            except Exception as exc:
                result.errors += 1
                result.error_details.append(str(exc))

        await db.commit()

    elapsed_ms = int((time.monotonic() - start) * 1000)

    # --- Log collection run ---
    async with async_session() as db:
        log = CollectionLog(
            collector_name=collector_name,
            status="success" if result.errors == 0 else ("partial" if result.saved > 0 else "failed"),
            mentions_collected=result.total_received,
            mentions_saved=result.saved,
            duplicates=result.duplicates,
            errors=result.errors,
            error_details={"details": result.error_details[:50]} if result.error_details else None,
            duration_ms=elapsed_ms,
            started_at=datetime.now(timezone.utc),
            finished_at=datetime.now(timezone.utc),
        )
        db.add(log)
        await db.commit()

    logger.info(
        "Ingestion '%s' complete — received=%d saved=%d dup=%d analyzed=%d errors=%d (%dms)",
        collector_name,
        result.total_received,
        result.saved,
        result.duplicates,
        result.analyzed,
        result.errors,
        elapsed_ms,
    )
    return result
