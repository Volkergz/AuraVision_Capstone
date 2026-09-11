from fastapi import (
    APIRouter,
    File,
    HTTPException,
    Request,
    UploadFile,
    WebSocket,
    WebSocketDisconnect,
)

from app.predictor import predict_image
from app.schemas import PredictionResponse

router = APIRouter()




# Endpoint interno que recibe el JPEG desde la API principal:

@router.post("/predict", response_model=PredictionResponse)
async def predict(
    request: Request,
    file: UploadFile = File(...),
):
    if file.content_type not in {
        "image/jpeg",
        "image/png",
    }:
        raise HTTPException(
            status_code=415,
            detail="Formato de imagen no permitido",
        )

    image_bytes = await file.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="La imagen está vacía",
        )

    if len(image_bytes) > 8 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="La imagen supera el límite permitido",
        )

    result = predict_image(
        model=request.app.state.model,
        image_bytes=image_bytes,
    )

    await file.close()

    return result


@router.websocket("/ws/test")
async def websocket_test(websocket: WebSocket):
    await websocket.accept()

    print("Cliente WebSocket conectado")

    try:
        while True:
            mensaje = await websocket.receive_text()

            print(f"Mensaje recibido: {mensaje}")

            await websocket.send_json({
                "ok": True,
                "message": "Mensaje recibido correctamente",
                "echo": mensaje,
            })

    except WebSocketDisconnect:
        print("Cliente WebSocket desconectado")

@router.websocket("/ws/image")
async def websocket_image(websocket: WebSocket):
    await websocket.accept()
    print("Cliente de cámara conectado")

    try:
        while True:
            image_bytes = await websocket.receive_bytes()

            if not image_bytes:
                await websocket.send_json({
                    "ok": False,
                    "error": "Imagen vacía",
                })
                continue

            if len(image_bytes) > 8 * 1024 * 1024:
                await websocket.send_json({
                    "ok": False,
                    "error": "La imagen supera el límite de 8 MB",
                })
                continue

            result = predict_image(
                model=websocket.app.state.model,
                image_bytes=image_bytes,
            )

            await websocket.send_json({
                "ok": True,
                "result": result,
            })

    except WebSocketDisconnect:
        print("Cliente de cámara desconectado")
