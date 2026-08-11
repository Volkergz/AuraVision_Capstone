from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ConfiguracionBase(BaseModel):
    """
    Campos comunes de la configuración del dispositivo.
    """

    volumen: int = Field(..., ge=0, le=100)
    auto_conexion: bool


class ConfiguracionCrear(ConfiguracionBase):
    """
    Datos para crear una configuración.
    """

    id_dispositivo_fk: UUID = Field(...)


class ConfiguracionActualizar(BaseModel):
    """
    Datos para actualizar la configuración.
    """

    volumen: int | None = Field(default=None, ge=0, le=100)
    auto_conexion: bool | None = None


class ConfiguracionRespuesta(ConfiguracionBase):
    """
    Respuesta pública de una configuración.
    """

    id_configuracion: int
    id_dispositivo_fk: UUID
    fecha_actualizacion: datetime

    model_config = ConfigDict(from_attributes=True)