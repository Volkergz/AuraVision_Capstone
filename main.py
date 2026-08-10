from fastapi import FastAPI

from app.api.rutas import router


# =========================================================
# AURA VISION API
# =========================================================

app = FastAPI(
    title="Aura Vision API",
    description="API de autenticación y gestión de Aura Vision",
    version="1.0.0",
)


# =========================================================
# RUTAS
# =========================================================

app.include_router(router)


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get(
    "/",
    tags=["Sistema"],
)
def health_check():
    """
    Endpoint básico para comprobar que la API
    está funcionando.
    """

    return {
        "message": "AURA Vision API funcionando",
    }