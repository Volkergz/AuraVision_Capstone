from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencias import obtener_usuario_administrador
from app.db.sesion import obtener_sesion
from app.schemas.rol_esquema import RolActualizar, RolCrear, RolRespuesta
from app.services.rol_servicio import RolServicio


router = APIRouter(
    prefix="/roles",
    tags=["Roles"],
    dependencies=[Depends(obtener_usuario_administrador)],
)


@router.get("", response_model=list[RolRespuesta])
def listar_roles(db: Session = Depends(obtener_sesion)):
    servicio = RolServicio(db)
    return servicio.listar_roles()


@router.get("/{rol_id}", response_model=RolRespuesta)
def obtener_rol(
    rol_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = RolServicio(db)

    try:
        return servicio.obtener_rol(rol_id)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.post("", response_model=RolRespuesta, status_code=status.HTTP_201_CREATED)
def crear_rol(
    datos: RolCrear,
    db: Session = Depends(obtener_sesion),
):
    servicio = RolServicio(db)

    try:
        return servicio.crear_rol(datos)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(error),
        )


@router.put("/{rol_id}", response_model=RolRespuesta)
def actualizar_rol(
    rol_id: int,
    datos: RolActualizar,
    db: Session = Depends(obtener_sesion),
):
    servicio = RolServicio(db)

    try:
        return servicio.actualizar_rol(rol_id, datos)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.delete("/{rol_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_rol(
    rol_id: int,
    db: Session = Depends(obtener_sesion),
):
    servicio = RolServicio(db)

    try:
        servicio.eliminar_rol(rol_id)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )

    return None