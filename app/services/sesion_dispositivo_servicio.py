from uuid import UUID

from sqlalchemy.orm import Session

from app.core.fecha import ahora_chile
from app.models.sesion_dispositivo import SesionDispositivo
from app.repositories.dispositivo_repositorio import DispositivoRepositorio
from app.repositories.sesion_dispositivo_repositorio import SesionDispositivoRepositorio
from app.schemas.sesion_dispositivo_esquema import (
    SesionDispositivoCrear,
    SesionDispositivoRespuesta,
)


class SesionDispositivoServicio:
    """Gestiona el vínculo activo entre un usuario y un dispositivo."""

    def __init__(self, db: Session):
        self.db = db
        self.repositorio = SesionDispositivoRepositorio(db)
        self.dispositivo_repositorio = DispositivoRepositorio(db)

    def vincular(
        self,
        usuario_id: UUID,
        datos: SesionDispositivoCrear,
    ) -> SesionDispositivoRespuesta:
        dispositivo = self.dispositivo_repositorio.buscar_por_id(
            datos.id_dispositivo_fk,
        )
        if not dispositivo:
            raise ValueError("El dispositivo no existe.")

        if self.repositorio.buscar_activa(usuario_id, datos.id_dispositivo_fk):
            raise ValueError("El dispositivo ya está vinculado a este usuario.")

        sesion = SesionDispositivo(
            id_dispositivo_fk=datos.id_dispositivo_fk,
            id_usuario_fk=usuario_id,
        )

        try:
            self.repositorio.crear(sesion)
            self.db.commit()
            return SesionDispositivoRespuesta.model_validate(sesion)
        except Exception:
            self.db.rollback()
            raise

    def obtener_activa(self, usuario_id: UUID) -> SesionDispositivoRespuesta:
        sesion = self.repositorio.buscar_activa_por_usuario(usuario_id)
        if not sesion:
            raise ValueError("El usuario no tiene un dispositivo vinculado.")
        return SesionDispositivoRespuesta.model_validate(sesion)

    def desvincular(self, usuario_id: UUID) -> None:
        sesion = self.repositorio.buscar_activa_por_usuario(usuario_id)
        if not sesion:
            raise ValueError("El usuario no tiene un dispositivo vinculado.")

        sesion.activa = False
        sesion.fecha_fin = ahora_chile()

        try:
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise