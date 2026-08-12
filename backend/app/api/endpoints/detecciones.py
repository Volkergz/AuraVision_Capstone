from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.deteccion_esquema import DeteccionCrear, DeteccionRespuesta
from app.services.deteccion_servicio import DeteccionServicio


router = APIRouter(
    prefix="/detecciones",
    tags=["Detecciones"],
)


@router.get("", response_model=list[DeteccionRespuesta])
def listar_detecciones(db: Session = Depends(obtener_sesion)):
    servicio = DeteccionServicio(db)
    return servicio.listar_detecciones()


@router.get("/{deteccion_id}", response_model=DeteccionRespuesta)
def obtener_deteccion(
    deteccion_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = DeteccionServicio(db)

    try:
        return servicio.obtener_deteccion(deteccion_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.get("/dispositivo/{dispositivo_id}", response_model=list[DeteccionRespuesta])
def listar_por_dispositivo(
    dispositivo_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = DeteccionServicio(db)
    return servicio.listar_por_dispositivo(dispositivo_id)


@router.post("", response_model=DeteccionRespuesta, status_code=status.HTTP_201_CREATED)
def crear_deteccion(
    datos: DeteccionCrear,
    db: Session = Depends(obtener_sesion),
):
    servicio = DeteccionServicio(db)
    return servicio.crear_deteccion(datos)