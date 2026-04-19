from datetime import datetime, timezone
from fastapi import APIRouter
from app.config import get_settings
from app.schemas.common import HealthResponse

router = APIRouter()
settings = get_settings()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION,
        timestamp=datetime.now(timezone.utc),
    )
