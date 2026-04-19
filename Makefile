.PHONY: dev-infra dev-backend dev-frontend dev seed migrate test clean

# Start infrastructure (PostgreSQL, Redis)
dev-infra:
	docker-compose up -d

# Start backend
dev-backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Start frontend
dev-frontend:
	cd frontend && npm run dev

# Start everything
dev:
	@echo "Starting infrastructure..."
	docker-compose up -d
	@echo "Starting backend..."
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
	@echo "Starting frontend..."
	cd frontend && npm run dev

# Seed database with mock data
seed:
	cd backend && python -m app.utils.seed_data

# Install backend dependencies
install-backend:
	cd backend && pip install -r requirements.txt

# Install frontend dependencies
install-frontend:
	cd frontend && npm install

# Install all dependencies
install: install-backend install-frontend

# Run tests
test:
	cd backend && pytest tests/ -v

# Clean up
clean:
	docker-compose down -v
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
