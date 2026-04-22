"""Text preprocessing for Indonesian social media text."""
import re
import unicodedata

# Common Indonesian slang normalization
SLANG_MAP = {
    "gk": "tidak", "gak": "tidak", "ga": "tidak", "tdk": "tidak", "ngga": "tidak", "nggak": "tidak",
    "yg": "yang", "dgn": "dengan", "utk": "untuk", "krn": "karena", "krna": "karena",
    "bgt": "banget", "bngt": "banget", "bkn": "bukan", "blm": "belum",
    "sdh": "sudah", "udh": "sudah", "udah": "sudah",
    "jg": "juga", "jgn": "jangan", "jd": "jadi", "jdi": "jadi",
    "tp": "tapi", "tpi": "tapi",
    "sm": "sama", "sma": "sama",
    "bs": "bisa", "bsa": "bisa",
    "org": "orang", "bnyk": "banyak", "byk": "banyak",
    "dr": "dari", "dri": "dari",
    "klo": "kalau", "kalo": "kalau", "kl": "kalau",
    "lg": "lagi", "lgi": "lagi",
    "skrg": "sekarang", "skrng": "sekarang",
    "gmn": "gimana", "gmna": "gimana",
    "emg": "memang", "emng": "memang",
    "knp": "kenapa", "knpa": "kenapa",
    "aja": "saja", "aj": "saja",
    "sy": "saya", "ak": "aku", "gw": "saya", "gue": "saya",
    "lu": "kamu", "lo": "kamu",
}

URL_PATTERN = re.compile(r"https?://\S+|www\.\S+")
MENTION_PATTERN = re.compile(r"@\w+")
HASHTAG_PATTERN = re.compile(r"#(\w+)")
MULTIPLE_SPACES = re.compile(r"\s+")
EMOJI_PATTERN = re.compile(
    "["
    "\U0001F600-\U0001F64F"
    "\U0001F300-\U0001F5FF"
    "\U0001F680-\U0001F6FF"
    "\U0001F1E0-\U0001F1FF"
    "\U00002702-\U000027B0"
    "\U0001f926-\U0001f937"
    "\U00010000-\U0010ffff"
    "\u2640-\u2642"
    "\u2600-\u2B55"
    "\u200d"
    "\u23cf"
    "\u23e9"
    "\u231a"
    "\ufe0f"
    "\u3030"
    "]+",
    flags=re.UNICODE,
)


def clean_text(text: str) -> str:
    """Full preprocessing pipeline for Indonesian social media text."""
    if not text or not text.strip():
        return ""

    # Remove URLs
    text = URL_PATTERN.sub("", text)

    # Remove mentions but keep context
    text = MENTION_PATTERN.sub("", text)

    # Convert hashtags to words (keep the text)
    text = HASHTAG_PATTERN.sub(r"\1", text)

    # Remove excess emojis (keep first occurrence for sentiment signal)
    emojis = EMOJI_PATTERN.findall(text)
    text = EMOJI_PATTERN.sub("", text)
    if emojis:
        text = text + " " + emojis[0]  # keep one emoji

    # Normalize unicode
    text = unicodedata.normalize("NFKC", text)

    # Lowercase
    text = text.lower().strip()

    # Normalize slang
    words = text.split()
    normalized = [SLANG_MAP.get(w, w) for w in words]
    text = " ".join(normalized)

    # Clean multiple spaces
    text = MULTIPLE_SPACES.sub(" ", text).strip()

    return text


def extract_hashtags(text: str) -> list[str]:
    """Extract hashtags from raw text."""
    return HASHTAG_PATTERN.findall(text)


def extract_mentions(text: str) -> list[str]:
    """Extract @mentions from raw text."""
    return MENTION_PATTERN.findall(text)
