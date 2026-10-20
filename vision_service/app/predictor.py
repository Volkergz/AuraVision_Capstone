import time
from io import BytesIO

from PIL import Image

from app.config import CONFIDENCE_THRESHOLD, DEVICE


# =============================================================================
# Última imagen procesada
# =============================================================================

latest_frame: bytes | None = None


# =============================================================================
# Obtener última imagen procesada
# =============================================================================

def get_latest_frame() -> bytes | None:
    return latest_frame


# =============================================================================
# Determinar posición relativa del objeto
# =============================================================================

def image_position(
    object_center_x: float,
    image_width: int
) -> str:

    tolerance = image_width * 0.1

    difference = object_center_x - (image_width / 2)

    if difference < -tolerance:
        return "frente_izquierda"

    if difference > tolerance:
        return "frente_derecha"

    return "frente"


# =============================================================================
# Predicción de imagen
# =============================================================================

def predict_image(
    model,
    image_bytes: bytes
) -> dict:

    global latest_frame

    started_at = time.perf_counter()


    # =========================================================================
    # 1. Decodificar JPEG recibido desde el ESP32
    # =========================================================================

    image = Image.open(
        BytesIO(image_bytes)
    ).convert("RGB")


    # =========================================================================
    # 2. Rotar imagen
    #
    # PIL ROTATE_270 = 270° antihorario
    #                = 90° horario
    # =========================================================================

    image = image.transpose(
        Image.Transpose.ROTATE_90
    )

    image = image.transpose(
        Image.Transpose.FLIP_LEFT_RIGHT
    )

    image = image.resize(
        (640, 480),
        Image.Resampling.LANCZOS,
    )


    # =========================================================================
    # 3. Guardar la imagen YA ROTADA para /debug/camera
    # =========================================================================

    debug_buffer = BytesIO()

    image.save(
        debug_buffer,
        format="JPEG",
        quality=90,
    )

    latest_frame = debug_buffer.getvalue()


    # =========================================================================
    # 4. Dimensiones de imagen rotada
    # =========================================================================

    image_width, image_height = image.size


    # =========================================================================
    # 5. Inferencia
    # =========================================================================

    results = model.predict(
        source=image,
        conf=CONFIDENCE_THRESHOLD,
        device=DEVICE,
        imgsz=640,
        verbose=False,
    )


    # =========================================================================
    # 6. Lista de detecciones
    # =========================================================================

    detections = []


    for result in results:

        names = result.names

        if result.boxes is None:
            continue


        for box in result.boxes:

            class_id = int(
                box.cls[0]
            )

            confidence = float(
                box.conf[0]
            )


            x1, y1, x2, y2 = map(
                float,
                box.xyxy[0]
            )


            detections.append(
                {
                    "label": names[class_id],

                    "confidence": round(
                        confidence,
                        4
                    ),

                    "bbox": {
                        "x1": round(x1, 2),
                        "y1": round(y1, 2),
                        "x2": round(x2, 2),
                        "y2": round(y2, 2),
                    },

                    "relative_position": None,
                }
            )


    # =========================================================================
    # 7. Determinar posición relativa
    # =========================================================================

    for detection in detections:

        bbox = detection["bbox"]


        object_center_x = (
            bbox["x1"]
            +
            bbox["x2"]
        ) / 2


        detection["relative_position"] = image_position(
            object_center_x=object_center_x,
            image_width=image_width,
        )


        detection.pop(
            "bbox"
        )


    # =========================================================================
    # 8. Resultado
    # =========================================================================

    return {

        "model_name": "yoloe-11l-seg",

        "model_version": "v1",

        "image_width": image_width,

        "image_height": image_height,

        "inference_time_ms": int(
            (
                time.perf_counter()
                -
                started_at
            )
            *
            1000
        ),

        "detections": detections,
    }