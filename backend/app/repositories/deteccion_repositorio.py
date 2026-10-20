from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.deteccion import Deteccion


class DeteccionRepositorio:
    """
    Repository para la tabla deteccion.
    """

    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> list[Deteccion]:
        consulta = select(Deteccion)
        return list(self.db.scalars(consulta).all())

    def buscar_por_id(self, deteccion_id: int) -> Deteccion | None:
        consulta = select(Deteccion).where(
            Deteccion.id_deteccion == deteccion_id,
        )
        return self.db.scalar(consulta)

    def buscar_por_dispositivo(
        self,
        dispositivo_id: UUID,
    ) -> list[Deteccion]:
        consulta = select(Deteccion).where(
            Deteccion.id_dispositivo_fk == dispositivo_id,
        )
        return list(self.db.scalars(consulta).all())

    def crear(self, deteccion: Deteccion) -> Deteccion:
        self.db.add(deteccion)
        self.db.flush()
        return deteccion