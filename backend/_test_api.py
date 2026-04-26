import httpx

BASE = "http://localhost:8000/api/v1"
client = httpx.Client(timeout=60.0)  # longer timeout for ML

# 1. Health
r = client.get(f"{BASE}/health")
print("=== HEALTH ===")
print(r.json())
print()

# 2. Dashboard Stats
r = client.get(f"{BASE}/dashboard/stats")
print("=== DASHBOARD STATS ===")
print(r.json())
print()

# 3. Mentions
r = client.get(f"{BASE}/mentions?per_page=3")
data = r.json()
print(f"=== MENTIONS (total={data['total']}, pages={data['pages']}) ===")
for m in data["items"]:
    s = m.get("sentiment_label") or "?"
    print(f"  [{m['platform']}] {m['content'][:55]}... | {s}")
print()

# 4. Topics
r = client.get(f"{BASE}/topics")
print("=== TOPICS ===")
for t in r.json():
    print(f"  {t['name']} ({t['mention_count']} mentions, trend={t['trend']})")
print()

# 5. Risk Score
r = client.get(f"{BASE}/escalations/risk-score")
print("=== RISK SCORE ===")
rs = r.json()
print(f"  Score: {rs['current_score']}, Level: {rs['level']}, Trend: {rs['trend']}")
print()

# 6. Collectors
r = client.get(f"{BASE}/collectors")
print("=== COLLECTORS ===")
for c in r.json():
    print(f"  {c['name']}: {c['status']}")
print()

# 7. ML Status
print("=== ML STATUS ===")
try:
    r = client.get(f"{BASE}/ml/status")
    print(r.json())
except Exception as e:
    print(f"  Timeout/error (normal jika Senopati LLM tidak reachable): {type(e).__name__}")
print()

# 8. ML Analyze - TEST SENTIMEN
print("=== ML ANALYZE (Sentiment Test) ===")
r = client.post(f"{BASE}/ml/analyze", json={
    "text": "Harga BBM naik lagi, rakyat kecil makin susah hidup di kota besar",
    "include_aspects": False
})
result = r.json()
print(f"  Text: {result['original_text']}")
print(f"  Cleaned: {result['cleaned_text']}")
print(f"  Sentiment: {result['sentiment']['label']} (score={result['sentiment']['score']:.3f})")
print(f"  Emotion: {result['emotion']['emotion']} (score={result['emotion']['score']:.3f})")
print()

# 9. ML Analyze - another one
print("=== ML ANALYZE (Positive) ===")
r = client.post(f"{BASE}/ml/analyze", json={
    "text": "MRT Jakarta mantap banget, bersih dan cepat! Senang bisa naik setiap hari",
    "include_aspects": False
})
result = r.json()
print(f"  Text: {result['original_text']}")
print(f"  Sentiment: {result['sentiment']['label']} (score={result['sentiment']['score']:.3f})")
print(f"  Emotion: {result['emotion']['emotion']} (score={result['emotion']['score']:.3f})")
print()

print("[OK] Pipeline test complete!")
client.close()
