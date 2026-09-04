import uuid

from datetime import datetime, timedelta, timezone

import jwt

from pwdlib import PasswordHash

from app.core.configuracion import configuracion


# =========================================================
# PASSWORD HASHING
# =========================================================

# PasswordHash.recommended() utiliza una configuración
# segura recomendada por pwdlib.
#
# Actualmente utilizará Argon2 para proteger las
# contraseñas.
password_hasher = PasswordHash.recommended()


def generar_password_hash(password: str) -> str:
    """
    Genera un hash seguro para una contraseña.

    IMPORTANTE:
    Nunca debemos almacenar la contraseña original
    en PostgreSQL.

    Ejemplo:

        password:
            MiPassword123

        resultado:
            $argon2id$v=19$...
    """

    return password_hasher.hash(password)


def verificar_password(
    password: str,
    password_hash: str,
) -> bool:
    """
    Comprueba si una contraseña coincide con su hash.

    Retorna:

        True  -> contraseña correcta
        False -> contraseña incorrecta
    """

    return password_hasher.verify(
        password,
        password_hash,
    )

def generar_refresh_token_hash(
    refresh_token: str,
) -> str:
    """
    Genera un hash del Refresh Token.

    El token original nunca se almacena directamente
    en PostgreSQL.
    """

    return password_hasher.hash(refresh_token)


def verificar_refresh_token(
    refresh_token: str,
    refresh_token_hash: str,
) -> bool:
    """
    Comprueba si el Refresh Token corresponde
    al hash almacenado en PostgreSQL.
    """

    return password_hasher.verify(
        refresh_token,
        refresh_token_hash,
    )


# =========================================================
# JWT
# =========================================================


def crear_access_token(
    usuario_id: uuid.UUID,
    sesion_id: uuid.UUID,
) -> str:
    """
    Genera un Access Token JWT.

    El Access Token tendrá una duración corta.

    Contiene:

        sub  -> ID del usuario
        sid  -> ID de la sesión
        type -> access
        iat  -> fecha de emisión
        exp  -> fecha de expiración
        jti  -> identificador único del token
    """

    ahora = datetime.now(timezone.utc)

    expiracion = ahora + timedelta(
        minutes=configuracion.access_token_expire_minutes
    )

    payload = {
        "sub": str(usuario_id),
        "sid": str(sesion_id),
        "type": "access",
        "iat": ahora,
        "exp": expiracion,
        "jti": str(uuid.uuid4()),
    }

    return jwt.encode(
        payload,
        configuracion.jwt_secret_key,
        algorithm=configuracion.jwt_algorithm,
    )


def crear_refresh_token(
    usuario_id: uuid.UUID,
    sesion_id: uuid.UUID,
) -> str:
    """
    Genera un Refresh Token JWT.

    El Refresh Token tendrá una duración mucho mayor
    que el Access Token.

    Se utiliza exclusivamente para solicitar
    nuevos tokens de acceso.
    """

    ahora = datetime.now(timezone.utc)

    expiracion = ahora + timedelta(
        days=configuracion.refresh_token_expire_days
    )

    payload = {
        "sub": str(usuario_id),
        "sid": str(sesion_id),
        "type": "refresh",
        "iat": ahora,
        "exp": expiracion,
        "jti": str(uuid.uuid4()),
    }

    return jwt.encode(
        payload,
        configuracion.jwt_refresh_secret_key,
        algorithm=configuracion.jwt_algorithm,
    )


# =========================================================
# DECODIFICACIÓN DE ACCESS TOKEN
# =========================================================


def decodificar_access_token(token: str) -> dict:
    """
    Decodifica y valida un Access Token.

    Si el token:

    - está manipulado
    - está expirado
    - fue firmado con otra clave
    - utiliza otro algoritmo

    PyJWT lanzará una excepción.

    La capa superior será responsable de convertir
    esa excepción en un HTTP 401.
    """

    payload = jwt.decode(
        token,
        configuracion.jwt_secret_key,
        algorithms=[configuracion.jwt_algorithm],
    )

    # Verificamos que realmente sea un Access Token.
    if payload.get("type") != "access":
        raise ValueError("El token no es un Access Token.")

    return payload


# =========================================================
# DECODIFICACIÓN DE REFRESH TOKEN
# =========================================================


def decodificar_refresh_token(token: str) -> dict:
    """
    Decodifica y valida un Refresh Token.

    Utiliza una clave secreta diferente a la del
    Access Token.
    """

    payload = jwt.decode(
        token,
        configuracion.jwt_refresh_secret_key,
        algorithms=[configuracion.jwt_algorithm],
    )

    # Verificamos que realmente sea un Refresh Token.
    if payload.get("type") != "refresh":
        raise ValueError("El token no es un Refresh Token.")

    return payload

