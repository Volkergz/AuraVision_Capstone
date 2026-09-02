from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.model_loader import load_model
from app.routes.health import router as health_router
from app.routes.predict import router as predict_router


# Inicia el modelo de visión artificial y carga el modelo al arrancar


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = load_model()
    yield
    app.state.model = None


app = FastAPI(
    title="AuraVision Vision Service",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(health_router)
app.include_router(predict_router, prefix="/api/")