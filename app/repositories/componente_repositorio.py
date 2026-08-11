from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.componente import Componente


class ComponenteRepositorio:
    """
    Repository para la tabla componente.
    """

    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> list[Componente]:
        consulta = select(Componente)
        return list(self.db.scalars(consulta).all())

    def buscar_por_id(self, componente_id: int) -> Componente | None:
        consulta = select(Componente).where(
            Componente.id_componente == componente_id,
        )
        return self.db.scalar(consulta)

    def buscar_por_nombre(self, nombre: str) -> Componente | None:
        consulta = select(Componente).where(
            Componente.nombre == nombre,
        )
        return self.db.scalar(consulta)

    def crear(self, componente: Componente) -> Componente:
        self.db.add(componente)
        self.db.flush()
        return componente

    def actualizar(self, componente: Componente) -> Componente:
        self.db.flush()
        return componente

    def eliminar(self, componente: Componente) -> None:
        self.db.delete(componente)
        self.db.flush()