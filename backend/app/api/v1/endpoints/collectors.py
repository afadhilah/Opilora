"""
Collector management API endpoints.
"""
import logging
from uuid import UUID

from fastapi import APIRouter, Depends, Query, UploadFile, File, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.collection_log import CollectionLog
from app.schemas.collector import (
    CollectorStatusResponse,
    CollectionLogResponse,
    IngestionResultResponse,
    SchedulerJobResponse,
)
from app.services.scheduler import get_collectors, get_scheduler
from app.services.ingestion import ingest
from app.collectors.upload_collector import parse_csv, parse_json

logger = logging.getLogger(__name__)

router = APIRouter()


# ------------------------------------------------------------------
# GET /collectors — list all collectors and their status
# ------------------------------------------------------------------
@router.get("", response_model=list[CollectorStatusResponse])
async def list_collectors():
    """Return status of every registered collector."""
    collectors = get_collectors()
    return [CollectorStatusResponse(**c.get_status()) for c in collectors.values()]


# ------------------------------------------------------------------
# POST /collectors/{name}/run — trigger a collector manually
# ------------------------------------------------------------------
@router.post("/{name}/run", response_model=IngestionResultResponse)
async def trigger_collector(name: str):
    """Trigger a named collector immediately."""
    collectors = get_collectors()
    if name not in collectors:
        raise HTTPException(status_code=404, detail=f"Collector '{name}' not found. Available: {list(collectors.keys())}")

    collector = collectors[name]
    result = await collector.run()

    if not result.mentions:
        return IngestionResultResponse(
            total_received=0,
            saved=0,
            duplicates=0,
            analyzed=0,
            errors=len(result.errors),
            error_details=result.errors,
        )

    ingestion_result = await ingest(
        raw_mentions=result.mentions,
        collector_name=name,
        auto_analyze=True,
    )

    return IngestionResultResponse(
        total_received=ingestion_result.total_received,
        saved=ingestion_result.saved,
        duplicates=ingestion_result.duplicates,
        analyzed=ingestion_result.analyzed,
        errors=ingestion_result.errors,
        error_details=ingestion_result.error_details[:20],
    )


@router.post("/run-all", response_model=dict)
async def trigger_all_collectors():
    """Trigger all registered collectors sequentially and return per-collector summary."""
    collectors = get_collectors()
    batch_results: dict[str, dict] = {}

    for name, collector in collectors.items():
        collect_result = await collector.run()
        if not collect_result.mentions:
            batch_results[name] = {
                "total_received": 0,
                "saved": 0,
                "duplicates": 0,
                "analyzed": 0,
                "errors": len(collect_result.errors),
                "error_details": collect_result.errors[:20],
            }
            continue

        ingestion_result = await ingest(
            raw_mentions=collect_result.mentions,
            collector_name=name,
            auto_analyze=True,
        )

        batch_results[name] = {
            "total_received": ingestion_result.total_received,
            "saved": ingestion_result.saved,
            "duplicates": ingestion_result.duplicates,
            "analyzed": ingestion_result.analyzed,
            "errors": ingestion_result.errors,
            "error_details": ingestion_result.error_details[:20],
        }

    return {
        "collectors": batch_results,
        "total_collectors": len(batch_results),
    }


# ------------------------------------------------------------------
# POST /collectors/upload — upload CSV or JSON file
# ------------------------------------------------------------------
@router.post("/upload", response_model=IngestionResultResponse)
async def upload_file(file: UploadFile = File(...), topic_id: UUID | None = None):
    """Upload a CSV or JSON file to import mentions."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    content = (await file.read()).decode("utf-8")

    if file.filename.endswith(".csv"):
        collect_result = parse_csv(content)
    elif file.filename.endswith(".json"):
        collect_result = parse_json(content)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type. Use .csv or .json")

    if not collect_result.mentions and collect_result.errors:
        raise HTTPException(status_code=422, detail=collect_result.errors)

    ingestion_result = await ingest(
        raw_mentions=collect_result.mentions,
        collector_name="manual_upload",
        topic_id=topic_id,
        auto_analyze=True,
    )

    return IngestionResultResponse(
        total_received=ingestion_result.total_received,
        saved=ingestion_result.saved,
        duplicates=ingestion_result.duplicates,
        analyzed=ingestion_result.analyzed,
        errors=ingestion_result.errors,
        error_details=ingestion_result.error_details[:20],
    )


# ------------------------------------------------------------------
# GET /collectors/logs — paginated collection history
# ------------------------------------------------------------------
@router.get("/logs", response_model=dict)
async def list_collection_logs(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    collector_name: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    """Return paginated collection history."""
    query = select(CollectionLog).order_by(CollectionLog.created_at.desc())
    if collector_name:
        query = query.where(CollectionLog.collector_name == collector_name)

    total = (await db.execute(select(func.count()).select_from(query.subquery()))).scalar() or 0
    items = (await db.execute(query.offset((page - 1) * per_page).limit(per_page))).scalars().all()

    return {
        "items": [CollectionLogResponse.model_validate(item) for item in items],
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": (total + per_page - 1) // per_page if total > 0 else 0,
    }


# ------------------------------------------------------------------
# GET /collectors/scheduler — scheduler job status
# ------------------------------------------------------------------
@router.get("/scheduler", response_model=list[SchedulerJobResponse])
async def scheduler_status():
    """Return status of all scheduled jobs."""
    scheduler = get_scheduler()
    if not scheduler or not scheduler.running:
        return []

    jobs = []
    for job in scheduler.get_jobs():
        jobs.append(
            SchedulerJobResponse(
                id=job.id,
                name=job.name,
                next_run=str(job.next_run_time) if job.next_run_time else None,
                trigger=str(job.trigger),
            )
        )
    return jobs
