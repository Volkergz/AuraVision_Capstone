from fastapi import APIRouter

from app.api.endpoints.autenticacion import (
    router as autenticacion_router,
)


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