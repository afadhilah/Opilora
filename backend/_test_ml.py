import httpx, json

BASE = "http://localhost:8000/api/v1"
client = httpx.Client(timeout=120.0)

tests = [
    ("NEGATIF", "Harga BBM naik lagi, rakyat kecil makin susah hidup"),
    ("POSITIF", "MRT Jakarta mantap banget, bersih dan cepat! Senang naik setiap hari"),
    ("NETRAL", "Pemerintah mengumumkan kebijakan baru tentang subsidi energi tahun depan"),
    ("SARKASME", "Wah bagus ya harga naik terus, rakyat pasti senang banget"),
]

for label, text in tests:
    print(f"=== TEST {label} ===")
    r = client.post(f"{BASE}/ml/analyze", json={"text": text, "include_aspects": False})
    d = r.json()
    s = d["sentiment"]
    e = d["emotion"]
    print(f"  Input: {text}")
    print(f"  Sentiment: {s['label'].upper()} ({s['score']:.1%})")
    print(f"  Emotion: {e['emotion']} ({e['score']:.1%})")
    print()

# Batch test
print("=== BATCH TEST (3 texts) ===")
r = client.post(f"{BASE}/ml/analyze/batch", json={
    "texts": [t[1] for t in tests[:3]],
    "include_aspects": False,
})
for i, d in enumerate(r.json()):
    print(f"  [{i+1}] {d['sentiment']['label']} ({d['sentiment']['score']:.1%}) | {d['emotion']['emotion']}")

print("\n[OK] All ML tests passed!")
client.close()
