from fastapi import APIRouter, File, HTTPException, Request, UploadFile

from app.predictor import predict_image

router = APIRouter()




# Endpoint interno que recibe el JPEG desde la API principal:

@router.post("/predict")
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
