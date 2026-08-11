from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.telemetria_esquema import TelemetriaCrear, TelemetriaRespuesta
from app.services.telemetria_servicio import TelemetriaServicio


router = APIRouter(
    prefix="/telemetria",
    tags=["Telemetría"],
)


@router.get("", response_model=list[TelemetriaRespuesta])
def listar_telemetria(db: Session = Depends(obtener_sesion)):
    servicio = TelemetriaServicio(db)
    return servicio.listar_telemetria()


@router.get("/{telemetria_id}", response_model=TelemetriaRespuesta)
def obtener_telemetria(
    telemetria_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = TelemetriaServicio(db)

    try:
        return servicio.obtener_telemetria(telemetria_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.get("/dispositivo/{dispositivo_id}", response_model=list[TelemetriaRespuesta])
def listar_por_dispositivo(
    dispositivo_id: UUID,
    db: Session = Depends(obtener_sesion),
):
    servicio = TelemetriaServicio(db)
    return servicio.listar_por_dispositivo(dispositivo_id)


@router.post("", response_model=TelemetriaRespuesta, status_code=status.HTTP_201_CREATED)
def crear_telemetria(
    datos: TelemetriaCrear,
    db: Session = Depends(obtener_sesion),
):
    servicio = TelemetriaServicio(db)
    return servicio.crear_telemetria(datos)