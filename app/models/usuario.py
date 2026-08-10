import uuid

from datetime import datetime

from sqlalchemy import Boolean, DateTime, String
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

    # UUID en lugar de un ID numérico.
    #
    # Ejemplo:
    # 550e8400-e29b-41d4-a716-446655440000
    #
    # Esto evita exponer IDs secuenciales como:
    # 1, 2, 3, 4...
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4
    )

    # ---------------------------------------------------------
    # INFORMACIÓN DEL USUARIO
    # ---------------------------------------------------------

    nombre: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    # El correo será utilizado para iniciar sesión.
    #
    # unique=True:
    # No pueden existir dos usuarios con el mismo correo.
    #
    # index=True:
    # PostgreSQL podrá buscar correos más eficientemente.
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    # ---------------------------------------------------------
    # CONTRASEÑA
    # ---------------------------------------------------------

    # IMPORTANTE:
    #
    # Aquí NUNCA guardaremos:
    #
    # password = "123456"
    #
    # Guardaremos únicamente el HASH generado mediante Argon2.
    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    # ---------------------------------------------------------
    # ESTADO
    # ---------------------------------------------------------

    # Permite desactivar una cuenta sin eliminarla.
    #
    # Por ejemplo:
    #
    # activo = False
    #
    # significa que el usuario no podrá iniciar sesión.
    activo: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    # ---------------------------------------------------------
    # FECHAS
    # ---------------------------------------------------------

    fecha_creacion: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    fecha_actualizacion: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )