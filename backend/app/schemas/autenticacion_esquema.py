from pydantic import BaseModel, EmailStr, Field


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
        min_length=1,
        max_length=280,
        description="Contraseña",
    )


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

    El Refresh Token nunca debe ser enviado como parte
    de la URL. Se envía dentro del body de la petición.
    """

    refresh_token: str = Field(
        min_length=1,
        max_length=2048,
    )