from fastapi import APIRouter

from app.api.endpoints.autenticacion import (
    router as autenticacion_router,
)
from app.api.endpoints.componentes import router as componentes_router
from app.api.endpoints.configuracion import router as configuracion_router
from app.api.endpoints.detecciones import router as detecciones_router
from app.api.endpoints.dispositivos import router as dispositivos_router
from app.api.endpoints.estado_componentes import (
    router as estado_componentes_router,
)
from app.api.endpoints.roles import router as roles_router
from app.api.endpoints.telemetria import router as telemetria_router
from app.api.endpoints.usuarios import router as usuarios_router


# =========================================================
# ROUTER PRINCIPAL DE LA API
# =========================================================

router = APIRouter(
    prefix="/api/v1",
)


# =========================================================
# AUTENTICACIÓN
# =========================================================

router.include_router(
    autenticacion_router,
)

router.include_router(usuarios_router)
router.include_router(roles_router)
router.include_router(componentes_router)
router.include_router(dispositivos_router)
router.include_router(configuracion_router)
router.include_router(detecciones_router)
router.include_router(estado_componentes_router)
router.include_router(telemetria_router)