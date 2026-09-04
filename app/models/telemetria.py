import uuid

from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Telemetria(Base):
    """
    Representa una lectura de telemetría capturada por un dispositivo.
    """

    __tablename__ = "telemetria"

    id_telemetria: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    id_dispositivo_fk: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "dispositivos.id_dispositivo",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    porcentaje_bateria: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    tiempo_restante: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    estado_conexion: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
    )

    fecha_dispositivo: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    voltaje_bateria: Mapped[float | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )

    nivel_senal: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )