from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


class TopicResponse(BaseModel):
    id: UUID
    name: str
    description: str | None = None
    keywords: list[str] = []
    color: str = "#3b6bfa"
    mention_count: int = 0
    sentiment_avg: float = 0.5
    trend: str = "stable"
    first_seen: datetime
    last_active: datetime
    is_active: bool = True

    model_config = {"from_attributes": True}


class TrendingKeyword(BaseModel):
    keyword: str
    count: int
    change: float  # percentage change


class TopicEvolutionPoint(BaseModel):
    time: str
    values: dict[str, int]  # topic_name -> volume
