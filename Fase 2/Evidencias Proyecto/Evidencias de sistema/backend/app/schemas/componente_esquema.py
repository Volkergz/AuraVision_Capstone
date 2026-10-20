from pydantic import BaseModel, ConfigDict, Field


class ComponenteBase(BaseModel):
    """
    Campos comunes de un componente.
    """

    nombre: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    tipo: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )


class ComponenteCrear(ComponenteBase):
    """
    Datos para crear un componente.
    """


class ComponenteActualizar(BaseModel):
    """
    Datos para actualizar un componente.
    """

    nombre: str | None = Field(default=None, min_length=2, max_length=100)
    tipo: str | None = Field(default=None, min_length=2, max_length=100)


class ComponenteRespuesta(ComponenteBase):
    """
    Respuesta pública de un componente.
    """

    id_componente: int

    model_config = ConfigDict(from_attributes=True)