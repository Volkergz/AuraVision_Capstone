from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.usuario import Usuario


class UsuarioRepositorio:
    """
    Repository encargado exclusivamente de las operaciones
    relacionadas con la tabla usuarios.

    Esta clase NO contiene lógica de autenticación.
    Su responsabilidad es interactuar con PostgreSQL
    mediante SQLAlchemy.
    """

    def __init__(self, db: Session):
        """
        Recibe una sesión de SQLAlchemy.

        La sesión será proporcionada por FastAPI mediante
        Depends(obtener_sesion).
        """

        self.db = db

    # =========================================================
    # BUSCAR POR EMAIL
    # =========================================================

    def buscar_por_email(
        self,
        email: str,
    ) -> Usuario | None:
        """
        Busca un usuario utilizando su correo electrónico.

        Retorna:

            Usuario -> si existe
            None    -> si no existe
        """

        consulta = select(Usuario).where(
            Usuario.email == email
        )

        return self.db.scalar(consulta)

    # =========================================================
    # BUSCAR POR ID
    # =========================================================

    def buscar_por_id(
        self,
        usuario_id: UUID,
    ) -> Usuario | None:
        """
        Busca un usuario mediante su UUID.
        """

        consulta = select(Usuario).where(
            Usuario.id == usuario_id
        )

        return self.db.scalar(consulta)

    # =========================================================
    # CREAR USUARIO
    # =========================================================

    def crear(
        self,
        usuario: Usuario,
    ) -> Usuario:
        """
        Agrega un nuevo usuario a la sesión de SQLAlchemy.

        El commit será responsabilidad de la capa superior.

        Esto nos permite controlar la transacción desde
        el Service.
        """

        self.db.add(usuario)

        self.db.flush()

        return usuario

    # =========================================================
    # ACTUALIZAR USUARIO
    # =========================================================

    def actualizar(
        self,
        usuario: Usuario,
    ) -> Usuario:
        """
        Actualiza un usuario existente.

        SQLAlchemy detectará automáticamente los cambios
        realizados sobre el objeto.
        """

        self.db.flush()

        return usuario