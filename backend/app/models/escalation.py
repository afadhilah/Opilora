import uuid
from sqlalchemy import String, Text, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.models.base import Base, UUIDMixin, TimestampMixin


class Escalation(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "escalations"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    risk_level: Mapped[str] = mapped_column(String(20), nullable=False, index=True)  # low, medium, high, critical
    risk_score: Mapped[float] = mapped_column(Float, nullable=False)  # 0-100

    # Contributing factors
    factors: Mapped[dict | None] = mapped_column(JSONB)
    # e.g. {"volume_velocity": 85, "sentiment_shift": 42, "influencer_factor": 72}

    # Relations
    topic_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("topics.id"))

    # Status
    is_resolved: Mapped[bool] = mapped_column(Boolean, default=False)
    resolved_at: Mapped[str | None] = mapped_column(DateTime(timezone=True))
    resolved_by: Mapped[str | None] = mapped_column(String(255))
    resolution_notes: Mapped[str | None] = mapped_column(Text)

    def __repr__(self):
        return f"<Escalation '{self.title}' risk={self.risk_level} score={self.risk_score}>"
