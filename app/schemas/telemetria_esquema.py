from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class TelemetriaBase(BaseModel):
    """
    Campos comunes de una lectura de telemetría.
    """

    id_dispositivo_fk: UUID
    porcentaje_bateria: int = Field(..., ge=0, le=100)
    tiempo_restante: int = Field(..., ge=0)
    estado_conexion: bool
    voltaje_bateria: float | None = Field(default=None, ge=0)
    nivel_senal: int | None = Field(default=None, ge=0)


class TelemetriaCrear(TelemetriaBase):
    """
    Datos para crear una lectura de telemetría.
    """


class TelemetriaRespuesta(TelemetriaBase):
    """
    Respuesta pública de una lectura de telemetría.
    """

    id_telemetria: int
    fecha_dispositivo: datetime

    model_config = ConfigDict(from_attributes=True)