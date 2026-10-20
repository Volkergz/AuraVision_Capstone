from sqlalchemy.orm import Session

from app.models.componente import Componente
from app.repositories.componente_repositorio import ComponenteRepositorio
from app.schemas.componente_esquema import (
    ComponenteActualizar,
    ComponenteCrear,
    ComponenteRespuesta,
)


class ComponenteServicio:
    """
    Contiene la lógica de negocio relacionada con componentes.
    """

    def __init__(self, db: Session):
        self.db = db
        self.componente_repositorio = ComponenteRepositorio(db)

    def listar_componentes(self) -> list[ComponenteRespuesta]:
        componentes = self.componente_repositorio.listar()
        return [
            ComponenteRespuesta.model_validate(componente)
            for componente in componentes
        ]

    def obtener_componente(self, componente_id: int) -> ComponenteRespuesta:
        componente = self.componente_repositorio.buscar_por_id(componente_id)

        if not componente:
            raise ValueError("El componente no existe.")

        return ComponenteRespuesta.model_validate(componente)

    def crear_componente(
        self,
        datos: ComponenteCrear,
    ) -> ComponenteRespuesta:
        componente_existente = self.componente_repositorio.buscar_por_nombre(
            datos.nombre,
        )

        if componente_existente:
            raise ValueError("El componente ya existe.")

        componente = Componente(
            nombre=datos.nombre,
            tipo=datos.tipo,
        )

        try:
            self.componente_repositorio.crear(componente)
            self.db.commit()
            return ComponenteRespuesta.model_validate(componente)

        except Exception:
            self.db.rollback()
            raise

    def actualizar_componente(
        self,
        componente_id: int,
        datos: ComponenteActualizar,
    ) -> ComponenteRespuesta:
        componente = self.componente_repositorio.buscar_por_id(componente_id)

        if not componente:
            raise ValueError("El componente no existe.")

        if datos.nombre is not None:
            componente.nombre = datos.nombre

        if datos.tipo is not None:
            componente.tipo = datos.tipo

        try:
            self.componente_repositorio.actualizar(componente)
            self.db.commit()
            return ComponenteRespuesta.model_validate(componente)

        except Exception:
            self.db.rollback()
            raise

    def eliminar_componente(self, componente_id: int) -> None:
        componente = self.componente_repositorio.buscar_por_id(componente_id)

        if not componente:
            raise ValueError("El componente no existe.")

        try:
            self.componente_repositorio.eliminar(componente)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise