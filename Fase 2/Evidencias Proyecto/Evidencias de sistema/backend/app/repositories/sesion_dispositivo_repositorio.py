from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.sesion_dispositivo import SesionDispositivo


class SesionDispositivoRepositorio:
    """Repository para las vinculaciones entre usuarios y dispositivos."""

    def __init__(self, db: Session):
        self.db = db

    def buscar_activa(
        self,
        usuario_id: UUID,
        dispositivo_id: UUID,
    ) -> SesionDispositivo | None:
        consulta = select(SesionDispositivo).where(
            SesionDispositivo.id_usuario_fk == usuario_id,
            SesionDispositivo.id_dispositivo_fk == dispositivo_id,
            SesionDispositivo.activa.is_(True),
        )
        return self.db.scalar(consulta)

    def buscar_activa_por_usuario(
        self,
        usuario_id: UUID,
    ) -> SesionDispositivo | None:
        consulta = select(SesionDispositivo).where(
            SesionDispositivo.id_usuario_fk == usuario_id,
            SesionDispositivo.activa.is_(True),
        ).order_by(SesionDispositivo.fecha_inicio.desc())
        return self.db.scalar(consulta)

    def crear(self, sesion: SesionDispositivo) -> SesionDispositivo:
        self.db.add(sesion)
        self.db.flush()
        return sesion

    def listar_por_usuario(self, usuario_id: UUID) -> list[SesionDispositivo]:
        consulta = select(SesionDispositivo).where(
            SesionDispositivo.id_usuario_fk == usuario_id,
        ).order_by(SesionDispositivo.fecha_inicio.desc())
        return list(self.db.scalars(consulta).all())