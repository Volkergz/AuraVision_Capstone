from uuid import UUID

from sqlalchemy.orm import Session

from app.models.dispositivo import Dispositivo
from app.repositories.dispositivo_repositorio import DispositivoRepositorio
from app.schemas.dispositivo_esquema import (
    DispositivoActualizar,
    DispositivoCrear,
    DispositivoRespuesta,
)


class DispositivoServicio:
    """
    Contiene la lógica de negocio relacionada con dispositivos.
    """

    def __init__(self, db: Session):
        self.db = db
        self.dispositivo_repositorio = DispositivoRepositorio(db)

    def listar_dispositivos(self) -> list[DispositivoRespuesta]:
        dispositivos = self.dispositivo_repositorio.listar()
        return [
            DispositivoRespuesta.model_validate(dispositivo)
            for dispositivo in dispositivos
        ]

    def obtener_dispositivo(self, dispositivo_id: UUID) -> DispositivoRespuesta:
        dispositivo = self.dispositivo_repositorio.buscar_por_id(dispositivo_id)

        if not dispositivo:
            raise ValueError("El dispositivo no existe.")

        return DispositivoRespuesta.model_validate(dispositivo)

    def listar_por_usuario(self, usuario_id: UUID) -> list[DispositivoRespuesta]:
        dispositivos = self.dispositivo_repositorio.buscar_por_usuario(usuario_id)
        return [
            DispositivoRespuesta.model_validate(dispositivo)
            for dispositivo in dispositivos
        ]

    def crear_dispositivo(
        self,
        datos: DispositivoCrear,
    ) -> DispositivoRespuesta:
        dispositivo_existente = self.dispositivo_repositorio.buscar_por_numero_serie(
            datos.numero_serie,
        )

        if dispositivo_existente:
            raise ValueError("El número de serie ya está registrado.")

        dispositivo = Dispositivo(
            id_usuario_fk=datos.id_usuario_fk,
            nombre=datos.nombre,
            numero_serie=datos.numero_serie,
            version_firmware=datos.version_firmware,
            estado_conexion=datos.estado_conexion,
        )

        try:
            self.dispositivo_repositorio.crear(dispositivo)
            self.db.commit()
            return DispositivoRespuesta.model_validate(dispositivo)

        except Exception:
            self.db.rollback()
            raise

    def actualizar_dispositivo(
        self,
        dispositivo_id: UUID,
        datos: DispositivoActualizar,
    ) -> DispositivoRespuesta:
        dispositivo = self.dispositivo_repositorio.buscar_por_id(dispositivo_id)

        if not dispositivo:
            raise ValueError("El dispositivo no existe.")

        if datos.id_usuario_fk is not None:
            dispositivo.id_usuario_fk = datos.id_usuario_fk

        if datos.nombre is not None:
            dispositivo.nombre = datos.nombre

        if datos.numero_serie is not None:
            dispositivo.numero_serie = datos.numero_serie

        if datos.version_firmware is not None:
            dispositivo.version_firmware = datos.version_firmware

        if datos.estado_conexion is not None:
            dispositivo.estado_conexion = datos.estado_conexion

        try:
            self.dispositivo_repositorio.actualizar(dispositivo)
            self.db.commit()
            return DispositivoRespuesta.model_validate(dispositivo)

        except Exception:
            self.db.rollback()
            raise

    def eliminar_dispositivo(self, dispositivo_id: UUID) -> None:
        dispositivo = self.dispositivo_repositorio.buscar_por_id(dispositivo_id)

        if not dispositivo:
            raise ValueError("El dispositivo no existe.")

        try:
            self.dispositivo_repositorio.eliminar(dispositivo)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise