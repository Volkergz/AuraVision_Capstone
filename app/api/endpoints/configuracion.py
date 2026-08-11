from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.configuracion_esquema import (
    ConfiguracionActualizar,
    ConfiguracionCrear,
    ConfiguracionRespuesta,
)
from app.services.configuracion_servicio import ConfiguracionServicio


router = APIRouter(
    prefix="/configuracion",
    tags=["Configuración"],
)


@router.get("", response_model=list[ConfiguracionRespuesta])
def listar_configuraciones(db: Session = Depends(obtener_sesion)):
    servicio = ConfiguracionServicio(db)
    return servicio.listar_configuraciones()


@router.get("/{configuracion_id}", response_model=ConfiguracionRespuesta)
def obtener_configuracion(
    configuracion_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = ConfiguracionServicio(db)

    try:
        return servicio.obtener_por_id(configuracion_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.get("/dispositivo/{dispositivo_id}", response_model=ConfiguracionRespuesta)
def obtener_por_dispositivo(
    dispositivo_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = ConfiguracionServicio(db)

    try:
        return servicio.obtener_por_dispositivo(dispositivo_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.post("", response_model=ConfiguracionRespuesta, status_code=status.HTTP_201_CREATED)
def crear_configuracion(
    datos: ConfiguracionCrear,
    db: Session = Depends(obtener_sesion),
):
    servicio = ConfiguracionServicio(db)

    try:
        return servicio.crear_configuracion(datos)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(error))


@router.put("/dispositivo/{dispositivo_id}", response_model=ConfiguracionRespuesta)
def actualizar_configuracion(
    dispositivo_id: UUID,
    datos: ConfiguracionActualizar,
    db: Session = Depends(obtener_sesion),
):
    servicio = ConfiguracionServicio(db)

    try:
        return servicio.actualizar_configuracion(dispositivo_id, datos)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.delete("/dispositivo/{dispositivo_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_configuracion(
    dispositivo_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = ConfiguracionServicio(db)

    try:
        servicio.eliminar_configuracion(dispositivo_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))

    return None