"""
Base collector — abstract interface and shared data structures for all collectors.
"""
import hashlib
import logging
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum

logger = logging.getLogger(__name__)


class CollectorStatus(Enum):
    IDLE = "idle"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"


@dataclass
class RawMention:
    """Standardised format produced by every collector."""

    content: str
    author: str
    platform: str
    published_at: datetime
    author_id: str | None = None
    author_avatar: str | None = None
    source_url: str | None = None
    likes: int = 0
    shares: int = 0
    comments: int = 0
    raw_data: dict | None = None

    @property
    def content_hash(self) -> str:
        """SHA-256 hash for deduplication: content + author + published_at."""
        raw = f"{self.content}|{self.author}|{self.published_at.isoformat()}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()


@dataclass
class CollectResult:
    """Returned by every collector after a run."""

    mentions: list[RawMention] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    source_name: str = ""


class BaseCollector(ABC):
    """Abstract base class that all collectors must implement."""

    name: str = "base"
    platform: str = "unknown"

    def __init__(self):
        self._status: CollectorStatus = CollectorStatus.IDLE
        self._last_run: datetime | None = None
        self._last_count: int = 0
        self._last_errors: list[str] = []

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    async def run(self) -> CollectResult:
        """Execute collection, track status, and return results."""
        self._status = CollectorStatus.RUNNING
        logger.info("Collector '%s' started.", self.name)
        try:
            result = await self.collect()
            result.source_name = self.name
            self._last_run = datetime.now(timezone.utc)
            self._last_count = len(result.mentions)
            self._last_errors = result.errors
            self._status = CollectorStatus.SUCCESS if not result.errors else CollectorStatus.FAILED
            logger.info(
                "Collector '%s' finished — %d mentions, %d errors.",
                self.name,
                len(result.mentions),
                len(result.errors),
            )
            return result
        except Exception as exc:
            self._status = CollectorStatus.FAILED
            self._last_errors = [str(exc)]
            logger.exception("Collector '%s' failed: %s", self.name, exc)
            return CollectResult(errors=[str(exc)], source_name=self.name)

    def get_status(self) -> dict:
        return {
            "name": self.name,
            "platform": self.platform,
            "status": self._status.value,
            "last_run": self._last_run.isoformat() if self._last_run else None,
            "last_count": self._last_count,
            "last_errors": self._last_errors,
        }

    # ------------------------------------------------------------------
    # Abstract — subclasses must implement
    # ------------------------------------------------------------------

    @abstractmethod
    async def collect(self) -> CollectResult:
        """Fetch data from the external source and return a ``CollectResult``."""
        ...
