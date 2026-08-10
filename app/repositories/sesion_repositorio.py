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
            Sesion.id == sesion_id
        )

        return self.db.scalar(consulta)

    # =========================================================
    # BUSCAR SESIÓN ACTIVA
    # =========================================================

    def buscar_activa(
        self,
        sesion_id: UUID,
    ) -> Sesion | None:
        """
        Busca una sesión que:

        - exista
        - no esté revocada
        - todavía no haya expirado
        """

        ahora = datetime.now(timezone.utc)

        consulta = (
            select(Sesion)
            .where(
                Sesion.id == sesion_id,
                Sesion.revocada.is_(False),
                Sesion.fecha_expiracion > ahora,
            )
        )

        return self.db.scalar(consulta)

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