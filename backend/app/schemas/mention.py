from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


class MentionBase(BaseModel):
    content: str
    author: str
    platform: str
    published_at: datetime


class MentionResponse(MentionBase):
    id: UUID
    author_id: str | None = None
    author_avatar: str | None = None
    source_url: str | None = None
    likes: int = 0
    shares: int = 0
    comments: int = 0
    sentiment_label: str | None = None
    sentiment_score: float | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class MentionDetail(MentionResponse):
    raw_data: dict | None = None
    topic_id: UUID | None = None
    influencer_id: UUID | None = None
