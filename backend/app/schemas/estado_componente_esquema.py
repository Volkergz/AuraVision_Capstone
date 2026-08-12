from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class EstadoComponenteBase(BaseModel):
    """
    Campos comunes del estado de un componente.
    """

    id_dispositivo_fk: UUID
    id_componente_fk: int = Field(..., ge=1)
    estado: str = Field(..., min_length=1, max_length=100)
    mensaje_error: str = Field(..., min_length=1, max_length=255)
    fecha_revision: date


class EstadoComponenteCrear(EstadoComponenteBase):
    """
    Datos para crear un estado de componente.
    """


class EstadoComponenteActualizar(BaseModel):
    """
    Datos para actualizar un estado de componente.
    """

    estado: str | None = Field(default=None, min_length=1, max_length=100)
    mensaje_error: str | None = Field(default=None, min_length=1, max_length=255)
    fecha_revision: date | None = None


class EstadoComponenteRespuesta(EstadoComponenteBase):
    """
    Respuesta pública del estado de un componente.
    """

    id_estado: int

    model_config = ConfigDict(from_attributes=True)