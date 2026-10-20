import asyncio


from fastapi import (
    APIRouter,
    File,
    HTTPException,
    Request,
    Response,
    UploadFile,
    WebSocket,
    WebSocketDisconnect,
)


from fastapi.responses import (
    StreamingResponse,
)


from app.predictor import (
    get_latest_frame,
    predict_image,
)


from app.schemas import (
    PredictionResponse,
)


# =============================================================================
# Router
# =============================================================================

router = APIRouter()


# =============================================================================
# Configuración
# =============================================================================

MAX_IMAGE_SIZE = (
    8
    *
    1024
    *
    1024
)


# =============================================================================
# Endpoint interno que recibe JPEG desde la API principal
#
# POST /api/predict
# =============================================================================

@router.post(
    "/predict",
    response_model=PredictionResponse,
)
async def predict(
    request: Request,
    file: UploadFile = File(...),
):


    # =========================================================================
    # Validar formato
    # =========================================================================

    if file.content_type not in {

        "image/jpeg",

        "image/png",

    }:

        raise HTTPException(

            status_code=415,

            detail=
                "Formato de imagen no permitido",
        )


    # =========================================================================
    # Leer imagen
    # =========================================================================

    image_bytes = (
        await file.read()
    )


    # =========================================================================
    # Validar imagen vacía
    # =========================================================================

    if not image_bytes:

        raise HTTPException(

            status_code=400,

            detail=
                "La imagen está vacía",
        )


    # =========================================================================
    # Validar tamaño máximo
    # =========================================================================

    if (
        len(image_bytes)
        >
        MAX_IMAGE_SIZE
    ):

        raise HTTPException(

            status_code=413,

            detail=
                "La imagen supera el límite permitido",
        )


    # =========================================================================
    # Ejecutar predicción
    # =========================================================================

    result = predict_image(

        model=
            request.app.state.model,

        image_bytes=
            image_bytes,
    )


    # =========================================================================
    # Cerrar archivo
    # =========================================================================

    await file.close()


    # =========================================================================
    # Respuesta
    # =========================================================================

    return result


# =============================================================================
# DEBUG
#
# Obtener solamente la última imagen procesada.
#
# GET /api/debug/camera
# =============================================================================

@router.get(
    "/debug/camera"
)
async def debug_camera():


    frame = (
        get_latest_frame()
    )


    # =========================================================================
    # Todavía no hay imagen
    # =========================================================================

    if frame is None:

        return Response(

            content=
                "Todavia no se ha recibido ninguna imagen",

            media_type=
                "text/plain",

            status_code=
                404,
        )


    # =========================================================================
    # Retornar JPEG
    # =========================================================================

    return Response(

        content=
            frame,

        media_type=
            "image/jpeg",

        headers={
            "Cache-Control":
                "no-store, no-cache, must-revalidate, max-age=0",

            "Pragma":
                "no-cache",
        },
    )


# =============================================================================
# Generador MJPEG
#
# Va leyendo latest_frame continuamente.
# =============================================================================

async def camera_stream():


    last_frame = None


    while True:


        # =====================================================================
        # Obtener última imagen
        # =====================================================================

        frame = (
            get_latest_frame()
        )


        # =====================================================================
        # Solo enviar si existe una imagen
        # =====================================================================

        if frame is not None:


            # =================================================================
            # Evitar mandar exactamente el mismo frame muchas veces
            # =================================================================

            if frame is not last_frame:


                last_frame = frame


                yield (

                    b"--frame\r\n"

                    b"Content-Type: image/jpeg\r\n"

                    b"Cache-Control: no-cache\r\n"

                    b"\r\n"

                    +

                    frame

                    +

                    b"\r\n"
                )


        # =====================================================================
        # Pequeña pausa para no saturar CPU
        #
        # El ESP32 manda aproximadamente cada 500 ms,
        # por lo que no necesitamos consultar miles de veces por segundo.
        # =====================================================================

        await asyncio.sleep(
            0.02
        )


# =============================================================================
# STREAMING MJPEG
#
# GET /api/debug/camera/live
# =============================================================================

@router.get(
    "/debug/camera/live"
)
async def debug_camera_live():


    return StreamingResponse(

        camera_stream(),

        media_type=(
            "multipart/x-mixed-replace; "
            "boundary=frame"
        ),

        headers={

            "Cache-Control":
                "no-store, no-cache, must-revalidate, max-age=0",

            "Pragma":
                "no-cache",

            "Expires":
                "0",
        },
    )


# =============================================================================
# WebSocket de prueba
#
# WS /api/ws/test
# =============================================================================

@router.websocket(
    "/ws/test"
)
async def websocket_test(
    websocket: WebSocket,
):


    # =========================================================================
    # Aceptar conexión
    # =========================================================================

    await websocket.accept()


    print(
        "Cliente WebSocket conectado"
    )


    try:


        while True:


            # =================================================================
            # Recibir texto
            # =================================================================

            mensaje = (
                await websocket.receive_text()
            )


            print(
                f"Mensaje recibido: {mensaje}"
            )


            # =================================================================
            # Responder
            # =================================================================

            await websocket.send_json(
                {

                    "ok":
                        True,

                    "message":
                        "Mensaje recibido correctamente",

                    "echo":
                        mensaje,
                }
            )


    except WebSocketDisconnect:


        print(
            "Cliente WebSocket desconectado"
        )


# =============================================================================
# WebSocket imágenes
#
# WS /api/ws/image
# =============================================================================

@router.websocket(
    "/ws/image"
)
async def websocket_image(
    websocket: WebSocket,
):


    # =========================================================================
    # Aceptar
    # =========================================================================

    await websocket.accept()


    print(
        "Cliente de cámara conectado"
    )


    try:


        while True:


            # =================================================================
            # Recibir JPEG
            # =================================================================

            image_bytes = (
                await websocket.receive_bytes()
            )


            # =================================================================
            # Validar vacío
            # =================================================================

            if not image_bytes:


                await websocket.send_json(
                    {

                        "ok":
                            False,

                        "error":
                            "Imagen vacía",
                    }
                )


                continue


            # =================================================================
            # Validar tamaño
            # =================================================================

            if (
                len(image_bytes)
                >
                MAX_IMAGE_SIZE
            ):


                await websocket.send_json(
                    {

                        "ok":
                            False,

                        "error":
                            "La imagen supera el límite de 8 MB",
                    }
                )


                continue


            # =================================================================
            # Predicción
            # =================================================================

            result = predict_image(

                model=
                    websocket.app.state.model,

                image_bytes=
                    image_bytes,
            )


            # =================================================================
            # Respuesta
            # =================================================================

            await websocket.send_json(
                {

                    "ok":
                        True,

                    "result":
                        result,
                }
            )


    except WebSocketDisconnect:


        print(
            "Cliente de cámara desconectado"
        )