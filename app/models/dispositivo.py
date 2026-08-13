import uuid

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Dispositivo(Base):
    """
    Representa un dispositivo físico que puede ser utilizado por varios usuarios
    mediante sesiones activas a lo largo del tiempo.
    """

    __tablename__ = "dispositivos"

    id_dispositivo: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
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

    sesiones_dispositivo: Mapped[list["SesionDispositivo"]] = relationship(
        back_populates="dispositivo",
        cascade="all, delete-orphan",
    )