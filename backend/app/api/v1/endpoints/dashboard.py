from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models import Mention, Topic, Escalation, Sentiment
from app.schemas.dashboard import DashboardStats

router = APIRouter()


@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    total_mentions = (await db.execute(select(func.count(Mention.id)))).scalar() or 0
    active_topics = (await db.execute(
        select(func.count(Topic.id)).where(Topic.is_active == True)
    )).scalar() or 0
    alert_count = (await db.execute(
        select(func.count(Escalation.id)).where(Escalation.is_resolved == False)
    )).scalar() or 0
    avg_sentiment = (await db.execute(select(func.avg(Sentiment.score)))).scalar() or 0.5

    return DashboardStats(
        total_mentions=total_mentions,
        sentiment_score=round(float(avg_sentiment), 3),
        active_topics=active_topics,
        alert_count=alert_count,
        mention_change=12.5,   # TODO: calculate from time-series
        sentiment_change=-2.3,
        topic_change=8.0,
        alert_change=15.0,
    )
