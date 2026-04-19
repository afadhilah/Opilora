from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_mentions: int
    sentiment_score: float
    active_topics: int
    alert_count: int
    mention_change: float  # percentage
    sentiment_change: float
    topic_change: float
    alert_change: float


class PlatformDistribution(BaseModel):
    platform: str
    count: int
    percentage: float
