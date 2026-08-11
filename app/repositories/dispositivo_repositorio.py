from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.dispositivo import Dispositivo


class DispositivoRepositorio:
    """
    Repository para la tabla dispositivos.
    """

    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> list[Dispositivo]:
        consulta = select(Dispositivo)
        return list(self.db.scalars(consulta).all())

    def buscar_por_id(
        self,
        dispositivo_id: UUID,
    ) -> Dispositivo | None:
        consulta = select(Dispositivo).where(
            Dispositivo.id_dispositivo == dispositivo_id,
        )
        return self.db.scalar(consulta)

    def buscar_por_usuario(
        self,
        usuario_id: UUID,
    ) -> list[Dispositivo]:
        consulta = select(Dispositivo).where(
            Dispositivo.id_usuario_fk == usuario_id,
        )
        return list(self.db.scalars(consulta).all())

    def buscar_por_numero_serie(
        self,
        numero_serie: str,
    ) -> Dispositivo | None:
        consulta = select(Dispositivo).where(
            Dispositivo.numero_serie == numero_serie,
        )
        return self.db.scalar(consulta)

    def crear(self, dispositivo: Dispositivo) -> Dispositivo:
        self.db.add(dispositivo)
        self.db.flush()
        return dispositivo

    def actualizar(self, dispositivo: Dispositivo) -> Dispositivo:
        self.db.flush()
        return dispositivo

    def eliminar(self, dispositivo: Dispositivo) -> None:
        self.db.delete(dispositivo)
        self.db.flush()