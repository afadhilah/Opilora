import logging
from app.core.database import engine
from app.models.base import Base

logger = logging.getLogger(__name__)


async def on_startup():
    logger.info("Starting Opilora API...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables ensured.")


async def on_shutdown():
    logger.info("Shutting down Opilora API...")
    await engine.dispose()
