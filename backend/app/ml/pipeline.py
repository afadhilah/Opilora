"""Sentiment analysis pipeline — orchestrates preprocessing, sentiment, emotion, and aspect models."""
import logging
from dataclasses import dataclass, field
from app.ml.preprocessing import clean_text, extract_hashtags, extract_mentions
from app.ml.sentiment_model import SentimentModel, SentimentResult
from app.ml.emotion_model import EmotionModel, EmotionResult
from app.ml.aspect_model import AspectModel, AspectResult

logger = logging.getLogger(__name__)


@dataclass
class AnalysisResult:
    """Complete analysis result for a single text."""
    original_text: str
    cleaned_text: str
    sentiment: SentimentResult
    emotion: EmotionResult
    aspects: AspectResult
    hashtags: list[str] = field(default_factory=list)
    mentions: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "original_text": self.original_text,
            "cleaned_text": self.cleaned_text,
            "sentiment": {
                "label": self.sentiment.label,
                "score": self.sentiment.score,
                "confidence": self.sentiment.confidence,
                "all_scores": self.sentiment.all_scores,
            },
            "emotion": {
                "emotion": self.emotion.emotion,
                "score": self.emotion.score,
                "all_scores": self.emotion.all_scores,
            },
            "aspects": {
                "items": [
                    {"aspect": a.aspect, "sentiment": a.sentiment, "score": a.score}
                    for a in self.aspects.aspects
                ],
                "source": self.aspects.source,
            },
            "metadata": {
                "hashtags": self.hashtags,
                "mentions": self.mentions,
            },
        }


class SentimentPipeline:
    """Main pipeline that orchestrates all ML models."""

    def __init__(self):
        self._sentiment_model = SentimentModel()
        self._emotion_model = EmotionModel()
        self._aspect_model = AspectModel()

    async def analyze(self, text: str, include_aspects: bool = True) -> AnalysisResult:
        """Analyze a single text with all models."""
        # Metadata extraction (from original text)
        hashtags = extract_hashtags(text)
        mentions = extract_mentions(text)

        # Preprocessing
        cleaned = clean_text(text)
        if not cleaned:
            # Return empty result for empty text
            return AnalysisResult(
                original_text=text,
                cleaned_text="",
                sentiment=SentimentResult(label="neutral", score=0.5, confidence=0.0, all_scores={}),
                emotion=EmotionResult(emotion="neutral", score=0.0, all_scores={}),
                aspects=AspectResult(),
                hashtags=hashtags,
                mentions=mentions,
            )

        # Sentiment & emotion (sync — local models)
        sentiment = self._sentiment_model.predict(cleaned)
        emotion = self._emotion_model.predict(cleaned)

        # Aspect-based (async — LLM call)
        if include_aspects:
            aspects = await self._aspect_model.extract(cleaned)
        else:
            aspects = AspectResult()

        return AnalysisResult(
            original_text=text,
            cleaned_text=cleaned,
            sentiment=sentiment,
            emotion=emotion,
            aspects=aspects,
            hashtags=hashtags,
            mentions=mentions,
        )

    async def analyze_batch(
        self, texts: list[str], include_aspects: bool = False
    ) -> list[AnalysisResult]:
        """Analyze multiple texts. Aspects disabled by default for batch (LLM is slow)."""
        from app.ml.config import MAX_BATCH_SIZE

        if len(texts) > MAX_BATCH_SIZE:
            texts = texts[:MAX_BATCH_SIZE]

        # Preprocess all
        cleaned_texts = [clean_text(t) for t in texts]
        all_hashtags = [extract_hashtags(t) for t in texts]
        all_mentions = [extract_mentions(t) for t in texts]

        # Batch inference for sentiment & emotion
        valid_indices = [i for i, t in enumerate(cleaned_texts) if t]
        valid_cleaned = [cleaned_texts[i] for i in valid_indices]

        if valid_cleaned:
            sentiments = self._sentiment_model.predict_batch(valid_cleaned)
            emotions = self._emotion_model.predict_batch(valid_cleaned)
        else:
            sentiments, emotions = [], []

        # Build results
        results = []
        valid_idx = 0
        for i, text in enumerate(texts):
            if i in valid_indices:
                sentiment = sentiments[valid_idx]
                emotion = emotions[valid_idx]
                valid_idx += 1

                if include_aspects:
                    aspects = await self._aspect_model.extract(cleaned_texts[i])
                else:
                    aspects = AspectResult()
            else:
                sentiment = SentimentResult(label="neutral", score=0.5, confidence=0.0, all_scores={})
                emotion = EmotionResult(emotion="neutral", score=0.0, all_scores={})
                aspects = AspectResult()

            results.append(AnalysisResult(
                original_text=text,
                cleaned_text=cleaned_texts[i],
                sentiment=sentiment,
                emotion=emotion,
                aspects=aspects,
                hashtags=all_hashtags[i],
                mentions=all_mentions[i],
            ))

        return results

    def get_status(self) -> dict:
        """Get model loading status."""
        from app.ml.config import DEVICE, SENTIMENT_MODEL_NAME, EMOTION_MODEL_NAME
        return {
            "device": DEVICE,
            "sentiment_model": {
                "name": SENTIMENT_MODEL_NAME,
                "loaded": self._sentiment_model.is_loaded,
            },
            "emotion_model": {
                "name": EMOTION_MODEL_NAME,
                "loaded": self._emotion_model.is_loaded,
            },
            "aspect_model": {
                "type": "llm",
                "endpoint": self._aspect_model._settings.LLM_BASE_URL,
                "model": self._aspect_model._settings.LLM_MODEL,
            },
        }

    def unload_all(self):
        """Free all model memory."""
        self._sentiment_model.unload()
        self._emotion_model.unload()
        logger.info("All models unloaded.")


# Singleton pipeline
_pipeline: SentimentPipeline | None = None


def get_pipeline() -> SentimentPipeline:
    global _pipeline
    if _pipeline is None:
        _pipeline = SentimentPipeline()
    return _pipeline
