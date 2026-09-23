from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Rol(Base):
    """
    Representa un rol disponible en el sistema.
    """

    __tablename__ = "rol"

    id_rol: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    nombre: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    estado: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )