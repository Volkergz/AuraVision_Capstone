import uuid

from datetime import date

from sqlalchemy import Date, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class EstadoComponente(Base):
    """
    Representa el estado operativo de un componente.
    """

    __tablename__ = "estado_componente"

    id_estado: Mapped[int] = mapped_column(
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

    id_componente_fk: Mapped[int] = mapped_column(
        ForeignKey(
            "componente.id_componente",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    estado: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    mensaje_error: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    fecha_revision: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )