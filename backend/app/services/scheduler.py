"""
Scheduler — runs collectors periodically using APScheduler.
"""
import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.collectors.api_collector import APICollector
from app.collectors.rss_collector import RSSCollector
from app.collectors.twitter_mock_collector import TwitterMockCollector
from app.collectors.web_scraper_collector import WebScraperCollector
from app.services.ingestion import ingest

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Collector registry — add new collectors here
# ---------------------------------------------------------------------------
_collectors: dict = {}


def _register_defaults():
    global _collectors
    _collectors = {
        "rss_news": RSSCollector(),
        "twitter_mock": TwitterMockCollector(),
        "api_sources": APICollector(),
        "web_scraper": WebScraperCollector(),
    }


def get_collectors() -> dict:
    """Return the registered collectors."""
    if not _collectors:
        _register_defaults()
    return _collectors


# ---------------------------------------------------------------------------
# Job functions
# ---------------------------------------------------------------------------

async def _run_collector(name: str):
    """Execute a named collector and pass results to the ingestion service."""
    collectors = get_collectors()
    collector = collectors.get(name)
    if not collector:
        logger.error("Collector '%s' not found.", name)
        return

    result = await collector.run()
    if result.mentions:
        await ingest(
            raw_mentions=result.mentions,
            collector_name=name,
            auto_analyze=True,
        )


async def run_rss_job():
    await _run_collector("rss_news")


async def run_twitter_mock_job():
    await _run_collector("twitter_mock")


async def run_api_sources_job():
    await _run_collector("api_sources")


async def run_web_scraper_job():
    await _run_collector("web_scraper")


# ---------------------------------------------------------------------------
# Scheduler lifecycle
# ---------------------------------------------------------------------------
_scheduler: AsyncIOScheduler | None = None


def start_scheduler():
    """Start the background scheduler with all collector jobs."""
    global _scheduler
    _register_defaults()

    _scheduler = AsyncIOScheduler()

    # RSS news — every 30 minutes
    _scheduler.add_job(
        run_rss_job,
        "interval",
        minutes=30,
        id="rss_news_job",
        name="RSS News Collector",
        replace_existing=True,
    )

    # Twitter mock — every 15 minutes (dev only)
    _scheduler.add_job(
        run_twitter_mock_job,
        "interval",
        minutes=15,
        id="twitter_mock_job",
        name="Twitter Mock Collector",
        replace_existing=True,
    )

    # Generic API sources — every 20 minutes
    _scheduler.add_job(
        run_api_sources_job,
        "interval",
        minutes=20,
        id="api_sources_job",
        name="API Sources Collector",
        replace_existing=True,
    )

    # Web scraper — every 45 minutes
    _scheduler.add_job(
        run_web_scraper_job,
        "interval",
        minutes=45,
        id="web_scraper_job",
        name="Web Scraper Collector",
        replace_existing=True,
    )

    _scheduler.start()
    logger.info("Data collection scheduler started with %d jobs.", len(_scheduler.get_jobs()))


def stop_scheduler():
    """Shut down the scheduler gracefully."""
    global _scheduler
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
        logger.info("Data collection scheduler stopped.")
        _scheduler = None


def get_scheduler() -> AsyncIOScheduler | None:
    return _scheduler
