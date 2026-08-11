import uuid

from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Sesion(Base):
    """
    Representa una sesión de autenticación de un usuario.

    Cada vez que un usuario inicia sesión correctamente,
    se creará un registro en esta tabla.

    Esto nos permitirá controlar y revocar sesiones.
    """

    __tablename__ = "sesiones"

    # ---------------------------------------------------------
    # IDENTIFICADOR
    # ---------------------------------------------------------

    id_sesion: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    # ---------------------------------------------------------
    # USUARIO
    # ---------------------------------------------------------

    # Relación con la tabla usuarios.
    #
    # Si el usuario se elimina, sus sesiones también
    # serán eliminadas gracias a ON DELETE CASCADE.
    id_usuario_fk: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "usuarios.id_usuario",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    # ---------------------------------------------------------
    # REFRESH TOKEN
    # ---------------------------------------------------------

    # NO almacenaremos el Refresh Token original.
    #
    # Guardaremos solamente su HASH.
    #
    # De esta forma, incluso si alguien obtiene acceso
    # a la base de datos, no tendrá directamente los
    # Refresh Tokens utilizables.
    token_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # ---------------------------------------------------------
    # FECHAS
    # ---------------------------------------------------------

    fecha_creacion: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    fecha_expiracion: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    # ---------------------------------------------------------
    # ESTADO DE LA SESIÓN
    # ---------------------------------------------------------

    # False = sesión válida
    # True  = sesión revocada
    revocada: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    ultimo_acceso: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )