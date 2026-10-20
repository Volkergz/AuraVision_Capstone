from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.telemetria import Telemetria


class TelemetriaRepositorio:
    """
    Repository para la tabla telemetria.
    """

    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> list[Telemetria]:
        consulta = select(Telemetria)
        return list(self.db.scalars(consulta).all())

    def buscar_por_id(self, telemetria_id: int) -> Telemetria | None:
        consulta = select(Telemetria).where(
            Telemetria.id_telemetria == telemetria_id,
        )
        return self.db.scalar(consulta)

    def buscar_por_dispositivo(
        self,
        dispositivo_id: UUID,
    ) -> list[Telemetria]:
        consulta = select(Telemetria).where(
            Telemetria.id_dispositivo_fk == dispositivo_id,
        )
        return list(self.db.scalars(consulta).all())

    def crear(self, telemetria: Telemetria) -> Telemetria:
        self.db.add(telemetria)
        self.db.flush()
        return telemetria