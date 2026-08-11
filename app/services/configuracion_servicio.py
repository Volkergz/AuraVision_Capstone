from uuid import UUID

from sqlalchemy.orm import Session

from app.models.configuracion import Configuracion
from app.repositories.configuracion_repositorio import ConfiguracionRepositorio
from app.schemas.configuracion_esquema import (
    ConfiguracionActualizar,
    ConfiguracionCrear,
    ConfiguracionRespuesta,
)


class ConfiguracionServicio:
    """
    Contiene la lógica de negocio relacionada con la configuración.
    """

    def __init__(self, db: Session):
        self.db = db
        self.configuracion_repositorio = ConfiguracionRepositorio(db)

    def listar_configuraciones(self) -> list[ConfiguracionRespuesta]:
        configuraciones = self.configuracion_repositorio.listar()
        return [
            ConfiguracionRespuesta.model_validate(configuracion)
            for configuracion in configuraciones
        ]

    def obtener_por_id(self, configuracion_id: int) -> ConfiguracionRespuesta:
        configuracion = self.configuracion_repositorio.buscar_por_id(
            configuracion_id,
        )

        if not configuracion:
            raise ValueError("La configuración no existe.")

        return ConfiguracionRespuesta.model_validate(configuracion)

    def obtener_por_dispositivo(
        self,
        dispositivo_id: UUID,
    ) -> ConfiguracionRespuesta:
        configuracion = self.configuracion_repositorio.buscar_por_dispositivo(
            dispositivo_id,
        )

        if not configuracion:
            raise ValueError("La configuración no existe para este dispositivo.")

        return ConfiguracionRespuesta.model_validate(configuracion)

    def crear_configuracion(
        self,
        datos: ConfiguracionCrear,
    ) -> ConfiguracionRespuesta:
        configuracion_existente = self.configuracion_repositorio.buscar_por_dispositivo(
            datos.id_dispositivo_fk,
        )

        if configuracion_existente:
            raise ValueError("El dispositivo ya tiene configuración.")

        configuracion = Configuracion(
            id_dispositivo_fk=datos.id_dispositivo_fk,
            volumen=datos.volumen,
            auto_conexion=datos.auto_conexion,
        )

        try:
            self.configuracion_repositorio.crear(configuracion)
            self.db.commit()
            return ConfiguracionRespuesta.model_validate(configuracion)

        except Exception:
            self.db.rollback()
            raise

    def actualizar_configuracion(
        self,
        dispositivo_id: UUID,
        datos: ConfiguracionActualizar,
    ) -> ConfiguracionRespuesta:
        configuracion = self.configuracion_repositorio.buscar_por_dispositivo(
            dispositivo_id,
        )

        if not configuracion:
            raise ValueError("La configuración no existe para este dispositivo.")

        if datos.volumen is not None:
            configuracion.volumen = datos.volumen

        if datos.auto_conexion is not None:
            configuracion.auto_conexion = datos.auto_conexion

        try:
            self.configuracion_repositorio.actualizar(configuracion)
            self.db.commit()
            return ConfiguracionRespuesta.model_validate(configuracion)

        except Exception:
            self.db.rollback()
            raise

    def eliminar_configuracion(self, dispositivo_id: UUID) -> None:
        configuracion = self.configuracion_repositorio.buscar_por_dispositivo(
            dispositivo_id,
        )

        if not configuracion:
            raise ValueError("La configuración no existe para este dispositivo.")

        try:
            self.configuracion_repositorio.eliminar(configuracion)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise