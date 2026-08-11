from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.usuario_esquema import (
    UsuarioActualizacion,
    UsuarioRespuesta,
)
from app.services.usuario_servicio import UsuarioServicio


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"],
)


@router.get("", response_model=list[UsuarioRespuesta])
def listar_usuarios(db: Session = Depends(obtener_sesion)):
    servicio = UsuarioServicio(db)
    return servicio.listar_usuarios()


@router.get("/{usuario_id}", response_model=UsuarioRespuesta)
def obtener_usuario(
    usuario_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = UsuarioServicio(db)

    try:
        return servicio.obtener_usuario(usuario_id)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.put("/{usuario_id}", response_model=UsuarioRespuesta)
def actualizar_usuario(
    usuario_id: UUID,
    datos: UsuarioActualizacion,
    db: Session = Depends(obtener_sesion),
):
    servicio = UsuarioServicio(db)

    try:
        return servicio.actualizar_usuario(usuario_id, datos)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_usuario(
    usuario_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = UsuarioServicio(db)

    try:
        servicio.eliminar_usuario(usuario_id)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )

    return None