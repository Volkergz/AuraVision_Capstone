import uuid

from datetime import date, datetime, timezone

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

class Usuario(Base):
    """
    Modelo que representa a un usuario de AURA Vision.

    Cada objeto Usuario corresponde a un registro
    dentro de la tabla 'usuarios' de PostgreSQL.
    """

    __tablename__ = "usuarios"

    # ---------------------------------------------------------
    # IDENTIFICADOR
    # ---------------------------------------------------------

    id_usuario: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    # ---------------------------------------------------------
    # ROL
    # ---------------------------------------------------------

    id_rol_fk: Mapped[int] = mapped_column(
        ForeignKey("rol.id_rol"),
        nullable=False,
    )

    # ---------------------------------------------------------
    # INFORMACIÓN DEL USUARIO
    # ---------------------------------------------------------

    nombre: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    apellido: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    fecha_nacimiento: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    # ---------------------------------------------------------
    # CONTRASEÑA
    # ---------------------------------------------------------

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # ---------------------------------------------------------
    # ESTADO
    # ---------------------------------------------------------

    estado: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
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