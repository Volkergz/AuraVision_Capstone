from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.configuracion import configuracion


# ---------------------------------------------------------
# ENGINE
# ---------------------------------------------------------
#
# El engine administra la comunicación entre SQLAlchemy
# y PostgreSQL.
#
# La URL de conexión se obtiene desde .env.
#

engine = create_engine(
    configuracion.database_url,
    pool_pre_ping=True,
)


# ---------------------------------------------------------
# SESSION FACTORY
# ---------------------------------------------------------
#
# sessionmaker crea sesiones de base de datos.
#
# Cada operación contra PostgreSQL utilizará una sesión.
#

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


def obtener_sesion():
    """
    Genera una sesión de base de datos.

    Esta función será utilizada posteriormente
    mediante FastAPI Depends().

    La sesión se cierra automáticamente cuando
    termina la petición.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()