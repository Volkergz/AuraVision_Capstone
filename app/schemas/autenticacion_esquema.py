from pydantic import BaseModel, EmailStr, Field, field_validator


class LoginRequest(BaseModel):
    """
    Datos necesarios para iniciar sesión.

    El usuario proporciona únicamente:
    - email
    - password
    """

    email: EmailStr = Field(
        ...,
        description="Correo electrónico",
    )

    password: str = Field(
        ...,
        min_length=8,
        max_length=20,
        description="Contraseña",
    )

    @field_validator("password")
    @classmethod
    def validar_password(cls, password: str) -> str:
        """
        Valida que la contraseña:
        - Tenga entre 8 y 20 caracteres.
        - Contenga al menos una letra.
        - Contenga al menos un número.
        - Contenga al menos un carácter especial.
        - No contenga espacios.
        """

        if " " in password:
            raise ValueError(
                "La contraseña no puede contener espacios"
            )

        if not any(
            caracter.isalpha()
            for caracter in password
        ):
            raise ValueError(
                "La contraseña debe contener al menos una letra"
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


class TokenResponse(BaseModel):
    """
    Respuesta generada después de una autenticación
    exitosa.

    Contiene los tokens necesarios para mantener
    la sesión del usuario.
    """

    access_token: str

    refresh_token: str

    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    """
    Datos necesarios para renovar una sesión.

    El cliente enviará el Refresh Token para
    solicitar un nuevo Access Token.
    """

    refresh_token: str = Field(
        ...,
        min_length=1,
    )