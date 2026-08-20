import time
from io import BytesIO

from PIL import Image

from app.config import CONFIDENCE_THRESHOLD, DEVICE


def predict_image(model, image_bytes: bytes) -> dict:
    started_at = time.perf_counter()

    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image_width, image_height = image.size

    results = model.predict(
        source=image,
        conf=CONFIDENCE_THRESHOLD,
        device=DEVICE,
        imgsz=640,
        verbose=False,
    )

    detections = []

    for result in results:
        names = result.names

        if result.boxes is None:
            continue

        for box in result.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            x1, y1, x2, y2 = map(float, box.xyxy[0])

            detections.append(
                {
                    "label": names[class_id],
                    "confidence": round(confidence, 4),
                    "bbox": {
                        "x1": round(x1, 2),
                        "y1": round(y1, 2),
                        "x2": round(x2, 2),
                        "y2": round(y2, 2),
                    },
                }
            )

    return {
        "model_name": "yoloe-11l-seg",
        "model_version": "v1",
        "image_width": image_width,
        "image_height": image_height,
        "inference_time_ms": int(
            (time.perf_counter() - started_at) * 1000
        ),
        "detections": detections,
    }