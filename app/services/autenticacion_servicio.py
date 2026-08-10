from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.core.configuracion import configuracion
from app.core.seguridad import (
    crear_access_token,
    crear_refresh_token,
    generar_password_hash,
    generar_refresh_token_hash,
    verificar_password,
    verificar_refresh_token,
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
    RefreshTokenRequest,
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

    # =========================================================
    # REFRESCAR SESION
    # =========================================================

    def refrescar_sesion(
        self,
        refresh_token: str,
    ) -> TokenResponse:
        """
        Renueva una sesión utilizando un Refresh Token válido.

        Se utiliza rotación de Refresh Tokens.

        Flujo:

            Refresh Token
                ↓
            buscar sesiones activas
                ↓
            verificar hash
                ↓
            comprobar usuario
                ↓
            revocar sesión anterior
                ↓
            crear nueva sesión
                ↓
            generar nuevos tokens
                ↓
            guardar hash
                ↓
            commit
        """

        # =====================================================
        # 1. BUSCAR SESIONES ACTIVAS
        # =====================================================

        sesiones = (
            self.sesion_repositorio
            .buscar_sesiones_activas()
        )

        sesion_encontrada = None

        # =====================================================
        # 2. BUSCAR EL REFRESH TOKEN
        # =====================================================

        for sesion in sesiones:

            if verificar_refresh_token(
                refresh_token,
                sesion.refresh_token_hash,
            ):

                sesion_encontrada = sesion

                break

        # =====================================================
        # 3. TOKEN NO VÁLIDO
        # =====================================================

        if not sesion_encontrada:

            raise ValueError(
                "Refresh Token inválido o expirado."
            )

        try:

            # =================================================
            # 4. BUSCAR USUARIO
            # =================================================

            usuario = (
                self.usuario_repositorio.buscar_por_id(
                    sesion_encontrada.usuario_id
                )
            )

            if not usuario:

                raise ValueError(
                    "El usuario asociado a la sesión no existe."
                )

            # =================================================
            # 5. COMPROBAR USUARIO ACTIVO
            # =================================================

            if not usuario.activo:

                raise ValueError(
                    "La cuenta se encuentra desactivada."
                )

            # =================================================
            # 6. REVOCAR SESIÓN ANTERIOR
            # =================================================

            self.sesion_repositorio.revocar(
                sesion_encontrada
            )

            # =================================================
            # 7. CREAR NUEVA SESIÓN
            # =================================================

            ahora = datetime.now(timezone.utc)

            fecha_expiracion = (
                ahora
                + timedelta(
                    days=configuracion.refresh_token_expire_days
                )
            )

            nueva_sesion = Sesion(
                usuario_id=usuario.id,
                refresh_token_hash="PENDIENTE",
                fecha_expiracion=fecha_expiracion,
            )

            self.sesion_repositorio.crear(
                nueva_sesion
            )

            # =================================================
            # 8. GENERAR NUEVOS TOKENS
            # =================================================

            nuevo_access_token = crear_access_token(
                usuario_id=usuario.id,
                sesion_id=nueva_sesion.id,
            )

            nuevo_refresh_token = crear_refresh_token(
                usuario_id=usuario.id,
                sesion_id=nueva_sesion.id,
            )

            # =================================================
            # 9. GUARDAR HASH
            # =================================================

            nueva_sesion.refresh_token_hash = (
                generar_refresh_token_hash(
                    nuevo_refresh_token
                )
            )

            self.db.flush()

            # =================================================
            # 10. ACTUALIZAR ÚLTIMO ACCESO
            # =================================================

            nueva_sesion.ultimo_acceso = ahora

            # =================================================
            # 11. COMMIT
            # =================================================

            self.db.commit()

            # =================================================
            # 12. RESPUESTA
            # =================================================

            return TokenResponse(
                access_token=nuevo_access_token,
                refresh_token=nuevo_refresh_token,
                token_type="bearer",
            )

        except Exception:

            self.db.rollback()

            raise

    # =====================================================
    # CERRAR SESIÓN 
    # =====================================================

    def cerrar_sesion(
        self,
        refresh_token: str,
    ) -> None:
        """
        Cierra una sesión existente.

        El Refresh Token se utiliza para localizar
        y validar la sesión.

        La sesión no se elimina de PostgreSQL.
        Simplemente se marca como revocada.
        """

        # =====================================================
        # 1. BUSCAR SESIONES ACTIVAS
        # =====================================================

        sesiones = (
            self.sesion_repositorio
            .buscar_sesiones_activas()
        )

        sesion_encontrada = None

        # =====================================================
        # 2. BUSCAR REFRESH TOKEN
        # =====================================================

        for sesion in sesiones:

            if verificar_refresh_token(
                refresh_token,
                sesion.refresh_token_hash,
            ):
                sesion_encontrada = sesion
                break

        # =====================================================
        # 3. TOKEN INVÁLIDO
        # =====================================================

        if not sesion_encontrada:

            raise ValueError(
                "Refresh Token inválido o sesión no encontrada."
            )

        try:

            # =================================================
            # 4. REVOCAR SESIÓN
            # =================================================

            self.sesion_repositorio.revocar(
                sesion_encontrada
            )

            # =================================================
            # 5. COMMIT
            # =================================================

            self.db.commit()

        except Exception:

            self.db.rollback()

            raise