"""Aspect-based sentiment extraction using Senopati ITS LLM (Ollama wrapper)."""
import json
import logging
from dataclasses import dataclass, field

import httpx

from app.config import get_settings

logger = logging.getLogger(__name__)

ASPECT_PROMPT_TEMPLATE = """Analisis teks berikut dan ekstrak aspek-aspek yang dibahas beserta sentimen masing-masing aspek.

Teks: "{text}"

Berikan respons dalam format JSON saja (tanpa penjelasan tambahan):
{{
  "aspects": [
    {{"aspect": "nama aspek", "sentiment": "positive/negative/neutral", "score": 0.0-1.0}},
  ]
}}

Jika tidak ada aspek yang jelas, kembalikan:
{{"aspects": []}}"""

# Keyword-based fallback aspects
ASPECT_KEYWORDS = {
    "harga": ["harga", "mahal", "murah", "tarif", "biaya", "ongkos", "bayar"],
    "kualitas": ["kualitas", "bagus", "jelek", "rusak", "cacat", "premium", "standar"],
    "layanan": ["layanan", "pelayanan", "service", "ramah", "lambat", "cepat", "responsif"],
    "infrastruktur": ["infrastruktur", "jalan", "jembatan", "gedung", "fasilitas"],
    "keamanan": ["aman", "keamanan", "bahaya", "resiko", "ancaman"],
    "pendidikan": ["sekolah", "pendidikan", "guru", "siswa", "kurikulum", "belajar"],
    "kesehatan": ["rumah sakit", "dokter", "obat", "kesehatan", "vaksin", "puskesmas"],
    "transportasi": ["transportasi", "bus", "kereta", "MRT", "KRL", "macet", "jalan"],
    "ekonomi": ["ekonomi", "inflasi", "subsidi", "pajak", "UMKM", "bisnis"],
}


@dataclass
class AspectSentiment:
    aspect: str
    sentiment: str  # positive, negative, neutral
    score: float


@dataclass
class AspectResult:
    aspects: list[AspectSentiment] = field(default_factory=list)
    source: str = "llm"  # "llm" or "keyword_fallback"


class AspectModel:
    """Aspect-based sentiment via Senopati ITS LLM with keyword fallback."""

    def __init__(self):
        self._settings = get_settings()

    async def extract(self, text: str) -> AspectResult:
        """Extract aspects using LLM, fallback to keyword-based."""
        try:
            return await self._extract_via_llm(text)
        except Exception as e:
            logger.warning(f"LLM aspect extraction failed: {e}. Using keyword fallback.")
            return self._extract_via_keywords(text)

    async def _extract_via_llm(self, text: str) -> AspectResult:
        prompt = ASPECT_PROMPT_TEMPLATE.format(text=text[:1000])

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{self._settings.LLM_BASE_URL}/chat",
                json={
                    "model": self._settings.LLM_MODEL,
                    "messages": [
                        {"role": "system", "content": "Kamu adalah analis sentimen profesional Indonesia. Respons hanya dalam JSON."},
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.1,
                    "stream": False,
                },
            )
            response.raise_for_status()
            data = response.json()

        # Parse LLM response
        content = data.get("response", data.get("message", {}).get("content", ""))
        aspects = self._parse_llm_response(content)

        return AspectResult(aspects=aspects, source="llm")

    def _parse_llm_response(self, content: str) -> list[AspectSentiment]:
        """Parse JSON from LLM response, handling markdown code blocks."""
        content = content.strip()

        # Remove markdown code block if present
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1]) if lines[-1].strip() == "```" else "\n".join(lines[1:])

        try:
            parsed = json.loads(content)
            aspects = parsed.get("aspects", [])
            return [
                AspectSentiment(
                    aspect=a.get("aspect", "unknown"),
                    sentiment=a.get("sentiment", "neutral"),
                    score=float(a.get("score", 0.5)),
                )
                for a in aspects
                if isinstance(a, dict)
            ]
        except (json.JSONDecodeError, AttributeError):
            logger.warning(f"Failed to parse LLM JSON response: {content[:200]}")
            return []

    def _extract_via_keywords(self, text: str) -> AspectResult:
        """Fallback: keyword-based aspect detection."""
        text_lower = text.lower()
        aspects = []

        for aspect_name, keywords in ASPECT_KEYWORDS.items():
            matched = any(kw in text_lower for kw in keywords)
            if matched:
                # Simple heuristic: use negative words to determine sentiment
                neg_words = ["buruk", "jelek", "mahal", "lambat", "rusak", "gagal", "kecewa", "susah", "sulit"]
                pos_words = ["bagus", "baik", "murah", "cepat", "mudah", "senang", "puas", "mantap", "keren"]

                neg_count = sum(1 for w in neg_words if w in text_lower)
                pos_count = sum(1 for w in pos_words if w in text_lower)

                if neg_count > pos_count:
                    sentiment, score = "negative", 0.3
                elif pos_count > neg_count:
                    sentiment, score = "positive", 0.7
                else:
                    sentiment, score = "neutral", 0.5

                aspects.append(AspectSentiment(aspect=aspect_name, sentiment=sentiment, score=score))

        return AspectResult(aspects=aspects, source="keyword_fallback")

    async def check_health(self) -> dict:
        """Check if Senopati LLM is reachable."""
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{self._settings.LLM_BASE_URL}/health")
                return {"status": "ok", "response": response.json()}
        except Exception as e:
            return {"status": "error", "error": str(e)}
