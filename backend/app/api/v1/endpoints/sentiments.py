from fastapi import APIRouter, Depends
from sqlalchemy import select, func, case
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models import Sentiment
from app.schemas.sentiment import SentimentDistribution, SentimentTimelinePoint, EmotionData

router = APIRouter()


@router.get("/distribution", response_model=SentimentDistribution)
async def get_distribution(db: AsyncSession = Depends(get_db)):
    total = (await db.execute(select(func.count(Sentiment.id)))).scalar() or 1
    counts = {}
    for label in ["positive", "negative", "neutral", "mixed"]:
        count = (await db.execute(
            select(func.count(Sentiment.id)).where(Sentiment.label == label)
        )).scalar() or 0
        counts[label] = round(count / total * 100, 1)

    return SentimentDistribution(
        positive=counts["positive"],
        negative=counts["negative"],
        neutral=counts["neutral"],
        mixed=counts["mixed"],
        total_mentions=total,
    )


@router.get("/timeline", response_model=list[SentimentTimelinePoint])
async def get_timeline(db: AsyncSession = Depends(get_db)):
    # For now return mock timeline — will be replaced with TimescaleDB query
    import random
    return [
        SentimentTimelinePoint(
            time=f"{i+1}/4",
            positive=random.uniform(30, 50),
            negative=random.uniform(10, 30),
            neutral=random.uniform(20, 40),
            volume=random.randint(500, 1500),
        )
        for i in range(14)
    ]


@router.get("/emotions", response_model=list[EmotionData])
async def get_emotions(db: AsyncSession = Depends(get_db)):
    emotions = ["joy", "anger", "fear", "sadness", "surprise", "disgust"]
    result = []
    for emotion in emotions:
        count = (await db.execute(
            select(func.count(Sentiment.id)).where(Sentiment.emotion == emotion)
        )).scalar() or 0
        result.append(EmotionData(emotion=emotion, value=count))
    return result
