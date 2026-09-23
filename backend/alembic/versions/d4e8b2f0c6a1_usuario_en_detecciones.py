"""asocia las detecciones con el usuario

Revision ID: d4e8b2f0c6a1
Revises: c3d7a1e9b2f4
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op


revision: str = "d4e8b2f0c6a1"
down_revision: Union[str, Sequence[str], None] = "c3d7a1e9b2f4"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "deteccion",
        sa.Column("id_usuario_fk", sa.Uuid(), nullable=True),
    )
    op.create_foreign_key(
        "deteccion_id_usuario_fk_fkey",
        "deteccion",
        "usuarios",
        ["id_usuario_fk"],
        ["id_usuario"],
        ondelete="SET NULL",
    )
    op.create_index(
        "ix_deteccion_id_usuario_fk",
        "deteccion",
        ["id_usuario_fk"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_deteccion_id_usuario_fk", table_name="deteccion")
    op.drop_constraint("deteccion_id_usuario_fk_fkey", "deteccion", type_="foreignkey")
    op.drop_column("deteccion", "id_usuario_fk")