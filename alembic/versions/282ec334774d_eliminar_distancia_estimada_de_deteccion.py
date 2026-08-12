"""eliminar distancia_estimada de deteccion

Revision ID: 282ec334774d
Revises: 01a482baa05b
Create Date: 2026-08-12 11:02:45.902623

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '282ec334774d'
down_revision: Union[str, Sequence[str], None] = '01a482baa05b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.drop_column("deteccion", "distancia_estimada")


def downgrade():
    op.add_column(
        "deteccion",
        sa.Column("distancia_estimada", sa.Integer(), nullable=False),
    )
