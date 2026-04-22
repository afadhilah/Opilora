"""
Upload Collector — parse CSV or JSON files into RawMention objects.
"""
import csv
import io
import json
import logging
from datetime import datetime, timezone

from app.collectors.base import CollectResult, RawMention

logger = logging.getLogger(__name__)

REQUIRED_CSV_HEADERS = {"content", "author", "platform"}


def parse_csv(text: str) -> CollectResult:
    """Parse CSV text with headers: content, author, platform, published_at (optional)."""
    mentions: list[RawMention] = []
    errors: list[str] = []

    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames:
        return CollectResult(errors=["CSV file is empty or has no headers."])

    headers = {h.strip().lower() for h in reader.fieldnames}
    missing = REQUIRED_CSV_HEADERS - headers
    if missing:
        return CollectResult(errors=[f"Missing required CSV headers: {', '.join(missing)}"])

    for i, row in enumerate(reader, start=2):  # line 1 = headers
        try:
            content = (row.get("content") or "").strip()
            author = (row.get("author") or "").strip()
            platform = (row.get("platform") or "").strip()

            if not content or not author or not platform:
                errors.append(f"Row {i}: missing required field (content/author/platform).")
                continue

            published_raw = (row.get("published_at") or "").strip()
            if published_raw:
                try:
                    published = datetime.fromisoformat(published_raw)
                    if published.tzinfo is None:
                        published = published.replace(tzinfo=timezone.utc)
                except ValueError:
                    published = datetime.now(timezone.utc)
            else:
                published = datetime.now(timezone.utc)

            mentions.append(
                RawMention(
                    content=content,
                    author=author,
                    author_id=row.get("author_id", "").strip() or None,
                    platform=platform,
                    source_url=row.get("source_url", "").strip() or None,
                    published_at=published,
                    likes=int(row.get("likes", 0) or 0),
                    shares=int(row.get("shares", 0) or 0),
                    comments=int(row.get("comments", 0) or 0),
                )
            )
        except Exception as exc:
            errors.append(f"Row {i}: {exc}")

    logger.info("CSV upload: parsed %d mentions, %d errors.", len(mentions), len(errors))
    return CollectResult(mentions=mentions, errors=errors, source_name="csv_upload")


def parse_json(text: str) -> CollectResult:
    """Parse JSON array of mention objects."""
    mentions: list[RawMention] = []
    errors: list[str] = []

    try:
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        return CollectResult(errors=[f"Invalid JSON: {exc}"])

    if not isinstance(data, list):
        return CollectResult(errors=["JSON root must be an array of mention objects."])

    for i, item in enumerate(data):
        try:
            if not isinstance(item, dict):
                errors.append(f"Item {i}: not a JSON object.")
                continue

            content = (item.get("content") or "").strip()
            author = (item.get("author") or "").strip()
            platform = (item.get("platform") or "").strip()

            if not content or not author or not platform:
                errors.append(f"Item {i}: missing required field (content/author/platform).")
                continue

            published_raw = item.get("published_at")
            if published_raw:
                try:
                    published = datetime.fromisoformat(str(published_raw))
                    if published.tzinfo is None:
                        published = published.replace(tzinfo=timezone.utc)
                except ValueError:
                    published = datetime.now(timezone.utc)
            else:
                published = datetime.now(timezone.utc)

            mentions.append(
                RawMention(
                    content=content,
                    author=author,
                    author_id=item.get("author_id"),
                    platform=platform,
                    source_url=item.get("source_url"),
                    published_at=published,
                    likes=int(item.get("likes", 0)),
                    shares=int(item.get("shares", 0)),
                    comments=int(item.get("comments", 0)),
                    raw_data=item.get("raw_data"),
                )
            )
        except Exception as exc:
            errors.append(f"Item {i}: {exc}")

    logger.info("JSON upload: parsed %d mentions, %d errors.", len(mentions), len(errors))
    return CollectResult(mentions=mentions, errors=errors, source_name="json_upload")
