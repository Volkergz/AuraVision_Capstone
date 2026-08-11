from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Componente(Base):
    """
    Representa un componente físico o lógico del dispositivo.
    """

    __tablename__ = "componente"

    id_componente: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    nombre: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    tipo: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )