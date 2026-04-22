"""
Generic API Collector — fetches JSON payloads from HTTP endpoints.
"""
import json
import logging
import os
from datetime import datetime, timezone

import httpx

from app.collectors.base import BaseCollector, CollectResult, RawMention

logger = logging.getLogger(__name__)

DEFAULT_API_SOURCES: list[dict] = [
    {
        "name": "JSONPlaceholder Posts",
        "url": "https://jsonplaceholder.typicode.com/posts",
        "platform": "api_public",
        "content_field": "body",
        "author_field": "userId",
        "published_field": None,
        "source_url_field": "id",
        "max_items": 30,
    }
]


def _load_sources() -> list[dict]:
    """
    Load collector sources from OPILORA_API_SOURCES_JSON.

    Expected shape:
    [
      {
        "name": "Source Name",
        "url": "https://example.com/api/posts",
        "platform": "twitter|news|forum|...",
        "content_field": "text",
        "author_field": "author",
        "published_field": "published_at",
        "source_url_field": "url",
        "items_key": "data",
        "max_items": 50,
        "headers": {"Authorization": "Bearer ..."}
      }
    ]
    """
    raw = os.getenv("OPILORA_API_SOURCES_JSON", "").strip()
    if not raw:
        return DEFAULT_API_SOURCES

    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list) and parsed:
            return parsed
        logger.warning("OPILORA_API_SOURCES_JSON must be a non-empty JSON array.")
    except json.JSONDecodeError as exc:
        logger.warning("Invalid OPILORA_API_SOURCES_JSON: %s", exc)

    return DEFAULT_API_SOURCES


def _parse_datetime(value: str | None) -> datetime:
    if not value:
        return datetime.now(timezone.utc)

    try:
        dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except ValueError:
        return datetime.now(timezone.utc)


class APICollector(BaseCollector):
    """Collect mentions from configurable JSON API endpoints."""

    name = "api_sources"
    platform = "api"

    def __init__(self, sources: list[dict] | None = None, timeout_seconds: int = 20):
        super().__init__()
        self.sources = sources or _load_sources()
        self.timeout_seconds = timeout_seconds

    async def collect(self) -> CollectResult:
        mentions: list[RawMention] = []
        errors: list[str] = []

        async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
            for source in self.sources:
                src_name = source.get("name", "unknown_api")
                url = source.get("url")
                if not url:
                    errors.append(f"[{src_name}] Missing URL.")
                    continue

                try:
                    response = await client.get(url, headers=source.get("headers") or {})
                    response.raise_for_status()
                    payload = response.json()

                    items_key = source.get("items_key")
                    if items_key and isinstance(payload, dict):
                        payload = payload.get(items_key, [])
                    elif isinstance(payload, dict):
                        payload = payload.get("data") or payload.get("results") or []

                    if not isinstance(payload, list):
                        errors.append(f"[{src_name}] Payload is not a list.")
                        continue

                    content_field = source.get("content_field", "content")
                    author_field = source.get("author_field", "author")
                    published_field = source.get("published_field")
                    source_url_field = source.get("source_url_field", "url")
                    source_platform = source.get("platform", self.platform)
                    max_items = int(source.get("max_items") or 30)

                    count = 0
                    for item in payload[:max_items]:
                        if not isinstance(item, dict):
                            continue

                        content = str(item.get(content_field, "") or "").strip()
                        if len(content) < 10:
                            continue

                        author_raw = item.get(author_field)
                        author = str(author_raw) if author_raw is not None else src_name
                        published = _parse_datetime(str(item.get(published_field))) if published_field else datetime.now(timezone.utc)

                        source_ref = item.get(source_url_field)
                        source_url = None
                        if source_ref is not None:
                            source_ref_str = str(source_ref)
                            if source_ref_str.startswith("http://") or source_ref_str.startswith("https://"):
                                source_url = source_ref_str
                            else:
                                source_url = f"{url.rstrip('/')}/{source_ref_str}"

                        mentions.append(
                            RawMention(
                                content=content,
                                author=author,
                                author_id=str(item.get("author_id") or "") or None,
                                platform=source_platform,
                                source_url=source_url,
                                published_at=published,
                                likes=int(item.get("likes", 0) or 0),
                                shares=int(item.get("shares", 0) or 0),
                                comments=int(item.get("comments", 0) or 0),
                                raw_data={
                                    "source_name": src_name,
                                    "source_url": url,
                                    "api_item": item,
                                },
                            )
                        )
                        count += 1

                    logger.info("API source '%s': collected %d mentions.", src_name, count)

                except Exception as exc:
                    errors.append(f"[{src_name}] Request error: {exc}")
                    logger.warning("Failed API source '%s': %s", src_name, exc)

        return CollectResult(mentions=mentions, errors=errors)
