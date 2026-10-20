from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.estado_componente import EstadoComponente


class EstadoComponenteRepositorio:
    """
    Repository para la tabla estado_componente.
    """

    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> list[EstadoComponente]:
        consulta = select(EstadoComponente)
        return list(self.db.scalars(consulta).all())

    def buscar_por_id(self, estado_id: int) -> EstadoComponente | None:
        consulta = select(EstadoComponente).where(
            EstadoComponente.id_estado == estado_id,
        )
        return self.db.scalar(consulta)

    def buscar_por_dispositivo(
        self,
        dispositivo_id: UUID,
    ) -> list[EstadoComponente]:
        consulta = select(EstadoComponente).where(
            EstadoComponente.id_dispositivo_fk == dispositivo_id,
        )
        return list(self.db.scalars(consulta).all())

    def buscar_por_componente(
        self,
        componente_id: int,
    ) -> list[EstadoComponente]:
        consulta = select(EstadoComponente).where(
            EstadoComponente.id_componente_fk == componente_id,
        )
        return list(self.db.scalars(consulta).all())

    def crear(self, estado: EstadoComponente) -> EstadoComponente:
        self.db.add(estado)
        self.db.flush()
        return estado

    def actualizar(self, estado: EstadoComponente) -> EstadoComponente:
        self.db.flush()
        return estado

    def eliminar(self, estado: EstadoComponente) -> None:
        self.db.delete(estado)
        self.db.flush()