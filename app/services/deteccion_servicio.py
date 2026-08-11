from uuid import UUID

from sqlalchemy.orm import Session

from app.models.deteccion import Deteccion
from app.repositories.deteccion_repositorio import DeteccionRepositorio
from app.schemas.deteccion_esquema import DeteccionCrear, DeteccionRespuesta


class DeteccionServicio:
    """
    Contiene la lógica de negocio relacionada con detecciones.
    """

    def __init__(self, db: Session):
        self.db = db
        self.deteccion_repositorio = DeteccionRepositorio(db)

    def listar_detecciones(self) -> list[DeteccionRespuesta]:
        detecciones = self.deteccion_repositorio.listar()
        return [
            DeteccionRespuesta.model_validate(deteccion)
            for deteccion in detecciones
        ]

    def obtener_deteccion(self, deteccion_id: int) -> DeteccionRespuesta:
        deteccion = self.deteccion_repositorio.buscar_por_id(deteccion_id)

        if not deteccion:
            raise ValueError("La detección no existe.")

        return DeteccionRespuesta.model_validate(deteccion)

    def listar_por_dispositivo(self, dispositivo_id: UUID) -> list[DeteccionRespuesta]:
        detecciones = self.deteccion_repositorio.buscar_por_dispositivo(dispositivo_id)
        return [
            DeteccionRespuesta.model_validate(deteccion)
            for deteccion in detecciones
        ]

    def crear_deteccion(self, datos: DeteccionCrear) -> DeteccionRespuesta:
        deteccion = Deteccion(
            id_dispositivo_fk=datos.id_dispositivo_fk,
            tipo_objeto=datos.tipo_objeto,
            descripcion=datos.descripcion,
            confianza=datos.confianza,
            distancia_estimada=datos.distancia_estimada,
        )

        try:
            self.deteccion_repositorio.crear(deteccion)
            self.db.commit()
            return DeteccionRespuesta.model_validate(deteccion)

        except Exception:
            self.db.rollback()
            raise