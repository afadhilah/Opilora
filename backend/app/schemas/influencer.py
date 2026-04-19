from pydantic import BaseModel
from uuid import UUID


class InfluencerResponse(BaseModel):
    id: UUID
    name: str
    handle: str
    platform: str
    followers: int = 0
    engagement_rate: float = 0.0
    reach: int = 0
    verified: bool = False
    sentiment_leaning: float = 0.5
    mention_count: int = 0

    model_config = {"from_attributes": True}


class NetworkNode(BaseModel):
    id: str
    label: str
    size: int


class NetworkEdge(BaseModel):
    source: str
    target: str
    weight: float


class NetworkResponse(BaseModel):
    nodes: list[NetworkNode]
    edges: list[NetworkEdge]
