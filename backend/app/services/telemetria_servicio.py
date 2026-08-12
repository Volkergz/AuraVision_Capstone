from uuid import UUID

from sqlalchemy.orm import Session

from app.models.telemetria import Telemetria
from app.repositories.telemetria_repositorio import TelemetriaRepositorio
from app.schemas.telemetria_esquema import TelemetriaCrear, TelemetriaRespuesta


class TelemetriaServicio:
    """
    Contiene la lógica de negocio relacionada con telemetría.
    """

    def __init__(self, db: Session):
        self.db = db
        self.telemetria_repositorio = TelemetriaRepositorio(db)

    def listar_telemetria(self) -> list[TelemetriaRespuesta]:
        telemetrias = self.telemetria_repositorio.listar()
        return [
            TelemetriaRespuesta.model_validate(telemetria)
            for telemetria in telemetrias
        ]

    def obtener_telemetria(self, telemetria_id: int) -> TelemetriaRespuesta:
        telemetria = self.telemetria_repositorio.buscar_por_id(telemetria_id)

        if not telemetria:
            raise ValueError("La telemetría no existe.")

        return TelemetriaRespuesta.model_validate(telemetria)

    def listar_por_dispositivo(self, dispositivo_id: UUID) -> list[TelemetriaRespuesta]:
        telemetrias = self.telemetria_repositorio.buscar_por_dispositivo(dispositivo_id)
        return [
            TelemetriaRespuesta.model_validate(telemetria)
            for telemetria in telemetrias
        ]

    def crear_telemetria(self, datos: TelemetriaCrear) -> TelemetriaRespuesta:
        telemetria = Telemetria(
            id_dispositivo_fk=datos.id_dispositivo_fk,
            porcentaje_bateria=datos.porcentaje_bateria,
            tiempo_restante=datos.tiempo_restante,
            estado_conexion=datos.estado_conexion,
            voltaje_bateria=datos.voltaje_bateria,
            nivel_senal=datos.nivel_senal,
        )

        try:
            self.telemetria_repositorio.crear(telemetria)
            self.db.commit()
            return TelemetriaRespuesta.model_validate(telemetria)

        except Exception:
            self.db.rollback()
            raise