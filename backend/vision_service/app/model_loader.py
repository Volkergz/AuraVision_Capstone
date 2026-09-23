from ultralytics import YOLO

from app.config import DEVICE, MODEL_PATH

URBAN_MOBILITY_CLASSES = [
    "person",
    "chair",
    "table",
    "stairs",
    "door",
    "car",
    "bus",
    "truck",
    "bicycle",
    "motorcycle",
    "electric scooter",
    "traffic light",
    "crosswalk",
    "pole",
    "trash can",
]

# Carga el modelo de visiona artificial
def load_model():
    model = YOLO(MODEL_PATH)

    model.set_classes(
        URBAN_MOBILITY_CLASSES,
        model.get_text_pe(URBAN_MOBILITY_CLASSES),
    )

    model.to(DEVICE)

    return model