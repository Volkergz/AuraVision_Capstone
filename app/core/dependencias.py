from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.configuracion import configuracion
from app.core.seguridad import decodificar_access_token
from app.db.sesion import obtener_sesion
from app.models.usuario import Usuario
from app.models.sesion import Sesion

# =========================================================
# ESQUEMA DE AUTENTICACIÓN
# =========================================================

esquema_bearer = HTTPBearer(
    auto_error=False
)

def obtener_usuario_actual(
    credenciales: HTTPAuthorizationCredentials = Depends(
        esquema_bearer
    ),
    db: Session = Depends(obtener_sesion),
) -> Usuario:
    """
    Obtiene el usuario autenticado a partir
    del Access Token.

    El token debe:
    - existir
    - tener formato Bearer
    - tener firma válida
    - no estar expirado
    - contener un sid válido
    - pertenecer a una sesión activa
    """

    # =====================================================
    # 1. COMPROBAR QUE EXISTE EL TOKEN
    # =====================================================

    if not credenciales:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se proporcionó un token de acceso.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # =====================================================
    # 2. OBTENER TOKEN
    # =====================================================

    token = credenciales.credentials

    # =====================================================
    # 3. DECODIFICAR JWT
    # =====================================================

    payload = decodificar_access_token(
        token
    )

    if not payload:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de acceso inválido.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # =====================================================
    # 4. OBTENER IDENTIFICADORES
    # =====================================================

    usuario_id = payload.get("sub")
    sesion_id = payload.get("sid")

    if not usuario_id or not sesion_id:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="El token no contiene información válida.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # =====================================================
    # 5. BUSCAR SESIÓN
    # =====================================================

    sesion = (
        db.query(Sesion)
        .filter(
            Sesion.id_sesion == sesion_id,
            Sesion.id_usuario_fk == usuario_id,
        )
        .first()
    )

    if not sesion:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión no existe.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # =====================================================
    # 6. COMPROBAR SESIÓN REVOCADA
    # =====================================================

    if sesion.revocada:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión ha sido revocada.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # =====================================================
    # 7. COMPROBAR EXPIRACIÓN DE SESIÓN
    # =====================================================

    from datetime import datetime, timezone

    ahora = datetime.now(timezone.utc)

    if sesion.fecha_expiracion <= ahora:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La sesión ha expirado.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # =====================================================
    # 8. BUSCAR USUARIO
    # =====================================================

    usuario = (
        db.query(Usuario)
        .filter(
            Usuario.id_usuario == usuario_id
        )
        .first()
    )

    if not usuario:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="El usuario no existe.",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # =====================================================
    # 9. COMPROBAR USUARIO ACTIVO
    # =====================================================

    if not usuario.estado:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="El usuario se encuentra desactivado.",
        )

    # =====================================================
    # 10. DEVOLVER USUARIO
    # =====================================================

    return usuario