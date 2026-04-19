from datetime import datetime
from sqlalchemy import String, Integer, Float, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from app.models.base import Base, UUIDMixin, TimestampMixin


class Topic(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "topics"

    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str | None] = mapped_column(Text)
    keywords: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    color: Mapped[str] = mapped_column(String(7), default="#3b6bfa")  # hex color

    # Metrics
    mention_count: Mapped[int] = mapped_column(Integer, default=0)
    sentiment_avg: Mapped[float] = mapped_column(Float, default=0.5)
    trend: Mapped[str] = mapped_column(String(20), default="stable")  # rising, falling, stable

    # Lifecycle
    first_seen: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    last_active: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, index=True)

    # Extra data
    metadata_json: Mapped[dict | None] = mapped_column(JSONB)

    def __repr__(self):
        return f"<Topic '{self.name}' ({self.mention_count} mentions)>"
