import uuid

from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Deteccion(Base):
    """
    Representa una detección realizada por un dispositivo.
    """

    __tablename__ = "deteccion"

    id_deteccion: Mapped[int] = mapped_column(
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

    tipo_objeto: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    descripcion: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    confianza: Mapped[float] = mapped_column(
        Numeric(10, 4),
        nullable=False,
    )

    fecha_deteccion: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )