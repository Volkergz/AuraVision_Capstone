from typing import List

from pydantic import BaseModel


# respuesta que devolverá el servicio GPU

class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float


class Detection(BaseModel):
    label: str
    confidence: float
    # bbox: BoundingBox
    relative_position: str | None = None


class PredictionResponse(BaseModel):
    model_name: str
    model_version: str
    image_width: int
    image_height: int
    inference_time_ms: int
    detections: List[Detection]

