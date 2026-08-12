from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.sesion import obtener_sesion
from app.schemas.componente_esquema import (
    ComponenteActualizar,
    ComponenteCrear,
    ComponenteRespuesta,
)
from app.services.componente_servicio import ComponenteServicio


router = APIRouter(
    prefix="/componentes",
    tags=["Componentes"],
)


@router.get("", response_model=list[ComponenteRespuesta])
def listar_componentes(db: Session = Depends(obtener_sesion)):
    servicio = ComponenteServicio(db)
    return servicio.listar_componentes()


@router.get("/{componente_id}", response_model=ComponenteRespuesta)
def obtener_componente(
    componente_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = ComponenteServicio(db)

    try:
        return servicio.obtener_componente(componente_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.post("", response_model=ComponenteRespuesta, status_code=status.HTTP_201_CREATED)
def crear_componente(
    datos: ComponenteCrear,
    db: Session = Depends(obtener_sesion),
):
    servicio = ComponenteServicio(db)

    try:
        return servicio.crear_componente(datos)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(error))


@router.put("/{componente_id}", response_model=ComponenteRespuesta)
def actualizar_componente(
    componente_id: int,
    datos: ComponenteActualizar,
    db: Session = Depends(obtener_sesion),
):
    servicio = ComponenteServicio(db)

    try:
        return servicio.actualizar_componente(componente_id, datos)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))


@router.delete("/{componente_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_componente(
    componente_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = ComponenteServicio(db)

    try:
        servicio.eliminar_componente(componente_id)

    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error))

    return None