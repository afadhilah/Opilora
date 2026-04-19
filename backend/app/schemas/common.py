from datetime import datetime
from pydantic import BaseModel, Field
from uuid import UUID


class PaginationParams(BaseModel):
    page: int = Field(1, ge=1)
    per_page: int = Field(20, ge=1, le=100)


class PaginatedResponse(BaseModel):
    items: list
    total: int
    page: int
    per_page: int
    pages: int


class FilterParams(BaseModel):
    start_date: datetime | None = None
    end_date: datetime | None = None
    platforms: list[str] | None = None
    sentiments: list[str] | None = None
    keywords: list[str] | None = None


class HealthResponse(BaseModel):
    status: str = "ok"
    version: str
    timestamp: datetime
