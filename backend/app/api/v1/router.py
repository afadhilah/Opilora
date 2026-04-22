from fastapi import APIRouter
from app.api.v1.endpoints import health, dashboard, mentions, sentiments, topics, escalations, influencers, analyze, collectors

router = APIRouter()

router.include_router(health.router, tags=["health"])
router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
router.include_router(mentions.router, prefix="/mentions", tags=["mentions"])
router.include_router(sentiments.router, prefix="/sentiments", tags=["sentiments"])
router.include_router(topics.router, prefix="/topics", tags=["topics"])
router.include_router(escalations.router, prefix="/escalations", tags=["escalations"])
router.include_router(influencers.router, prefix="/influencers", tags=["influencers"])
router.include_router(analyze.router, prefix="/ml", tags=["ml"])
router.include_router(collectors.router, prefix="/collectors", tags=["collectors"])

