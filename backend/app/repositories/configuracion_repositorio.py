from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.configuracion import Configuracion


class ConfiguracionRepositorio:
    """
    Repository para la tabla configuracion.
    """

    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> list[Configuracion]:
        consulta = select(Configuracion)
        return list(self.db.scalars(consulta).all())

    def buscar_por_id(
        self,
        configuracion_id: int,
    ) -> Configuracion | None:
        consulta = select(Configuracion).where(
            Configuracion.id_configuracion == configuracion_id,
        )
        return self.db.scalar(consulta)

    def buscar_por_dispositivo(
        self,
        dispositivo_id: UUID,
    ) -> Configuracion | None:
        consulta = select(Configuracion).where(
            Configuracion.id_dispositivo_fk == dispositivo_id,
        )
        return self.db.scalar(consulta)

    def crear(self, configuracion: Configuracion) -> Configuracion:
        self.db.add(configuracion)
        self.db.flush()
        return configuracion

    def actualizar(self, configuracion: Configuracion) -> Configuracion:
        self.db.flush()
        return configuracion

    def eliminar(self, configuracion: Configuracion) -> None:
        self.db.delete(configuracion)
        self.db.flush()