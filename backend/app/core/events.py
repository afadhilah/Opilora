import logging
from app.core.database import engine
from app.models.base import Base

logger = logging.getLogger(__name__)


async def on_startup():
    logger.info("Starting Opilora API...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables ensured.")

    # Start data collection scheduler
    from app.services.scheduler import start_scheduler
    start_scheduler()
    logger.info("Data collection scheduler started.")


async def on_shutdown():
    logger.info("Shutting down Opilora API...")

    # Stop data collection scheduler
    from app.services.scheduler import stop_scheduler
    stop_scheduler()

    await engine.dispose()
