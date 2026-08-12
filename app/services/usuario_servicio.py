from sqlalchemy.orm import Session

from app.models.usuario import Usuario
from app.repositories.usuario_repositorio import UsuarioRepositorio
from app.schemas.usuario_esquema import (
    UsuarioActualizacion,
    UsuarioPerfilActualizacion,
    UsuarioRespuesta,
)


class UsuarioServicio:
    """
    Contiene la lógica de negocio relacionada con usuarios.
    """

    def __init__(self, db: Session):
        self.db = db
        self.usuario_repositorio = UsuarioRepositorio(db)

    def listar_usuarios(self) -> list[UsuarioRespuesta]:
        usuarios = self.usuario_repositorio.listar()
        return [UsuarioRespuesta.model_validate(usuario) for usuario in usuarios]

    def obtener_usuario(self, usuario_id) -> UsuarioRespuesta:
        usuario = self.usuario_repositorio.buscar_por_id(usuario_id)

        if not usuario:
            raise ValueError("El usuario no existe.")

        return UsuarioRespuesta.model_validate(usuario)

    def actualizar_usuario(
        self,
        usuario_id,
        datos: UsuarioActualizacion,
    ) -> UsuarioRespuesta:
        usuario = self.usuario_repositorio.buscar_por_id(usuario_id)

        if not usuario:
            raise ValueError("El usuario no existe.")

        if datos.id_rol_fk is not None:
            usuario.id_rol_fk = datos.id_rol_fk

        if datos.nombre is not None:
            usuario.nombre = datos.nombre

        if datos.apellido is not None:
            usuario.apellido = datos.apellido

        if datos.fecha_nacimiento is not None:
            usuario.fecha_nacimiento = datos.fecha_nacimiento

        if datos.email is not None:
            usuario.email = datos.email

        if datos.estado is not None:
            usuario.estado = datos.estado

        try:
            self.usuario_repositorio.actualizar(usuario)
            self.db.commit()
            return UsuarioRespuesta.model_validate(usuario)

        except Exception:
            self.db.rollback()
            raise

    def actualizar_perfil(
        self,
        usuario_id,
        datos: UsuarioPerfilActualizacion,
    ) -> UsuarioRespuesta:
        usuario = self.usuario_repositorio.buscar_por_id(usuario_id)

        if not usuario:
            raise ValueError("El usuario no existe.")

        if datos.nombre is not None:
            usuario.nombre = datos.nombre

        if datos.apellido is not None:
            usuario.apellido = datos.apellido

        if datos.fecha_nacimiento is not None:
            usuario.fecha_nacimiento = datos.fecha_nacimiento

        if datos.email is not None:
            usuario.email = datos.email

        try:
            self.usuario_repositorio.actualizar(usuario)
            self.db.commit()
            return UsuarioRespuesta.model_validate(usuario)

        except Exception:
            self.db.rollback()
            raise

    def eliminar_usuario(self, usuario_id) -> None:
        usuario = self.usuario_repositorio.buscar_por_id(usuario_id)

        if not usuario:
            raise ValueError("El usuario no existe.")

        try:
            self.usuario_repositorio.eliminar(usuario)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise