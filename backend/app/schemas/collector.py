"""Pydantic schemas for the collector subsystem."""
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


class CollectorStatusResponse(BaseModel):
    name: str
    platform: str
    status: str
    last_run: str | None = None
    last_count: int = 0
    last_errors: list[str] = []


class CollectionLogResponse(BaseModel):
    id: UUID
    collector_name: str
    status: str
    mentions_collected: int
    mentions_saved: int
    duplicates: int
    errors: int
    error_details: dict | None = None
    duration_ms: int
    started_at: datetime
    finished_at: datetime
    created_at: datetime

    model_config = {"from_attributes": True}


class IngestionResultResponse(BaseModel):
    total_received: int
    saved: int
    duplicates: int
    analyzed: int
    errors: int
    error_details: list[str] = []


class SchedulerJobResponse(BaseModel):
    id: str
    name: str
    next_run: str | None = None
    trigger: str
