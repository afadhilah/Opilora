"""
Twitter/X Mock Collector — generates realistic Indonesian tweet data for development.
Replace with a real Twitter API collector when credentials are available.
"""
import logging
import random
from datetime import datetime, timedelta, timezone

from app.collectors.base import BaseCollector, CollectResult, RawMention

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Realistic Indonesian tweet templates grouped by topic
# ---------------------------------------------------------------------------
TWEET_TEMPLATES: dict[str, list[str]] = {
    "subsidi_energi": [
        "Subsidi BBM harusnya lebih tepat sasaran, bukan malah dinikmati orang kaya #SubsidiBBM",
        "Kenaikan tarif listrik memberatkan pelaku UMKM kecil. PLN harus evaluasi kebijakan ini",
        "Subsidi energi terbarukan harus mulai digarap serius oleh pemerintah #EnergiHijau",
        "Rakyat kecil butuh subsidi, jangan dicabut tanpa solusi alternatif",
        "PLN sering padamkan listrik tanpa pemberitahuan di daerah saya. Meresahkan warga!",
        "Pencabutan subsidi BBM berdampak langsung pada harga sembako di pasar",
    ],
    "transportasi": [
        "MRT Jakarta sekarang sudah lebih nyaman, pelayanannya bagus 👍 #MRTJakarta",
        "TransJakarta makin macet, butuh jalur khusus yang lebih tegas @TransJakarta",
        "KRL Commuter Line sangat membantu mobilitas pekerja Jabodetabek setiap hari",
        "Bus listrik TransJakarta adalah langkah maju yang patut diapresiasi 🚌⚡",
        "Kapan ya MRT sampai ke Bekasi? Sudah terlalu lama menunggu infrastruktur",
        "Tarif KRL naik tapi pelayanan menurun, penumpang semakin kecewa",
    ],
    "ekonomi_digital": [
        "UMKM lokal perlu lebih banyak pelatihan digital dari pemerintah #GoDigital",
        "QRIS memudahkan pembayaran di warung-warung kecil, mantap! 💳",
        "E-commerce lokal harus bisa bersaing dengan platform asing",
        "Digitalisasi UMKM bukan cuma soal marketplace, tapi juga literasi digital",
        "Startup Indonesia terus bermunculan, tapi sustainability masih jadi PR besar",
        "Tokopedia dan Shopee membantu UMKM go digital, tapi margin makin tipis",
    ],
    "inflasi": [
        "Harga sembako terus naik, rakyat kecil yang paling terdampak 😔 #Inflasi",
        "Inflasi 6% ini memukul daya beli masyarakat kelas menengah secara signifikan",
        "Harga beras naik lagi, petani malah tidak untung. Siapa yang diuntungkan?",
        "Daya beli masyarakat menurun drastis, pemerintah harus segera bertindak",
        "Harga minyak goreng masih belum stabil, ibu rumah tangga mengeluh",
        "Kenaikan harga BBM berdampak domino ke semua sektor ekonomi",
    ],
    "pariwisata": [
        "Wisata Labuan Bajo bagus tapi infrastrukturnya masih kurang 🏝️",
        "Pantai-pantai di Sulawesi masih tersembunyi dan sangat indah",
        "Sudah saatnya pemerintah serius bangun infrastruktur di daerah wisata",
        "Desa wisata bisa jadi solusi ekonomi lokal yang berkelanjutan #DesaWisata",
        "Bali overrated, coba explore Lombok dan NTT, jauh lebih indah!",
        "Wisata alam Indonesia luar biasa, tapi kebersihan masih jadi masalah",
    ],
    "pendidikan": [
        "Kurikulum digital perlu diperbarui, tidak relevan dengan kebutuhan industri",
        "Guru di daerah masih banyak yang gaptek, perlu pelatihan IT intensif",
        "Mahasiswa butuh akses internet murah untuk kuliah online 📚",
        "Sekolah gratis tapi biaya lain masih memberatkan orang tua",
        "Pendidikan vokasi harus diperkuat untuk menekan pengangguran muda",
        "Merdeka Belajar bagus konsepnya, tapi implementasi di lapangan masih kacau",
    ],
}

MOCK_USERS = [
    ("Andi Prasetyo", "@andipras"),
    ("Siti Nurhaliza", "@sitinurh"),
    ("Budi Santoso", "@budisan_"),
    ("Dewi Lestari", "@dewilstr"),
    ("Rizky Fadillah", "@rizkyfad"),
    ("Putri Ayu", "@putriayu92"),
    ("Hendra Gunawan", "@hendragun"),
    ("Maya Sari", "@mayasari_id"),
    ("Agus Supriyadi", "@agussup"),
    ("Rina Marlina", "@rinamrlna"),
    ("Joko Widodo Fan", "@jokowi_fans"),
    ("Netizen Receh", "@netizen_receh"),
    ("Info Bandung", "@infobdg"),
    ("Kabar Surabaya", "@kabarsby"),
    ("Warga Jakarta", "@wargajkt_"),
]


class TwitterMockCollector(BaseCollector):
    """Generate realistic mock tweets for development/demo purposes."""

    name = "twitter_mock"
    platform = "twitter"

    def __init__(self, tweets_per_run: int = 15):
        super().__init__()
        self.tweets_per_run = tweets_per_run

    async def collect(self) -> CollectResult:
        mentions: list[RawMention] = []
        now = datetime.now(timezone.utc)

        all_tweets: list[tuple[str, str]] = []
        for topic_key, templates in TWEET_TEMPLATES.items():
            for tpl in templates:
                all_tweets.append((topic_key, tpl))

        selected = random.sample(all_tweets, min(self.tweets_per_run, len(all_tweets)))

        for topic_key, tweet_text in selected:
            user_name, user_handle = random.choice(MOCK_USERS)
            published = now - timedelta(
                hours=random.randint(0, 48),
                minutes=random.randint(0, 59),
            )

            mentions.append(
                RawMention(
                    content=tweet_text,
                    author=user_name,
                    author_id=user_handle,
                    platform=self.platform,
                    source_url=f"https://x.com/{user_handle.lstrip('@')}/status/{random.randint(10**17, 10**18)}",
                    published_at=published,
                    likes=random.randint(0, 8000),
                    shares=random.randint(0, 3000),
                    comments=random.randint(0, 500),
                    raw_data={
                        "mock": True,
                        "topic_key": topic_key,
                        "verified": random.random() > 0.7,
                        "followers": random.randint(100, 500000),
                    },
                )
            )

        logger.info("Twitter mock collector: generated %d tweets.", len(mentions))
        return CollectResult(mentions=mentions)
