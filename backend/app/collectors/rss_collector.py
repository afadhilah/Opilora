"""
RSS News Collector — fetches articles from Indonesian news RSS feeds.
"""
import logging
from datetime import datetime, timezone

import feedparser
from bs4 import BeautifulSoup

from app.collectors.base import BaseCollector, CollectResult, RawMention

logger = logging.getLogger(__name__)

DEFAULT_FEEDS: list[dict] = [
    {
        "name": "Detik News",
        "url": "https://rss.detik.com/index.php/detikcom",
    },
    {
        "name": "Kompas",
        "url": "https://rss.kompas.com/kompas",
    },
    {
        "name": "CNN Indonesia",
        "url": "https://www.cnnindonesia.com/nasional/rss",
    },
    {
        "name": "Tirto",
        "url": "https://tirto.id/feed",
    },
]


def _strip_html(html: str) -> str:
    """Remove HTML tags and return plain text."""
    if not html:
        return ""
    soup = BeautifulSoup(html, "lxml")
    return soup.get_text(separator=" ", strip=True)


def _parse_published(entry) -> datetime:
    """Extract published datetime from an RSS entry."""
    if hasattr(entry, "published_parsed") and entry.published_parsed:
        from calendar import timegm

        ts = timegm(entry.published_parsed)
        return datetime.fromtimestamp(ts, tz=timezone.utc)
    if hasattr(entry, "updated_parsed") and entry.updated_parsed:
        from calendar import timegm

        ts = timegm(entry.updated_parsed)
        return datetime.fromtimestamp(ts, tz=timezone.utc)
    return datetime.now(timezone.utc)


class RSSCollector(BaseCollector):
    """Collect articles from configurable RSS news feeds."""

    name = "rss_news"
    platform = "news"

    def __init__(self, feeds: list[dict] | None = None, max_per_feed: int = 30):
        super().__init__()
        self.feeds = feeds or DEFAULT_FEEDS
        self.max_per_feed = max_per_feed

    async def collect(self) -> CollectResult:
        mentions: list[RawMention] = []
        errors: list[str] = []

        for feed_cfg in self.feeds:
            feed_name = feed_cfg["name"]
            feed_url = feed_cfg["url"]
            try:
                parsed = feedparser.parse(feed_url)
                if parsed.bozo and not parsed.entries:
                    errors.append(f"[{feed_name}] Feed parsing error: {parsed.bozo_exception}")
                    continue

                count = 0
                for entry in parsed.entries[: self.max_per_feed]:
                    try:
                        title = getattr(entry, "title", "")
                        summary = _strip_html(getattr(entry, "summary", "") or getattr(entry, "description", ""))
                        content = f"{title}. {summary}" if summary else title

                        if not content or len(content.strip()) < 10:
                            continue

                        link = getattr(entry, "link", None)
                        author = getattr(entry, "author", feed_name)
                        published = _parse_published(entry)

                        mentions.append(
                            RawMention(
                                content=content.strip(),
                                author=author or feed_name,
                                author_id=f"rss_{feed_name.lower().replace(' ', '_')}",
                                platform=self.platform,
                                source_url=link,
                                published_at=published,
                                raw_data={
                                    "feed_name": feed_name,
                                    "feed_url": feed_url,
                                    "entry_id": getattr(entry, "id", link),
                                },
                            )
                        )
                        count += 1
                    except Exception as entry_err:
                        errors.append(f"[{feed_name}] Entry error: {entry_err}")

                logger.info("RSS feed '%s': collected %d entries.", feed_name, count)

            except Exception as feed_err:
                errors.append(f"[{feed_name}] Feed fetch error: {feed_err}")
                logger.warning("Failed to fetch RSS feed '%s': %s", feed_name, feed_err)

        return CollectResult(mentions=mentions, errors=errors)
