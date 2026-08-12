import uuid

from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Configuracion(Base):
    """
    Representa la configuración activa de un dispositivo.
    """

    __tablename__ = "configuracion"

    id_configuracion: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    id_dispositivo_fk: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "dispositivos.id_dispositivo",
            ondelete="CASCADE",
        ),
        unique=True,
        nullable=False,
    )

    volumen: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    auto_conexion: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    fecha_actualizacion: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )