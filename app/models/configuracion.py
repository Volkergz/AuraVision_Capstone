import uuid

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.core.fecha import ahora_chile


class Configuracion(Base):
    """
    Representa la configuración activa de un usuario.
    """

    __tablename__ = "configuracion"

    id_configuracion: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    id_usuario_fk: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "usuarios.id_usuario",
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
        default=ahora_chile,
        nullable=False,
    )

    usuario: Mapped["Usuario"] = relationship(
        back_populates="configuraciones",
    )