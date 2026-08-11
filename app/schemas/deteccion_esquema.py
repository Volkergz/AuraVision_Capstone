from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class DeteccionBase(BaseModel):
    """
    Campos comunes de una detección.
    """

    id_dispositivo_fk: UUID
    tipo_objeto: str = Field(..., min_length=2, max_length=100)
    descripcion: str = Field(..., min_length=2, max_length=255)
    confianza: float = Field(..., ge=0, le=1)
    distancia_estimada: int = Field(..., ge=0)


class DeteccionCrear(DeteccionBase):
    """
    Datos para crear una detección.
    """


class DeteccionRespuesta(DeteccionBase):
    """
    Respuesta pública de una detección.
    """

    id_deteccion: int
    fecha_deteccion: datetime

    model_config = ConfigDict(from_attributes=True)