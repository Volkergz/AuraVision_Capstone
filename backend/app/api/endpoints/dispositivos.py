from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.dispositivo_esquema import (
    DispositivoActualizar,
    DispositivoCrear,
    DispositivoRespuesta,
)
from app.services.dispositivo_servicio import DispositivoServicio


router = APIRouter(
    prefix="/dispositivos",
    tags=["Dispositivos"],
)


@router.get("", response_model=list[DispositivoRespuesta])
def listar_dispositivos(db: Session = Depends(obtener_sesion)):
    servicio = DispositivoServicio(db)
    return servicio.listar_dispositivos()


@router.get("/usuario/{usuario_id}", response_model=list[DispositivoRespuesta])
def listar_dispositivos_por_usuario(
    usuario_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = DispositivoServicio(db)
    return servicio.listar_por_usuario(usuario_id)


@router.get("/{dispositivo_id}", response_model=DispositivoRespuesta)
def obtener_dispositivo(
    dispositivo_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = DispositivoServicio(db)

    try:
        return servicio.obtener_dispositivo(dispositivo_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.post("", response_model=DispositivoRespuesta, status_code=status.HTTP_201_CREATED)
def crear_dispositivo(
    datos: DispositivoCrear,
    db: Session = Depends(obtener_sesion),
):
    servicio = DispositivoServicio(db)

    try:
        return servicio.crear_dispositivo(datos)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(error))


@router.put("/{dispositivo_id}", response_model=DispositivoRespuesta)
def actualizar_dispositivo(
    dispositivo_id: UUID,
    datos: DispositivoActualizar,
    db: Session = Depends(obtener_sesion),
):
    servicio = DispositivoServicio(db)

    try:
        return servicio.actualizar_dispositivo(dispositivo_id, datos)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.delete("/{dispositivo_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_dispositivo(
    dispositivo_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = DispositivoServicio(db)

    try:
        servicio.eliminar_dispositivo(dispositivo_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))

    return None