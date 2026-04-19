from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models import Topic
from app.schemas.topic import TopicResponse, TrendingKeyword

router = APIRouter()


@router.get("", response_model=list[TopicResponse])
async def list_topics(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Topic).where(Topic.is_active == True).order_by(Topic.mention_count.desc())
    )
    return result.scalars().all()


@router.get("/trending", response_model=list[TrendingKeyword])
async def get_trending(db: AsyncSession = Depends(get_db)):
    # Aggregate keywords from active topics
    topics = (await db.execute(
        select(Topic).where(Topic.is_active == True).order_by(Topic.mention_count.desc()).limit(10)
    )).scalars().all()

    keywords = []
    for topic in topics:
        for kw in (topic.keywords or [])[:2]:
            keywords.append(TrendingKeyword(
                keyword=kw,
                count=topic.mention_count // len(topic.keywords or [kw]),
                change=5.0 if topic.trend == "rising" else -3.0 if topic.trend == "falling" else 0.0,
            ))
    return sorted(keywords, key=lambda k: k.count, reverse=True)[:10]
