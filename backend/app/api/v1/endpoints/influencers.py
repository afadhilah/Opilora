from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models import Influencer
from app.schemas.influencer import InfluencerResponse, NetworkResponse, NetworkNode, NetworkEdge

router = APIRouter()


@router.get("", response_model=list[InfluencerResponse])
async def list_influencers(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Influencer).order_by(Influencer.followers.desc()).limit(20)
    )
    return result.scalars().all()


@router.get("/network", response_model=NetworkResponse)
async def get_network(db: AsyncSession = Depends(get_db)):
    influencers = (await db.execute(
        select(Influencer).order_by(Influencer.followers.desc()).limit(10)
    )).scalars().all()

    nodes = [NetworkNode(id=str(inf.id), label=inf.handle, size=inf.followers) for inf in influencers]

    # Mock edges
    import random
    edges = []
    for i, inf in enumerate(influencers):
        for j in range(min(2, len(influencers) - 1)):
            target_idx = (i + j + 1) % len(influencers)
            edges.append(NetworkEdge(
                source=str(inf.id),
                target=str(influencers[target_idx].id),
                weight=random.uniform(0.1, 1.0),
            ))

    return NetworkResponse(nodes=nodes, edges=edges)
