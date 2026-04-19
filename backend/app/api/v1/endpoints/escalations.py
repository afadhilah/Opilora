from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models import Escalation
from app.schemas.escalation import EscalationResponse, RiskScoreResponse, PredictionPoint

router = APIRouter()


@router.get("", response_model=list[EscalationResponse])
async def list_escalations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Escalation).order_by(Escalation.created_at.desc()).limit(20)
    )
    return result.scalars().all()


@router.get("/risk-score", response_model=RiskScoreResponse)
async def get_risk_score(db: AsyncSession = Depends(get_db)):
    latest = (await db.execute(
        select(Escalation).where(Escalation.is_resolved == False)
        .order_by(Escalation.risk_score.desc()).limit(1)
    )).scalar_one_or_none()

    if latest:
        return RiskScoreResponse(
            current_score=latest.risk_score,
            level=latest.risk_level,
            trend="rising",
            factors=latest.factors or {},
        )
    return RiskScoreResponse(current_score=15.0, level="low", trend="stable", factors={})


@router.get("/predictions", response_model=list[PredictionPoint])
async def get_predictions():
    # Mock predictions — will be replaced by ML model
    import random
    return [
        PredictionPoint(
            time=f"{i}:00",
            predicted_score=30 + random.uniform(-10, 20),
            confidence=0.7 + random.uniform(0, 0.25),
        )
        for i in range(24)
    ]
