"""evita vínculos activos duplicados

Revision ID: c3d7a1e9b2f4
Revises: b6724e1f0a3a
"""
from typing import Sequence, Union

from alembic import op


revision: str = "c3d7a1e9b2f4"
down_revision: Union[str, Sequence[str], None] = "b6724e1f0a3a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index(
        "uq_sesiones_dispositivo_vinculo_activo",
        "sesiones_dispositivo",
        ["id_usuario_fk", "id_dispositivo_fk"],
        unique=True,
        postgresql_where="activa = true",
    )


def downgrade() -> None:
    op.drop_index(
        "uq_sesiones_dispositivo_vinculo_activo",
        table_name="sesiones_dispositivo",
    )