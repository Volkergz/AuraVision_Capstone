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

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4
    )

    # ---------------------------------------------------------
    # USUARIO
    # ---------------------------------------------------------

    # Relación con la tabla usuarios.
    #
    # Si el usuario se elimina, sus sesiones también
    # serán eliminadas gracias a ON DELETE CASCADE.
    usuario_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "usuarios.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
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
    refresh_token_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    # ---------------------------------------------------------
    # FECHAS
    # ---------------------------------------------------------

    fecha_creacion: Mapped[datetime] = mapped_column(
        DateTime(timezone.utc),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    fecha_expiracion: Mapped[datetime] = mapped_column(
        DateTime(timezone.utc),
        nullable=False
    )

    # ---------------------------------------------------------
    # ESTADO DE LA SESIÓN
    # ---------------------------------------------------------

    # False = sesión válida
    # True  = sesión revocada
    revocada: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    # Última vez que se utilizó esta sesión.
    #
    # Puede ser NULL porque una sesión recién creada
    # todavía no necesariamente ha utilizado el refresh token.
    ultimo_acceso: Mapped[datetime | None] = mapped_column(
        DateTime(timezone.utc),
        nullable=True
    )