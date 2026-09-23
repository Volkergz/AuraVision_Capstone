from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.sesion import Sesion


class SesionRepositorio:
    """
    Repository encargado exclusivamente de las operaciones
    relacionadas con las sesiones de autenticación.
    """

    def __init__(self, db: Session):
        """
        Recibe la sesión de SQLAlchemy.
        """

        self.db = db

    # =========================================================
    # CREAR SESIÓN
    # =========================================================

    def crear(
        self,
        sesion: Sesion,
    ) -> Sesion:
        """
        Agrega una nueva sesión a la transacción actual.
        """

        self.db.add(sesion)

        self.db.flush()

        return sesion

    # =========================================================
    # BUSCAR POR ID
    # =========================================================

    def buscar_por_id(
        self,
        sesion_id: UUID,
    ) -> Sesion | None:
        """
        Busca una sesión mediante su UUID.
        """

        consulta = select(Sesion).where(
            Sesion.id_sesion == sesion_id
        )

        return self.db.scalar(consulta)

    # =========================================================
    # BUSCAR SESIÓN ACTIVA
    # =========================================================

    def buscar_sesiones_activas(
        self,
    ) -> list[Sesion]:
        """
        Obtiene las sesiones que todavía podrían ser válidas.

        Se filtran por:
        - no revocadas
        - no expiradas
        """

        ahora = datetime.now(timezone.utc)

        consulta = (
            select(Sesion)
            .where(
                Sesion.revocada.is_(False),
                Sesion.fecha_expiracion > ahora,
            )
        )

        return list(
            self.db.scalars(consulta).all()
        )

    # =========================================================
    # REVOCAR SESIÓN
    # =========================================================

    def revocar(
        self,
        sesion: Sesion,
    ) -> Sesion:
        """
        Marca una sesión como revocada.

        No eliminamos el registro.

        Esto es útil para mantener un historial de sesiones
        y permitir auditoría posteriormente.
        """

        sesion.revocada = True

        self.db.flush()

        return sesion

    # =========================================================
    # ACTUALIZAR ÚLTIMO ACCESO
    # =========================================================

    def actualizar_ultimo_acceso(
        self,
        sesion: Sesion,
    ) -> Sesion:
        """
        Registra cuándo fue utilizada por última vez
        una sesión.
        """

        sesion.ultimo_acceso = datetime.now(timezone.utc)

        self.db.flush()

        return sesion

    # =========================================================
    # BUSCAR SESIONES POR USUARIO
    # =========================================================

    def buscar_por_usuario(
        self,
        usuario_id: UUID,
    ) -> list[Sesion]:
        """
        Obtiene las sesiones pertenecientes a un usuario.
        """

        consulta = select(Sesion).where(
            Sesion.id_usuario_fk == usuario_id,
        )

        return list(
            self.db.scalars(consulta).all()
        )