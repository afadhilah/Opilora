from pydantic import BaseModel


class SentimentDistribution(BaseModel):
    positive: float
    negative: float
    neutral: float
    mixed: float
    total_mentions: int


class SentimentTimelinePoint(BaseModel):
    time: str
    positive: float
    negative: float
    neutral: float
    volume: int


class EmotionData(BaseModel):
    emotion: str
    value: float


class SentimentOverview(BaseModel):
    distribution: SentimentDistribution
    timeline: list[SentimentTimelinePoint]
    emotions: list[EmotionData]
    average_score: float
