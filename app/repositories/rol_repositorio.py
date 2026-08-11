from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.rol import Rol


class RolRepositorio:
    """
    Repository para la tabla rol.
    """

    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> list[Rol]:
        consulta = select(Rol)
        return list(self.db.scalars(consulta).all())

    def buscar_por_id(self, rol_id: int) -> Rol | None:
        consulta = select(Rol).where(Rol.id_rol == rol_id)
        return self.db.scalar(consulta)

    def buscar_por_nombre(self, nombre: str) -> Rol | None:
        consulta = select(Rol).where(Rol.nombre == nombre)
        return self.db.scalar(consulta)

    def crear(self, rol: Rol) -> Rol:
        self.db.add(rol)
        self.db.flush()
        return rol

    def actualizar(self, rol: Rol) -> Rol:
        self.db.flush()
        return rol

    def eliminar(self, rol: Rol) -> None:
        self.db.delete(rol)
        self.db.flush()