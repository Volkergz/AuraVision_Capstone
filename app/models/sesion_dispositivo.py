import uuid

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.core.fecha import ahora_chile


class SesionDispositivo(Base):
    """
    Relación de uso de un dispositivo por un usuario en un período de tiempo.
    Permite que un mismo dispositivo pueda pertenecer a varios usuarios
    en diferentes sesiones.
    """

    __tablename__ = "sesiones_dispositivo"

    id_sesion_dispositivo: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    id_dispositivo_fk: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "dispositivos.id_dispositivo",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    id_usuario_fk: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "usuarios.id_usuario",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    fecha_inicio: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=ahora_chile,
        nullable=False,
    )

    fecha_fin: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    activa: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    dispositivo: Mapped["Dispositivo"] = relationship(
        back_populates="sesiones_dispositivo",
    )

    usuario: Mapped["Usuario"] = relationship(
        back_populates="sesiones_dispositivo",
    )
