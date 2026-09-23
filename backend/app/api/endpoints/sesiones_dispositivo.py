from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencias import obtener_usuario_actual
from app.db.sesion import obtener_sesion
from app.models.usuario import Usuario
from app.schemas.sesion_dispositivo_esquema import (
    SesionDispositivoCrear,
    SesionDispositivoRespuesta,
)
from app.services.sesion_dispositivo_servicio import SesionDispositivoServicio


router = APIRouter(
    prefix="/sesiones-dispositivo",
    tags=["Sesiones de dispositivo"],
)


@router.post(
    "",
    response_model=SesionDispositivoRespuesta,
    status_code=status.HTTP_201_CREATED,
)
def vincular_dispositivo(
    datos: SesionDispositivoCrear,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_sesion),
):
    servicio = SesionDispositivoServicio(db)

    try:
        return servicio.vincular(usuario.id_usuario, datos)
    except ValueError as error:
        codigo = (
            status.HTTP_404_NOT_FOUND
            if str(error) == "El dispositivo no existe."
            else status.HTTP_409_CONFLICT
        )
        raise HTTPException(status_code=codigo, detail=str(error))


@router.get("/actual", response_model=SesionDispositivoRespuesta)
def obtener_dispositivo_actual(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_sesion),
):
    try:
        return SesionDispositivoServicio(db).obtener_activa(usuario.id_usuario)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.delete("/actual", status_code=status.HTTP_204_NO_CONTENT)
def desvincular_dispositivo_actual(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(obtener_sesion),
):
    try:
        SesionDispositivoServicio(db).desvincular(usuario.id_usuario)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))

    return None