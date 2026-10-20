from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Clase base para todos los modelos de SQLAlchemy.

    Todos los modelos de nuestra aplicación heredarán
    de esta clase.

    Ejemplo:

        class Usuario(Base):
            ...
    """

    pass