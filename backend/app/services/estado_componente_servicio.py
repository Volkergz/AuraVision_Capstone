from uuid import UUID

from sqlalchemy.orm import Session

from app.models.estado_componente import EstadoComponente
from app.repositories.estado_componente_repositorio import (
    EstadoComponenteRepositorio,
)
from app.schemas.estado_componente_esquema import (
    EstadoComponenteActualizar,
    EstadoComponenteCrear,
    EstadoComponenteRespuesta,
)


class EstadoComponenteServicio:
    """
    Contiene la lógica de negocio relacionada con el estado de componentes.
    """

    def __init__(self, db: Session):
        self.db = db
        self.estado_repositorio = EstadoComponenteRepositorio(db)

    def listar_estados(self) -> list[EstadoComponenteRespuesta]:
        estados = self.estado_repositorio.listar()
        return [
            EstadoComponenteRespuesta.model_validate(estado)
            for estado in estados
        ]

    def obtener_estado(self, estado_id: int) -> EstadoComponenteRespuesta:
        estado = self.estado_repositorio.buscar_por_id(estado_id)

        if not estado:
            raise ValueError("El estado no existe.")

        return EstadoComponenteRespuesta.model_validate(estado)

    def listar_por_dispositivo(
        self,
        dispositivo_id: UUID,
    ) -> list[EstadoComponenteRespuesta]:
        estados = self.estado_repositorio.buscar_por_dispositivo(dispositivo_id)
        return [
            EstadoComponenteRespuesta.model_validate(estado)
            for estado in estados
        ]

    def listar_por_componente(
        self,
        componente_id: int,
    ) -> list[EstadoComponenteRespuesta]:
        estados = self.estado_repositorio.buscar_por_componente(componente_id)
        return [
            EstadoComponenteRespuesta.model_validate(estado)
            for estado in estados
        ]

    def crear_estado(
        self,
        datos: EstadoComponenteCrear,
    ) -> EstadoComponenteRespuesta:
        estado = EstadoComponente(
            id_dispositivo_fk=datos.id_dispositivo_fk,
            id_componente_fk=datos.id_componente_fk,
            estado=datos.estado,
            mensaje_error=datos.mensaje_error,
            fecha_revision=datos.fecha_revision,
        )

        try:
            self.estado_repositorio.crear(estado)
            self.db.commit()
            return EstadoComponenteRespuesta.model_validate(estado)

        except Exception:
            self.db.rollback()
            raise

    def actualizar_estado(
        self,
        estado_id: int,
        datos: EstadoComponenteActualizar,
    ) -> EstadoComponenteRespuesta:
        estado = self.estado_repositorio.buscar_por_id(estado_id)

        if not estado:
            raise ValueError("El estado no existe.")

        if datos.estado is not None:
            estado.estado = datos.estado

        if datos.mensaje_error is not None:
            estado.mensaje_error = datos.mensaje_error

        if datos.fecha_revision is not None:
            estado.fecha_revision = datos.fecha_revision

        try:
            self.estado_repositorio.actualizar(estado)
            self.db.commit()
            return EstadoComponenteRespuesta.model_validate(estado)

        except Exception:
            self.db.rollback()
            raise

    def eliminar_estado(self, estado_id: int) -> None:
        estado = self.estado_repositorio.buscar_por_id(estado_id)

        if not estado:
            raise ValueError("El estado no existe.")

        try:
            self.estado_repositorio.eliminar(estado)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise