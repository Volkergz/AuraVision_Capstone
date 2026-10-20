from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SesionDispositivoCrear(BaseModel):
    id_dispositivo_fk: UUID


class SesionDispositivoRespuesta(BaseModel):
    id_sesion_dispositivo: UUID
    id_dispositivo_fk: UUID
    id_usuario_fk: UUID
    fecha_inicio: datetime
    fecha_fin: datetime | None
    activa: bool

    model_config = ConfigDict(from_attributes=True)