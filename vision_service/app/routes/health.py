from fastapi import APIRouter, Request
import torch

router = APIRouter()


# Endpoint para saber si el servicio está activo, cuda disponible y si el modelo está cargado
@router.get("/")
async def health(request: Request):
    model_loaded = getattr(request.app.state, "model", None) is not None

    return {
        "status": "ok",
        "model_loaded": model_loaded,
        "cuda_available": torch.cuda.is_available(),
        "gpu_name": (
            torch.cuda.get_device_name(0)
            if torch.cuda.is_available()
            else None
        ),
    }


