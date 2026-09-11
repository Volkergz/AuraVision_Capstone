import time
from io import BytesIO

from PIL import Image

from app.config import CONFIDENCE_THRESHOLD, DEVICE


def _relative_position(
    object_center_x: float,
    person_center_x: float,
    image_width: int,
) -> str:
    tolerance = image_width * 0.1
    difference = object_center_x - person_center_x

    if difference < -tolerance:
        return "frente_izquierda"
    if difference > tolerance:
        return "frente_derecha"
    return "frente"


def _image_position(object_center_x: float, image_width: int) -> str:
    tolerance = image_width * 0.1
    difference = object_center_x - (image_width / 2)

    if difference < -tolerance:
        return "frente_izquierda"
    if difference > tolerance:
        return "frente_derecha"
    return "frente"


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
                    "relative_position": None,
                }
            )

    people = [
        detection
        for detection in detections
        if detection["label"] == "person"
    ]

    if people:
        person = max(people, key=lambda detection: detection["confidence"])
        person_bbox = person["bbox"]
        person_center_x = (person_bbox["x1"] + person_bbox["x2"]) / 2

        for detection in detections:
            if detection["label"] == "person":
                detection_bbox = detection["bbox"]
                detection_center_x = (
                    detection_bbox["x1"] + detection_bbox["x2"]
                ) / 2
                detection["relative_position"] = _image_position(
                    object_center_x=detection_center_x,
                    image_width=image_width,
                )
                continue

            bbox = detection["bbox"]
            object_center_x = (bbox["x1"] + bbox["x2"]) / 2
            detection["relative_position"] = _relative_position(
                object_center_x=object_center_x,
                person_center_x=person_center_x,
                image_width=image_width,
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