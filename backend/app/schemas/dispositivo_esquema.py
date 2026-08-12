from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class DispositivoBase(BaseModel):
    """
    Campos comunes de un dispositivo.
    """

    id_usuario_fk: UUID | None = Field(
        default=None,
        description="Usuario propietario del dispositivo",
    )

    nombre: str = Field(..., min_length=2, max_length=100)
    numero_serie: str = Field(..., min_length=2, max_length=100)
    version_firmware: str = Field(..., min_length=1, max_length=50)
    estado_conexion: str = Field(..., min_length=1, max_length=50)


class DispositivoCrear(DispositivoBase):
    """
    Datos para crear un dispositivo.
    """


class DispositivoActualizar(BaseModel):
    """
    Datos para actualizar un dispositivo.
    """

    id_usuario_fk: UUID | None = None
    nombre: str | None = Field(default=None, min_length=2, max_length=100)
    numero_serie: str | None = Field(default=None, min_length=2, max_length=100)
    version_firmware: str | None = Field(default=None, min_length=1, max_length=50)
    estado_conexion: str | None = Field(default=None, min_length=1, max_length=50)


class DispositivoRespuesta(DispositivoBase):
    """
    Respuesta pública de un dispositivo.
    """

    id_dispositivo: UUID

    model_config = ConfigDict(from_attributes=True)