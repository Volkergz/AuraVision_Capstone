from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.core.configuracion import configuracion
from app.core.seguridad import (
    crear_access_token,
    crear_refresh_token,
    generar_password_hash,
    generar_refresh_token_hash,
    verificar_password,
)
from app.models.sesion import Sesion
from app.models.usuario import Usuario
from app.repositories.sesion_repositorio import (
    SesionRepositorio,
)
from app.repositories.usuario_repositorio import (
    UsuarioRepositorio,
)
from app.schemas.autenticacion_esquema import (
    LoginRequest,
    TokenResponse,
)
from app.schemas.usuario_esquema import (
    UsuarioRegistro,
    UsuarioRespuesta,
)


class AutenticacionServicio:
    """
    Contiene la lógica de negocio relacionada
    con autenticación y sesiones.

    Esta clase NO maneja HTTP directamente.

    No sabe si la petición viene de:
    - Expo
    - navegador
    - Postman
    - otra aplicación

    Su única responsabilidad es ejecutar las reglas
    de autenticación de AURA Vision.
    """

    def __init__(self, db: Session):

        self.db = db

        self.usuario_repositorio = UsuarioRepositorio(
            db
        )

        self.sesion_repositorio = SesionRepositorio(
            db
        )

    # =========================================================
    # REGISTRO
    # =========================================================

    def registrar(
        self,
        datos: UsuarioRegistro,
    ) -> UsuarioRespuesta:
        """
        Registra un nuevo usuario.

        Flujo:

        1. Comprobar si el email ya existe.
        2. Generar hash de contraseña.
        3. Crear usuario.
        4. Guardar usuario.
        5. Confirmar transacción.
        6. Devolver información pública.
        """

        # -----------------------------------------------------
        # 1. COMPROBAR EMAIL
        # -----------------------------------------------------

        usuario_existente = (
            self.usuario_repositorio.buscar_por_email(
                datos.email
            )
        )

        if usuario_existente:
            raise ValueError(
                "El correo electrónico ya está registrado."
            )

        # -----------------------------------------------------
        # 2. GENERAR HASH
        # -----------------------------------------------------

        password_hash = generar_password_hash(
            datos.password
        )

        # -----------------------------------------------------
        # 3. CREAR MODELO
        # -----------------------------------------------------

        usuario = Usuario(
            nombre=datos.nombre,
            email=datos.email,
            password_hash=password_hash,
        )

        # -----------------------------------------------------
        # 4. GUARDAR
        # -----------------------------------------------------
        try:

            self.usuario_repositorio.crear(usuario)

            self.db.commit()

            return UsuarioRespuesta.model_validate(
                usuario
            )

        except Exception:

            self.db.rollback()

            raise

    # =========================================================
    # LOGIN
    # =========================================================

    def iniciar_sesion(
        self,
        datos: LoginRequest,
    ) -> TokenResponse:
        """
        Autentica un usuario y crea una nueva sesión.

        Flujo:

        1. Buscar usuario.
        2. Verificar que exista.
        3. Verificar que esté activo.
        4. Verificar contraseña.
        5. Crear sesión.
        6. Crear Access Token.
        7. Crear Refresh Token.
        8. Guardar hash del Refresh Token.
        9. Confirmar transacción.
        10. Devolver tokens.
        """

        # -----------------------------------------------------
        # 1. BUSCAR USUARIO
        # -----------------------------------------------------

        usuario = (
            self.usuario_repositorio.buscar_por_email(
                datos.email
            )
        )

        # -----------------------------------------------------
        # 2. USUARIO NO EXISTE
        # -----------------------------------------------------

        if not usuario:
            raise ValueError(
                "Credenciales incorrectas."
            )

        # -----------------------------------------------------
        # 3. USUARIO DESACTIVADO
        # -----------------------------------------------------

        if not usuario.activo:
            raise ValueError(
                "La cuenta se encuentra desactivada."
            )

        # -----------------------------------------------------
        # 4. VERIFICAR PASSWORD
        # -----------------------------------------------------

        password_correcta = verificar_password(
            datos.password,
            usuario.password_hash,
        )

        if not password_correcta:
            raise ValueError(
                "Credenciales incorrectas."
            )

        # -----------------------------------------------------
        # 5. CREAR SESIÓN
        # -----------------------------------------------------

        try:

            ahora = datetime.now(timezone.utc)

            fecha_expiracion = (
                ahora
                + timedelta(
                    days=configuracion.refresh_token_expire_days
                )
            )

            sesion = Sesion(
                usuario_id=usuario.id,
                refresh_token_hash="PENDIENTE",
                fecha_expiracion=fecha_expiracion,
            )

            self.sesion_repositorio.crear(sesion)

            access_token = crear_access_token(
                usuario_id=usuario.id,
                sesion_id=sesion.id,
            )

            refresh_token = crear_refresh_token(
                usuario_id=usuario.id,
                sesion_id=sesion.id,
            )

            sesion.refresh_token_hash = (
                generar_refresh_token_hash(
                    refresh_token
                )
            )

            self.db.flush()

            self.db.commit()

            return TokenResponse(
                access_token=access_token,
                refresh_token=refresh_token,
                token_type="bearer",
            )

        except Exception:

            self.db.rollback()

            raise