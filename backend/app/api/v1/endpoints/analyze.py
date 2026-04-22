"""ML analysis API endpoints — analyze text, batch analyze, model status."""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.ml.pipeline import get_pipeline

router = APIRouter()


class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Teks yang akan dianalisis")
    include_aspects: bool = Field(True, description="Sertakan analisis aspek (menggunakan LLM)")


class BatchAnalyzeRequest(BaseModel):
    texts: list[str] = Field(..., min_length=1, max_length=50, description="List teks (max 50)")
    include_aspects: bool = Field(False, description="Sertakan analisis aspek per teks")


class AnalyzeResponse(BaseModel):
    original_text: str
    cleaned_text: str
    sentiment: dict
    emotion: dict
    aspects: dict
    metadata: dict


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_text(request: AnalyzeRequest):
    """Analisis sentimen, emosi, dan aspek dari satu teks."""
    pipeline = get_pipeline()
    try:
        result = await pipeline.analyze(request.text, include_aspects=request.include_aspects)
        return result.to_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@router.post("/analyze/batch", response_model=list[AnalyzeResponse])
async def analyze_batch(request: BatchAnalyzeRequest):
    """Analisis batch (max 50 teks). Aspek default disabled untuk performa."""
    pipeline = get_pipeline()
    try:
        results = await pipeline.analyze_batch(request.texts, include_aspects=request.include_aspects)
        return [r.to_dict() for r in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch analysis failed: {str(e)}")


@router.get("/status")
async def ml_status():
    """Status model ML (loaded/unloaded, device, LLM health)."""
    pipeline = get_pipeline()
    status = pipeline.get_status()

    # Check LLM health
    llm_health = await pipeline._aspect_model.check_health()
    status["llm_health"] = llm_health

    return status
