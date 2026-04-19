from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


class EscalationResponse(BaseModel):
    id: UUID
    title: str
    description: str
    risk_level: str
    risk_score: float
    factors: dict | None = None
    topic_id: UUID | None = None
    is_resolved: bool = False
    created_at: datetime

    model_config = {"from_attributes": True}


class RiskScoreResponse(BaseModel):
    current_score: float
    level: str
    trend: str  # rising, falling, stable
    factors: dict


class PredictionPoint(BaseModel):
    time: str
    predicted_score: float
    confidence: float
