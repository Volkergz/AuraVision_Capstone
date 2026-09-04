import os


# Configuracion del modelo y gpu
DEVICE = os.getenv("DEVICE", "cuda:0")

CONFIDENCE_THRESHOLD = float(
    os.getenv("CONFIDENCE_THRESHOLD", "0.85")
)

MODEL_PATH = os.getenv(
    "MODEL_PATH",
    "/models/yoloe-11l-seg.pt",
)