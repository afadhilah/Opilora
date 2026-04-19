import uuid
from sqlalchemy import String, Float, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.models.base import Base, UUIDMixin, TimestampMixin


class Sentiment(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "sentiments"

    mention_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("mentions.id", ondelete="CASCADE"), unique=True, nullable=False
    )
    label: Mapped[str] = mapped_column(String(20), nullable=False, index=True)  # positive, negative, neutral, mixed
    score: Mapped[float] = mapped_column(Float, nullable=False)  # 0.0 to 1.0
    confidence: Mapped[float] = mapped_column(Float, default=0.0)

    # Emotion detection
    emotion: Mapped[str | None] = mapped_column(String(20))  # joy, anger, fear, sadness, surprise, disgust
    emotion_score: Mapped[float | None] = mapped_column(Float)

    # Aspect-based sentiment
    aspects: Mapped[dict | None] = mapped_column(JSONB)  # {"harga": 0.3, "kualitas": 0.8}

    # Model info
    model_version: Mapped[str | None] = mapped_column(String(50))

    # Relationship
    mention: Mapped["Mention"] = relationship(back_populates="sentiment")

    def __repr__(self):
        return f"<Sentiment {self.label} ({self.score:.2f}) for mention {self.mention_id}>"
