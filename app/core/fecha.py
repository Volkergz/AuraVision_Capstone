from datetime import datetime
from zoneinfo import ZoneInfo


ZONA_HORARIA_CHILE = ZoneInfo("America/Santiago")


def ahora_chile() -> datetime:
    """Devuelve la fecha y hora actual de Santiago de Chile."""
    return datetime.now(ZONA_HORARIA_CHILE)
