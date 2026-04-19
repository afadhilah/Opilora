from sqlalchemy import String, Integer, Float, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, UUIDMixin, TimestampMixin


class Influencer(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "influencers"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    handle: Mapped[str] = mapped_column(String(255), nullable=False)
    platform: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    followers: Mapped[int] = mapped_column(Integer, default=0)
    engagement_rate: Mapped[float] = mapped_column(Float, default=0.0)
    reach: Mapped[int] = mapped_column(Integer, default=0)
    verified: Mapped[bool] = mapped_column(Boolean, default=False)
    sentiment_leaning: Mapped[float] = mapped_column(Float, default=0.5)  # 0=negative, 1=positive
    mention_count: Mapped[int] = mapped_column(Integer, default=0)

    def __repr__(self):
        return f"<Influencer @{self.handle} ({self.followers} followers)>"
