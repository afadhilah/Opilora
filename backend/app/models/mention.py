import uuid
from datetime import datetime
from sqlalchemy import String, Text, DateTime, Integer, Float, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from app.models.base import Base, UUIDMixin, TimestampMixin


class Mention(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "mentions"

    content: Mapped[str] = mapped_column(Text, nullable=False)
    author: Mapped[str] = mapped_column(String(255), nullable=False)
    author_id: Mapped[str | None] = mapped_column(String(255))
    author_avatar: Mapped[str | None] = mapped_column(String(512))
    platform: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    source_url: Mapped[str | None] = mapped_column(String(1024))
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    collected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    # Engagement metrics
    likes: Mapped[int] = mapped_column(Integer, default=0)
    shares: Mapped[int] = mapped_column(Integer, default=0)
    comments: Mapped[int] = mapped_column(Integer, default=0)

    # Raw data from API/scraper
    raw_data: Mapped[dict | None] = mapped_column(JSONB)

    # Relationships
    sentiment: Mapped["Sentiment"] = relationship(back_populates="mention", uselist=False, lazy="joined")
    topic_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("topics.id"))
    influencer_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("influencers.id"))

    __table_args__ = (
        Index("ix_mentions_platform_published", "platform", "published_at"),
    )

    def __repr__(self):
        return f"<Mention {self.id} by {self.author} on {self.platform}>"
