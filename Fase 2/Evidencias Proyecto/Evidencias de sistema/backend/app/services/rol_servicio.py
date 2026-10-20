from sqlalchemy.orm import Session

from app.models.rol import Rol
from app.repositories.rol_repositorio import RolRepositorio
from app.schemas.rol_esquema import RolActualizar, RolCrear, RolRespuesta


class RolServicio:
    """
    Contiene la lógica de negocio relacionada con roles.
    """

    def __init__(self, db: Session):
        self.db = db
        self.rol_repositorio = RolRepositorio(db)

    def listar_roles(self) -> list[RolRespuesta]:
        roles = self.rol_repositorio.listar()
        return [RolRespuesta.model_validate(rol) for rol in roles]

    def obtener_rol(self, rol_id: int) -> RolRespuesta:
        rol = self.rol_repositorio.buscar_por_id(rol_id)

        if not rol:
            raise ValueError("El rol no existe.")

        return RolRespuesta.model_validate(rol)

    def crear_rol(self, datos: RolCrear) -> RolRespuesta:
        rol_existente = self.rol_repositorio.buscar_por_nombre(datos.nombre)

        if rol_existente:
            raise ValueError("El rol ya existe.")

        rol = Rol(nombre=datos.nombre, estado=datos.estado)

        try:
            self.rol_repositorio.crear(rol)
            self.db.commit()
            return RolRespuesta.model_validate(rol)

        except Exception:
            self.db.rollback()
            raise

    def actualizar_rol(self, rol_id: int, datos: RolActualizar) -> RolRespuesta:
        rol = self.rol_repositorio.buscar_por_id(rol_id)

        if not rol:
            raise ValueError("El rol no existe.")

        if datos.nombre is not None:
            rol.nombre = datos.nombre

        if datos.estado is not None:
            rol.estado = datos.estado

        try:
            self.rol_repositorio.actualizar(rol)
            self.db.commit()
            return RolRespuesta.model_validate(rol)

        except Exception:
            self.db.rollback()
            raise

    def eliminar_rol(self, rol_id: int) -> None:
        rol = self.rol_repositorio.buscar_por_id(rol_id)

        if not rol:
            raise ValueError("El rol no existe.")

        try:
            self.rol_repositorio.eliminar(rol)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise