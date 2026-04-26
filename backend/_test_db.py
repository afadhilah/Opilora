import asyncio
import asyncpg

async def test():
    try:
        conn = await asyncpg.connect("postgresql://postgres:123@localhost:5432/opilora")
        v = await conn.fetchval("SELECT version()")
        print(f"OK: {v[:60]}")
        await conn.close()
    except Exception as e:
        print(f"GAGAL: {e}")

asyncio.run(test())
