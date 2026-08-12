import uuid

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Dispositivo(Base):
    """
    Representa un dispositivo registrado por un usuario.
    """

    __tablename__ = "dispositivos"

    id_dispositivo: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    id_usuario_fk: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey(
            "usuarios.id_usuario",
            ondelete="SET NULL",
        ),
        nullable=True,
    )

    nombre: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    numero_serie: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    version_firmware: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    estado_conexion: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )