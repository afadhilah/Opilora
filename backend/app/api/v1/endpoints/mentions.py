from uuid import UUID
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models import Mention
from app.schemas.mention import MentionResponse, MentionDetail

router = APIRouter()


@router.get("", response_model=dict)
async def list_mentions(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    platform: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Mention).order_by(Mention.published_at.desc())
    if platform:
        query = query.where(Mention.platform == platform)

    total = (await db.execute(select(func.count()).select_from(query.subquery()))).scalar() or 0
    items = (await db.execute(query.offset((page - 1) * per_page).limit(per_page))).scalars().all()

    return {
        "items": [
            MentionResponse(
                id=m.id,
                content=m.content,
                author=m.author,
                platform=m.platform,
                published_at=m.published_at,
                author_id=m.author_id,
                author_avatar=m.author_avatar,
                source_url=m.source_url,
                likes=m.likes,
                shares=m.shares,
                comments=m.comments,
                sentiment_label=m.sentiment.label if m.sentiment else None,
                sentiment_score=m.sentiment.score if m.sentiment else None,
                created_at=m.created_at,
            )
            for m in items
        ],
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": (total + per_page - 1) // per_page if total > 0 else 0,
    }


@router.get("/{mention_id}", response_model=MentionDetail)
async def get_mention(mention_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Mention).where(Mention.id == mention_id))
    mention = result.scalar_one_or_none()
    if not mention:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Mention not found")
    return mention
