from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class UsuarioBase(BaseModel):
    """
    Campos comunes de un usuario.

    Esta clase será utilizada como base para
    otros schemas relacionados con usuarios.
    """

    nombre: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Nombre del usuario",
    )

    email: EmailStr = Field(
        ...,
        description="Correo electrónico del usuario",
    )


class UsuarioRegistro(UsuarioBase):
    """
    Datos necesarios para registrar un usuario.

    Este schema representa el JSON que recibirá
    nuestro endpoint POST /auth/register.
    """

    password: str = Field(
        ...,
        min_length=8,
        max_length=20,
        description="Contraseña del usuario",
    )

    @field_validator("password")
    @classmethod
    def validar_password(cls, password: str) -> str:

        if not any(
            caracter.isupper()
            for caracter in password
        ):
            raise ValueError(
                "La contraseña debe contener al menos una mayúscula"
            )

        if not any(
            caracter.islower()
            for caracter in password
        ):
            raise ValueError(
                "La contraseña debe contener al menos una minúscula"
            )

        if not any(
            caracter.isdigit()
            for caracter in password
        ):
            raise ValueError(
                "La contraseña debe contener al menos un número"
            )

        if not any(
            not caracter.isalnum()
            for caracter in password
        ):
            raise ValueError(
                "La contraseña debe contener al menos un carácter especial"
            )

        return password


class UsuarioRespuesta(UsuarioBase):
    """
    Información pública de un usuario.

    IMPORTANTE:

    Nunca incluimos password ni password_hash.

    Este schema será utilizado para devolver
    información del usuario al cliente.
    """

    id: UUID

    activo: bool

    fecha_creacion: datetime

    fecha_actualizacion: datetime

    # Permite que Pydantic pueda convertir
    # objetos SQLAlchemy en schemas.
    model_config = ConfigDict(
        from_attributes=True
    )