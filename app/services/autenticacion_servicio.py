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
from app.repositories.sesion_repositorio import SesionRepositorio
from app.repositories.usuario_repositorio import UsuarioRepositorio
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
    """

    def __init__(self, db: Session):
        self.db = db
        self.usuario_repositorio = UsuarioRepositorio(db)
        self.sesion_repositorio = SesionRepositorio(db)

    # =========================================================
    # REGISTRO
    # =========================================================

    def registrar(
        self,
        datos: UsuarioRegistro,
    ) -> UsuarioRespuesta:
        """
        Registra un nuevo usuario.
        """

        usuario_existente = self.usuario_repositorio.buscar_por_email(
            datos.email,
        )

        if usuario_existente:
            raise ValueError(
                "El correo electrónico ya está registrado."
            )

        password_hash = generar_password_hash(datos.password)

        usuario = Usuario(
            id_rol_fk= 1, # Siempre es 1 para que se cree como usuario
            nombre=datos.nombre,
            apellido=datos.apellido,
            fecha_nacimiento=datos.fecha_nacimiento,
            email=datos.email,
            password_hash=password_hash,
            estado=True,
        )

        try:
            self.usuario_repositorio.crear(usuario)
            self.db.commit()

            return UsuarioRespuesta.model_validate(usuario)

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
        """

        usuario = self.usuario_repositorio.buscar_por_email(
            datos.email,
        )

        if not usuario:
            raise ValueError(
                "Credenciales incorrectas."
            )

        if not usuario.estado:
            raise ValueError(
                "La cuenta se encuentra desactivada."
            )

        if not verificar_password(
            datos.password,
            usuario.password_hash,
        ):
            raise ValueError(
                "Credenciales incorrectas."
            )

        try:
            ahora = datetime.now(timezone.utc)
            fecha_expiracion = ahora + timedelta(
                days=configuracion.refresh_token_expire_days,
            )

            sesion = Sesion(
                id_usuario_fk=usuario.id_usuario,
                token_hash="PENDIENTE",
                fecha_expiracion=fecha_expiracion,
                ultimo_acceso=ahora,
            )

            self.sesion_repositorio.crear(sesion)

            access_token = crear_access_token(
                usuario_id=usuario.id_usuario,
                sesion_id=sesion.id_sesion,
            )

            refresh_token = crear_refresh_token(
                usuario_id=usuario.id_usuario,
                sesion_id=sesion.id_sesion,
            )

            sesion.token_hash = generar_refresh_token_hash(
                refresh_token,
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
    # REFRESCAR SESIÓN
    # =========================================================

    def refrescar_sesion(
        self,
        refresh_token: str,
    ) -> TokenResponse:
        """
        Renueva una sesión utilizando un Refresh Token válido.
        """

        sesiones = self.sesion_repositorio.buscar_sesiones_activas()
        sesion_encontrada = None

        for sesion in sesiones:
            if verificar_refresh_token(
                refresh_token,
                sesion.token_hash,
            ):
                sesion_encontrada = sesion
                break

        if not sesion_encontrada:
            raise ValueError(
                "Refresh Token inválido o expirado."
            )

        try:
            usuario = self.usuario_repositorio.buscar_por_id(
                sesion_encontrada.id_usuario_fk,
            )

            if not usuario:
                raise ValueError(
                    "El usuario asociado a la sesión no existe."
                )

            if not usuario.estado:
                raise ValueError(
                    "La cuenta se encuentra desactivada."
                )

            self.sesion_repositorio.revocar(sesion_encontrada)

            ahora = datetime.now(timezone.utc)
            fecha_expiracion = ahora + timedelta(
                days=configuracion.refresh_token_expire_days,
            )

            nueva_sesion = Sesion(
                id_usuario_fk=usuario.id_usuario,
                token_hash="PENDIENTE",
                fecha_expiracion=fecha_expiracion,
                ultimo_acceso=ahora,
            )

            self.sesion_repositorio.crear(nueva_sesion)

            nuevo_access_token = crear_access_token(
                usuario_id=usuario.id_usuario,
                sesion_id=nueva_sesion.id_sesion,
            )

            nuevo_refresh_token = crear_refresh_token(
                usuario_id=usuario.id_usuario,
                sesion_id=nueva_sesion.id_sesion,
            )

            nueva_sesion.token_hash = generar_refresh_token_hash(
                nuevo_refresh_token,
            )

            self.db.flush()
            self.db.commit()

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
        """

        sesiones = self.sesion_repositorio.buscar_sesiones_activas()
        sesion_encontrada = None

        for sesion in sesiones:
            if verificar_refresh_token(
                refresh_token,
                sesion.token_hash,
            ):
                sesion_encontrada = sesion
                break

        if not sesion_encontrada:
            raise ValueError(
                "Refresh Token inválido o sesión no encontrada."
            )

        try:
            self.sesion_repositorio.revocar(sesion_encontrada)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise