"""
Seed database with mock data for development.
Run: python -m app.utils.seed_data
"""
import asyncio
import uuid
import random
from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import async_session, engine
from app.models.base import Base
from app.models.mention import Mention
from app.models.sentiment import Sentiment
from app.models.topic import Topic
from app.models.escalation import Escalation
from app.models.influencer import Influencer
from app.models.user import User
from app.core.security import hash_password


PLATFORMS = ["twitter", "facebook", "instagram", "youtube", "tiktok", "news"]
SENTIMENTS = ["positive", "negative", "neutral", "mixed"]
EMOTIONS = ["joy", "anger", "fear", "sadness", "surprise", "disgust"]

TOPICS_DATA = [
    {"name": "Subsidi Energi", "keywords": ["subsidi", "BBM", "listrik", "PLN", "tarif"], "color": "#3b6bfa"},
    {"name": "Transportasi Publik", "keywords": ["MRT", "KRL", "TransJakarta", "bus", "kereta"], "color": "#10b981"},
    {"name": "Digitalisasi UMKM", "keywords": ["UMKM", "digital", "e-commerce", "marketplace", "QRIS"], "color": "#f59e0b"},
    {"name": "Inflasi", "keywords": ["inflasi", "harga", "mahal", "naik", "sembako"], "color": "#ef4444"},
    {"name": "Pariwisata Daerah", "keywords": ["wisata", "desa", "lokal", "pantai", "gunung"], "color": "#8b5cf6"},
    {"name": "Pendidikan Digital", "keywords": ["sekolah", "online", "kurikulum", "guru", "siswa"], "color": "#06b6d4"},
]

SAMPLE_MENTIONS = [
    "Subsidi BBM harusnya lebih tepat sasaran, jangan asal potong",
    "MRT Jakarta sekarang sudah lebih nyaman, pelayanannya bagus",
    "UMKM lokal perlu lebih banyak pelatihan digital dari pemerintah",
    "Harga sembako terus naik, rakyat kecil yang paling terdampak",
    "Sudah saatnya pemerintah serius bangun infrastruktur di daerah wisata",
    "Kurikulum digital perlu diperbarui, tidak relevan dengan kebutuhan industri",
    "PLN sering padamkan listrik tanpa pemberitahuan di daerah saya",
    "TransJakarta makin macet, butuh jalur khusus yang lebih tegas",
    "QRIS memudahkan pembayaran di warung-warung kecil, mantap!",
    "Inflasi 6% ini memukul daya beli masyarakat kelas menengah",
    "Wisata Labuan Bajo bagus tapi infrastrukturnya masih kurang",
    "Guru di daerah masih banyak yang gaptek, perlu pelatihan IT",
    "Kenaikan tarif listrik memberatkan pelaku UMKM kecil",
    "KRL Commuter Line sangat membantu mobilitas pekerja Jabodetabek",
    "E-commerce lokal harus bisa bersaing dengan platform asing",
    "Harga beras naik lagi, petani malah tidak untung",
    "Pantai-pantai di Sulawesi masih tersembunyi dan sangat indah",
    "Mahasiswa butuh akses internet murah untuk kuliah online",
    "Subsidi energi terbarukan harus mulai digarap serius",
    "Bus listrik TransJakarta adalah langkah maju yang patut diapresiasi",
]

INFLUENCERS_DATA = [
    {"name": "Ridwan Kamil", "handle": "@ridwankamil", "platform": "twitter", "followers": 15200000, "verified": True},
    {"name": "Najwa Shihab", "handle": "@najwashihab", "platform": "twitter", "followers": 9800000, "verified": True},
    {"name": "Gita Wirjawan", "handle": "@gitawirjawan", "platform": "twitter", "followers": 3400000, "verified": True},
    {"name": "Faisal Basri", "handle": "@faborges", "platform": "twitter", "followers": 1800000, "verified": True},
    {"name": "Rocky Gerung", "handle": "@rockygerung", "platform": "youtube", "followers": 2100000, "verified": False},
    {"name": "Tirto ID", "handle": "@taborito", "platform": "twitter", "followers": 4500000, "verified": True},
    {"name": "Detik.com", "handle": "@detikcom", "platform": "twitter", "followers": 18000000, "verified": True},
    {"name": "Kompas", "handle": "@kompaborascom", "platform": "twitter", "followers": 12000000, "verified": True},
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        # Create default user
        admin = User(
            email="admin@opilora.id",
            name="Admin Opilora",
            hashed_password=hash_password("admin123"),
            role="admin",
        )
        db.add(admin)

        # Create topics
        now = datetime.now(timezone.utc)
        topics = []
        for td in TOPICS_DATA:
            topic = Topic(
                name=td["name"],
                keywords=td["keywords"],
                color=td["color"],
                mention_count=random.randint(1000, 5000),
                sentiment_avg=round(random.uniform(0.3, 0.8), 2),
                trend=random.choice(["rising", "falling", "stable"]),
                first_seen=now - timedelta(days=random.randint(7, 30)),
                last_active=now - timedelta(hours=random.randint(0, 6)),
                is_active=True,
            )
            db.add(topic)
            topics.append(topic)

        # Create influencers
        influencers = []
        for inf_data in INFLUENCERS_DATA:
            inf = Influencer(
                name=inf_data["name"],
                handle=inf_data["handle"],
                platform=inf_data["platform"],
                followers=inf_data["followers"],
                engagement_rate=round(random.uniform(1.5, 8.0), 2),
                reach=inf_data["followers"] * random.randint(2, 5),
                verified=inf_data["verified"],
                sentiment_leaning=round(random.uniform(0.3, 0.8), 2),
                mention_count=random.randint(10, 200),
            )
            db.add(inf)
            influencers.append(inf)

        await db.flush()  # Get IDs

        # Create mentions + sentiments
        for i in range(100):
            topic = random.choice(topics)
            platform = random.choice(PLATFORMS)
            sentiment_label = random.choice(SENTIMENTS)
            published = now - timedelta(hours=random.randint(0, 336))  # last 14 days

            mention = Mention(
                content=random.choice(SAMPLE_MENTIONS),
                author=f"user_{random.randint(1000, 9999)}",
                author_id=f"uid_{random.randint(10000, 99999)}",
                platform=platform,
                published_at=published,
                collected_at=published + timedelta(minutes=random.randint(1, 30)),
                likes=random.randint(0, 5000),
                shares=random.randint(0, 2000),
                comments=random.randint(0, 500),
                topic_id=topic.id,
                influencer_id=random.choice(influencers).id if random.random() > 0.7 else None,
            )
            db.add(mention)
            await db.flush()

            sentiment = Sentiment(
                mention_id=mention.id,
                label=sentiment_label,
                score=round(random.uniform(0.1, 0.95), 3),
                confidence=round(random.uniform(0.6, 0.99), 3),
                emotion=random.choice(EMOTIONS),
                emotion_score=round(random.uniform(0.3, 0.9), 3),
                model_version="indobert-v1",
            )
            db.add(sentiment)

        # Create escalations
        for i in range(5):
            topic = random.choice(topics)
            risk_score = round(random.uniform(20, 90), 1)
            escalation = Escalation(
                title=f"Eskalasi: {topic.name}",
                description=f"Terdeteksi peningkatan volume dan sentimen negatif terkait {topic.name}",
                risk_level="critical" if risk_score > 70 else "high" if risk_score > 50 else "medium" if risk_score > 30 else "low",
                risk_score=risk_score,
                topic_id=topic.id,
                factors={
                    "volume_velocity": round(random.uniform(10, 95), 1),
                    "sentiment_shift": round(random.uniform(10, 60), 1),
                    "influencer_factor": round(random.uniform(5, 80), 1),
                    "cross_platform": round(random.uniform(10, 70), 1),
                },
                is_resolved=random.random() > 0.6,
            )
            db.add(escalation)

        await db.commit()
        print(f"✓ Seeded: 1 user, {len(topics)} topics, {len(influencers)} influencers, 100 mentions, 5 escalations")


if __name__ == "__main__":
    asyncio.run(seed())
