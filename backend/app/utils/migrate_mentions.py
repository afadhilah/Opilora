"""Add content_hash and collection_source columns to mentions table."""
import asyncio
from sqlalchemy import text
from app.core.database import engine


async def migrate():
    async with engine.begin() as conn:
        await conn.execute(text(
            "ALTER TABLE mentions ADD COLUMN IF NOT EXISTS content_hash VARCHAR(64)"
        ))
        await conn.execute(text(
            "ALTER TABLE mentions ADD COLUMN IF NOT EXISTS collection_source VARCHAR(100)"
        ))
        await conn.execute(text(
            "CREATE UNIQUE INDEX IF NOT EXISTS ix_mentions_content_hash "
            "ON mentions (content_hash) WHERE content_hash IS NOT NULL"
        ))
    print("Migration done: content_hash + collection_source added to mentions.")


if __name__ == "__main__":
    asyncio.run(migrate())
