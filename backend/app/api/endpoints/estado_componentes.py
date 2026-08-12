from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.estado_componente_esquema import (
    EstadoComponenteActualizar,
    EstadoComponenteCrear,
    EstadoComponenteRespuesta,
)
from app.services.estado_componente_servicio import EstadoComponenteServicio


router = APIRouter(
    prefix="/estado-componentes",
    tags=["Estado de Componentes"],
)


@router.get("", response_model=list[EstadoComponenteRespuesta])
def listar_estados(db: Session = Depends(obtener_sesion)):
    servicio = EstadoComponenteServicio(db)
    return servicio.listar_estados()


@router.get("/{estado_id}", response_model=EstadoComponenteRespuesta)
def obtener_estado(
    estado_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = EstadoComponenteServicio(db)

    try:
        return servicio.obtener_estado(estado_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.get("/dispositivo/{dispositivo_id}", response_model=list[EstadoComponenteRespuesta])
def listar_por_dispositivo(
    dispositivo_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = EstadoComponenteServicio(db)
    return servicio.listar_por_dispositivo(dispositivo_id)


@router.get("/componente/{componente_id}", response_model=list[EstadoComponenteRespuesta])
def listar_por_componente(
    componente_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = EstadoComponenteServicio(db)
    return servicio.listar_por_componente(componente_id)


@router.post("", response_model=EstadoComponenteRespuesta, status_code=status.HTTP_201_CREATED)
def crear_estado(
    datos: EstadoComponenteCrear,
    db: Session = Depends(obtener_sesion),
):
    servicio = EstadoComponenteServicio(db)
    return servicio.crear_estado(datos)


@router.put("/{estado_id}", response_model=EstadoComponenteRespuesta)
def actualizar_estado(
    estado_id: int,
    datos: EstadoComponenteActualizar,
    db: Session = Depends(obtener_sesion),
):
    servicio = EstadoComponenteServicio(db)

    try:
        return servicio.actualizar_estado(estado_id, datos)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.delete("/{estado_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_estado(
    estado_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = EstadoComponenteServicio(db)

    try:
        servicio.eliminar_estado(estado_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))

    return None