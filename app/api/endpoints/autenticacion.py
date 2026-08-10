from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.autenticacion_esquema import (
    LoginRequest,
    TokenResponse,
    RefreshTokenRequest,
)
from app.schemas.usuario_esquema import (
    UsuarioRegistro,
    UsuarioRespuesta,
)
from app.services.autenticacion_servicio import (
    AutenticacionServicio,
)
from app.core.dependencias import obtener_usuario_actual


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"],
)


# =========================================================
# REGISTRO
# =========================================================

@router.post(
    "/register",
    response_model=UsuarioRespuesta,
    status_code=status.HTTP_201_CREATED,
)
def registrar_usuario(
    datos: UsuarioRegistro,
    db: Session = Depends(obtener_sesion),
):
    """
    Registra un nuevo usuario.

    Flujo:

        Request
           ↓
        Pydantic
           ↓
        Service
           ↓
        Repository
           ↓
        PostgreSQL
    """

    servicio = AutenticacionServicio(db)

    try:

        usuario = servicio.registrar(datos)

        return usuario

    except ValueError as error:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(error),
        )


# =========================================================
# LOGIN
# =========================================================

@router.post(
    "/login",
    response_model=TokenResponse,
)
def iniciar_sesion(
    datos: LoginRequest,
    db: Session = Depends(obtener_sesion),
):
    """
    Autentica un usuario y genera:

        - Access Token
        - Refresh Token

    Además crea una sesión en PostgreSQL.
    """

    servicio = AutenticacionServicio(db)

    try:

        tokens = servicio.iniciar_sesion(
            datos
        )

        return tokens

    except ValueError as error:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

# =========================================================
# REFRESH TOKEN
# =========================================================

@router.post(
    "/refresh",
    response_model=TokenResponse,
)
def refrescar_token(
    datos: RefreshTokenRequest,
    db: Session = Depends(obtener_sesion),
):
    """
    Renueva los tokens utilizando un Refresh Token válido.

    El Refresh Token anterior queda invalidado
    mediante rotación de sesión.
    """

    servicio = AutenticacionServicio(db)

    try:

        tokens = servicio.refrescar_sesion(
            datos.refresh_token
        )

        return tokens

    except ValueError as error:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
        )

# =========================================================
# LOGOUT
# =========================================================

@router.post(
    "/logout",
    status_code=status.HTTP_204_NO_CONTENT,
)
def cerrar_sesion(
    datos: RefreshTokenRequest,
    db: Session = Depends(obtener_sesion),
):
    """
    Cierra la sesión actual.

    El Refresh Token se utiliza para localizar
    la sesión correspondiente y revocarla.
    """

    servicio = AutenticacionServicio(db)

    try:

        servicio.cerrar_sesion(
            datos.refresh_token
        )

    except ValueError as error:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
        )

    return None

# =========================================================
# USUARIO ACTUAL
# =========================================================

@router.get(
    "/me",
    response_model=UsuarioRespuesta,
)
def obtener_usuario_actual_endpoint(
    usuario = Depends(obtener_usuario_actual),
):
    """
    Devuelve la información del usuario autenticado.

    Este endpoint requiere un Access Token válido.
    """

    return usuario