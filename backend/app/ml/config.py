"""ML configuration — model names, thresholds, device selection."""
import torch


def get_device() -> str:
    """Auto-detect GPU, fallback to CPU."""
    if torch.cuda.is_available():
        return "cuda"
    return "cpu"


# Device
DEVICE = get_device()

# Sentiment model (IndoBERTweet fine-tuned for sentiment)
SENTIMENT_MODEL_NAME = "mdhugol/indonesia-bert-sentiment-classification"
SENTIMENT_LABELS = {0: "positive", 1: "neutral", 2: "negative"}

# Emotion model (Indonesian RoBERTa emotion)
EMOTION_MODEL_NAME = "StevenLimcorn/indonesian-roberta-base-emotion-classifier"
EMOTION_LABELS = {0: "sadness", 1: "joy", 2: "love", 3: "anger", 4: "fear", 5: "surprise"}

# Confidence thresholds
SENTIMENT_CONFIDENCE_THRESHOLD = 0.4
EMOTION_CONFIDENCE_THRESHOLD = 0.3

# Batch
MAX_BATCH_SIZE = 50
MAX_TEXT_LENGTH = 512
