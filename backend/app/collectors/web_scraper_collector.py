"""
Web Scraper Collector — fetches configured web pages and extracts article text.
"""
import json
import logging
import os
from datetime import datetime, timezone

import httpx
from bs4 import BeautifulSoup

from app.collectors.base import BaseCollector, CollectResult, RawMention

logger = logging.getLogger(__name__)

DEFAULT_SCRAPER_TARGETS: list[dict] = [
    {
        "name": "Kompas Trending",
        "url": "https://www.kompas.com/tren",
        "platform": "web_news",
        "content_selector": "h1, h2, p",
        "max_paragraphs": 20,
    }
]


def _load_targets() -> list[dict]:
    """Load targets from OPILORA_SCRAPER_TARGETS_JSON with fallback defaults."""
    raw = os.getenv("OPILORA_SCRAPER_TARGETS_JSON", "").strip()
    if not raw:
        return DEFAULT_SCRAPER_TARGETS

    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list) and parsed:
            return parsed
        logger.warning("OPILORA_SCRAPER_TARGETS_JSON must be a non-empty JSON array.")
    except json.JSONDecodeError as exc:
        logger.warning("Invalid OPILORA_SCRAPER_TARGETS_JSON: %s", exc)

    return DEFAULT_SCRAPER_TARGETS


class WebScraperCollector(BaseCollector):
    """Collect mentions by scraping configured URLs and extracting text blocks."""

    name = "web_scraper"
    platform = "web"

    def __init__(self, targets: list[dict] | None = None, timeout_seconds: int = 20):
        super().__init__()
        self.targets = targets or _load_targets()
        self.timeout_seconds = timeout_seconds

    async def collect(self) -> CollectResult:
        mentions: list[RawMention] = []
        errors: list[str] = []

        async with httpx.AsyncClient(timeout=self.timeout_seconds, follow_redirects=True) as client:
            for target in self.targets:
                name = target.get("name", "unknown_target")
                url = target.get("url")
                if not url:
                    errors.append(f"[{name}] Missing URL.")
                    continue

                try:
                    response = await client.get(url, headers=target.get("headers") or {})
                    response.raise_for_status()

                    soup = BeautifulSoup(response.text, "lxml")

                    title = ""
                    title_node = soup.select_one("title")
                    if title_node:
                        title = title_node.get_text(" ", strip=True)

                    selector = target.get("content_selector") or "article p, main p, p"
                    max_paragraphs = int(target.get("max_paragraphs") or 20)
                    paragraphs = []

                    for node in soup.select(selector):
                        text = node.get_text(" ", strip=True)
                        if text and len(text) >= 20:
                            paragraphs.append(text)
                        if len(paragraphs) >= max_paragraphs:
                            break

                    content_body = " ".join(paragraphs)
                    content = f"{title}. {content_body}".strip(" .") if title else content_body

                    if len(content) < 20:
                        errors.append(f"[{name}] Extracted content too short.")
                        continue

                    mentions.append(
                        RawMention(
                            content=content,
                            author=name,
                            author_id=f"web_{name.lower().replace(' ', '_')}",
                            platform=target.get("platform", self.platform),
                            source_url=url,
                            published_at=datetime.now(timezone.utc),
                            raw_data={
                                "target_name": name,
                                "target_url": url,
                                "selector": selector,
                                "paragraph_count": len(paragraphs),
                            },
                        )
                    )

                    logger.info("Web target '%s': extracted %d paragraph blocks.", name, len(paragraphs))

                except Exception as exc:
                    errors.append(f"[{name}] Scrape error: {exc}")
                    logger.warning("Failed web scrape '%s': %s", name, exc)

        return CollectResult(mentions=mentions, errors=errors)
