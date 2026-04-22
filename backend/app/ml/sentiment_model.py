"""Sentiment classification using IndoBERTweet (lazy-loaded)."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class SentimentResult:
    label: str       # positive, negative, neutral
    score: float     # 0.0 to 1.0
    confidence: float
    all_scores: dict[str, float]


class SentimentModel:
    """Lazy-loaded IndoBERTweet sentiment classifier."""

    def __init__(self):
        self._model = None
        self._tokenizer = None
        self._loaded = False

    def _load(self):
        if self._loaded:
            return

        from transformers import AutoTokenizer, AutoModelForSequenceClassification
        import torch
        from app.ml.config import SENTIMENT_MODEL_NAME, DEVICE

        logger.info(f"Loading sentiment model: {SENTIMENT_MODEL_NAME} on {DEVICE}")
        self._tokenizer = AutoTokenizer.from_pretrained(SENTIMENT_MODEL_NAME)
        self._model = AutoModelForSequenceClassification.from_pretrained(SENTIMENT_MODEL_NAME)
        self._model.to(DEVICE)
        self._model.eval()
        self._loaded = True
        logger.info("Sentiment model loaded.")

    def predict(self, text: str) -> SentimentResult:
        self._load()

        import torch
        from app.ml.config import DEVICE, SENTIMENT_LABELS, MAX_TEXT_LENGTH

        inputs = self._tokenizer(
            text, return_tensors="pt", truncation=True,
            max_length=MAX_TEXT_LENGTH, padding=True
        )
        inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

        with torch.no_grad():
            outputs = self._model(**inputs)
            probs = torch.softmax(outputs.logits, dim=-1)[0]

        scores = {SENTIMENT_LABELS[i]: float(probs[i]) for i in range(len(SENTIMENT_LABELS))}
        top_idx = int(torch.argmax(probs))
        label = SENTIMENT_LABELS[top_idx]
        score = float(probs[top_idx])

        return SentimentResult(
            label=label,
            score=score,
            confidence=score,
            all_scores=scores,
        )

    def predict_batch(self, texts: list[str]) -> list[SentimentResult]:
        self._load()

        import torch
        from app.ml.config import DEVICE, SENTIMENT_LABELS, MAX_TEXT_LENGTH

        inputs = self._tokenizer(
            texts, return_tensors="pt", truncation=True,
            max_length=MAX_TEXT_LENGTH, padding=True
        )
        inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

        with torch.no_grad():
            outputs = self._model(**inputs)
            all_probs = torch.softmax(outputs.logits, dim=-1)

        results = []
        for probs in all_probs:
            scores = {SENTIMENT_LABELS[i]: float(probs[i]) for i in range(len(SENTIMENT_LABELS))}
            top_idx = int(torch.argmax(probs))
            label = SENTIMENT_LABELS[top_idx]
            score = float(probs[top_idx])
            results.append(SentimentResult(label=label, score=score, confidence=score, all_scores=scores))

        return results

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    def unload(self):
        import torch
        self._model = None
        self._tokenizer = None
        self._loaded = False
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
        logger.info("Sentiment model unloaded.")
