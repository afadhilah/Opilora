"""Emotion detection using Indonesian RoBERTa (lazy-loaded)."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class EmotionResult:
    emotion: str      # joy, sadness, anger, fear, surprise, love
    score: float      # 0.0 to 1.0
    all_scores: dict[str, float]


class EmotionModel:
    """Lazy-loaded Indonesian RoBERTa emotion classifier."""

    def __init__(self):
        self._model = None
        self._tokenizer = None
        self._loaded = False

    def _load(self):
        if self._loaded:
            return

        from transformers import AutoTokenizer, AutoModelForSequenceClassification
        import torch
        from app.ml.config import EMOTION_MODEL_NAME, DEVICE

        logger.info(f"Loading emotion model: {EMOTION_MODEL_NAME} on {DEVICE}")
        self._tokenizer = AutoTokenizer.from_pretrained(EMOTION_MODEL_NAME)
        self._model = AutoModelForSequenceClassification.from_pretrained(EMOTION_MODEL_NAME)
        self._model.to(DEVICE)
        self._model.eval()
        self._loaded = True
        logger.info("Emotion model loaded.")

    def predict(self, text: str) -> EmotionResult:
        self._load()

        import torch
        from app.ml.config import DEVICE, EMOTION_LABELS, MAX_TEXT_LENGTH, EMOTION_CONFIDENCE_THRESHOLD

        inputs = self._tokenizer(
            text, return_tensors="pt", truncation=True,
            max_length=MAX_TEXT_LENGTH, padding=True
        )
        inputs = {k: v.to(DEVICE) for k, v in inputs.items()}

        with torch.no_grad():
            outputs = self._model(**inputs)
            probs = torch.softmax(outputs.logits, dim=-1)[0]

        scores = {EMOTION_LABELS[i]: float(probs[i]) for i in range(len(EMOTION_LABELS))}
        top_idx = int(torch.argmax(probs))
        emotion = EMOTION_LABELS[top_idx]
        score = float(probs[top_idx])

        # If confidence too low, return neutral-ish
        if score < EMOTION_CONFIDENCE_THRESHOLD:
            emotion = "neutral"
            score = 0.0

        return EmotionResult(emotion=emotion, score=score, all_scores=scores)

    def predict_batch(self, texts: list[str]) -> list[EmotionResult]:
        self._load()

        import torch
        from app.ml.config import DEVICE, EMOTION_LABELS, MAX_TEXT_LENGTH, EMOTION_CONFIDENCE_THRESHOLD

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
            scores = {EMOTION_LABELS[i]: float(probs[i]) for i in range(len(EMOTION_LABELS))}
            top_idx = int(torch.argmax(probs))
            emotion = EMOTION_LABELS[top_idx]
            score = float(probs[top_idx])
            if score < EMOTION_CONFIDENCE_THRESHOLD:
                emotion = "neutral"
                score = 0.0
            results.append(EmotionResult(emotion=emotion, score=score, all_scores=scores))
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
        logger.info("Emotion model unloaded.")
