"""configuracion por usuario y sesion_dispositivo

Revision ID: b6724e1f0a3a
Revises: 282ec334774d
Create Date: 2026-08-13

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b6724e1f0a3a'
down_revision: Union[str, Sequence[str], None] = '282ec334774d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('configuracion', sa.Column('id_usuario_fk', sa.Uuid(), nullable=True))

    op.execute(
        """
        UPDATE configuracion
        SET id_usuario_fk = dispositivos.id_usuario_fk
        FROM dispositivos
        WHERE configuracion.id_dispositivo_fk = dispositivos.id_dispositivo
        """
    )

    op.alter_column('configuracion', 'id_usuario_fk', nullable=False)

    op.create_index(
        op.f('ix_configuracion_id_usuario_fk'),
        'configuracion',
        ['id_usuario_fk'],
        unique=True,
    )

    op.create_table(
        'sesiones_dispositivo',
        sa.Column('id_sesion_dispositivo', sa.Uuid(), nullable=False),
        sa.Column('id_dispositivo_fk', sa.Uuid(), nullable=False),
        sa.Column('id_usuario_fk', sa.Uuid(), nullable=False),
        sa.Column('fecha_inicio', sa.DateTime(timezone=True), nullable=False),
        sa.Column('fecha_fin', sa.DateTime(timezone=True), nullable=True),
        sa.Column('activa', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.ForeignKeyConstraint(['id_dispositivo_fk'], ['dispositivos.id_dispositivo'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['id_usuario_fk'], ['usuarios.id_usuario'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id_sesion_dispositivo'),
    )
    op.create_index(
        op.f('ix_sesiones_dispositivo_id_dispositivo_fk'),
        'sesiones_dispositivo',
        ['id_dispositivo_fk'],
        unique=False,
    )
    op.create_index(
        op.f('ix_sesiones_dispositivo_id_usuario_fk'),
        'sesiones_dispositivo',
        ['id_usuario_fk'],
        unique=False,
    )

    op.drop_constraint('configuracion_id_dispositivo_fk_key', 'configuracion', type_='unique')
    op.drop_constraint('configuracion_id_dispositivo_fk_fkey', 'configuracion', type_='foreignkey')
    op.drop_column('configuracion', 'id_dispositivo_fk')

    op.drop_column('dispositivos', 'id_usuario_fk')


def downgrade() -> None:
    op.add_column('dispositivos', sa.Column('id_usuario_fk', sa.Uuid(), nullable=True))
    op.create_foreign_key(
        'dispositivos_id_usuario_fk_fkey',
        'dispositivos',
        'usuarios',
        ['id_usuario_fk'],
        ['id_usuario'],
        ondelete='SET NULL',
    )

    op.add_column('configuracion', sa.Column('id_dispositivo_fk', sa.Uuid(), nullable=True))
    op.execute(
        """
        UPDATE configuracion
        SET id_dispositivo_fk = sesiones_dispositivo.id_dispositivo_fk
        FROM sesiones_dispositivo
        WHERE configuracion.id_usuario_fk = sesiones_dispositivo.id_usuario_fk
        ORDER BY sesiones_dispositivo.fecha_inicio DESC
        LIMIT 1
        """
    )
    op.alter_column('configuracion', 'id_dispositivo_fk', nullable=False)
    op.create_unique_constraint('configuracion_id_dispositivo_fk_key', 'configuracion', ['id_dispositivo_fk'])
    op.create_foreign_key(
        'configuracion_id_dispositivo_fk_fkey',
        'configuracion',
        'dispositivos',
        ['id_dispositivo_fk'],
        ['id_dispositivo'],
        ondelete='CASCADE',
    )

    op.drop_index(op.f('ix_sesiones_dispositivo_id_usuario_fk'), table_name='sesiones_dispositivo')
    op.drop_index(op.f('ix_sesiones_dispositivo_id_dispositivo_fk'), table_name='sesiones_dispositivo')
    op.drop_table('sesiones_dispositivo')
    op.drop_index(op.f('ix_configuracion_id_usuario_fk'), table_name='configuracion')
    op.drop_column('configuracion', 'id_usuario_fk')
