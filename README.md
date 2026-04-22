# Opilora

Analisis dan Simulasi Opini Publik Menggunakan Sentiment Analysis dan Multi-Agent untuk Mengidentifikasi Eskalasi Isu Digital.

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- Docker Desktop

### 1. Start Infrastructure
```bash
docker-compose up -d
```

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
python -m app.utils.seed_data   # seed mock data
uvicorn app.main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

### 2.1 Data Collection Pipeline (Scraping/API)
- Scheduler otomatis menjalankan collector: `rss_news`, `twitter_mock`, `api_sources`, `web_scraper`
- Trigger manual collector:
	- `POST /api/v1/collectors/{name}/run`
	- `POST /api/v1/collectors/run-all`
	- `GET /api/v1/collectors` untuk status collector

Opsional konfigurasi sumber data lewat environment variable (JSON array):
- `OPILORA_API_SOURCES_JSON`
- `OPILORA_SCRAPER_TARGETS_JSON`

Contoh `OPILORA_API_SOURCES_JSON`:
```json
[
	{
		"name": "My API",
		"url": "https://example.com/api/posts",
		"platform": "api_public",
		"content_field": "text",
		"author_field": "author",
		"published_field": "published_at",
		"source_url_field": "url",
		"items_key": "data",
		"max_items": 50
	}
]
```

Contoh `OPILORA_SCRAPER_TARGETS_JSON`:
```json
[
	{
		"name": "Portal Berita",
		"url": "https://example.com/news",
		"platform": "web_news",
		"content_selector": "h1, article p",
		"max_paragraphs": 20
	}
]
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Dashboard: http://localhost:3000

## Project Structure
```
opilora/
├── frontend/          # React Dashboard (Vite + TypeScript)
├── backend/           # Python FastAPI
├── docker-compose.yml # PostgreSQL + Redis
├── Makefile           # Common commands
└── Roadmap.md         # Development roadmap
```

## Tech Stack
- **Frontend**: React 19, TypeScript, TailwindCSS, Recharts, Zustand
- **Backend**: Python FastAPI, SQLAlchemy (async), Pydantic
- **Database**: PostgreSQL 16, Redis 7
- **LLM**: Self-hosted, OpenAI-compatible format
