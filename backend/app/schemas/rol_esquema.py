from pydantic import BaseModel, ConfigDict, Field


class RolBase(BaseModel):
    """
    Campos comunes de un rol.
    """

    nombre: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Nombre del rol",
    )

    estado: bool = Field(
        default=True,
        description="Indica si el rol está activo",
    )


class RolCrear(RolBase):
    """
    Datos para crear un rol.
    """


class RolActualizar(BaseModel):
    """
    Datos para actualizar un rol.
    """

    nombre: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    estado: bool | None = None


class RolRespuesta(RolBase):
    """
    Respuesta pública de un rol.
    """

    id_rol: int

    model_config = ConfigDict(from_attributes=True)