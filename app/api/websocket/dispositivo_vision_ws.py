import asyncio
import json
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone

from fastapi import WebSocket, WebSocketDisconnect
from sqlalchemy import select

from app.core.configuracion import configuracion
from app.core.seguridad import decodificar_access_token
from app.db.sesion import SessionLocal
from app.models.deteccion import Deteccion
from app.models.sesion import Sesion
from app.models.sesion_dispositivo import SesionDispositivo


MAX_IMAGE_SIZE = 8 * 1024 * 1024
def _consultar_autorizacion(token: str, dispositivo_id: uuid.UUID):
    payload = decodificar_access_token(token)
    if not payload or payload.get("type") != "access":
        return None

    try:
        usuario_id = uuid.UUID(payload["sub"])
        sesion_id = uuid.UUID(payload["sid"])
    except (KeyError, ValueError, TypeError):
        return None

    db = SessionLocal()
    try:
        sesion = db.scalar(select(Sesion).where(
            Sesion.id_sesion == sesion_id,
            Sesion.id_usuario_fk == usuario_id,
            Sesion.revocada.is_(False),
        ))
        vinculacion = db.scalar(select(SesionDispositivo).where(
            SesionDispositivo.id_usuario_fk == usuario_id,
            SesionDispositivo.id_dispositivo_fk == dispositivo_id,
            SesionDispositivo.activa.is_(True),
        ))
        if not sesion or not vinculacion:
            return None
        if sesion.fecha_expiracion <= datetime.now(timezone.utc):
            return None
        return usuario_id
    finally:
        db.close()


def _enviar_a_vision(image_bytes: bytes) -> dict:
    boundary = "----AuraVisionBoundary"
    body = (
        f"--{boundary}\r\n"
        "Content-Disposition: form-data; name=\"file\"; filename=\"frame.jpg\"\r\n"
        "Content-Type: image/jpeg\r\n\r\n"
    ).encode() + image_bytes + f"\r\n--{boundary}--\r\n".encode()
    request = urllib.request.Request(
        f"{configuracion.vision_service_url.rstrip('/')}/api/predict",
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read())


def _guardar_detecciones(
    usuario_id: uuid.UUID,
    dispositivo_id: uuid.UUID,
    resultado: dict,
) -> None:
    detecciones = resultado.get("detections", [])
    if not detecciones:
        return

    db = SessionLocal()
    try:
        for deteccion in detecciones:
            confianza = float(deteccion.get("confidence", 0))
            if confianza < configuracion.confidence_threshold:
                continue

            db.add(Deteccion(
                id_usuario_fk=usuario_id,
                id_dispositivo_fk=dispositivo_id,
                tipo_objeto=str(deteccion.get("label", "desconocido")),
                descripcion=f"Detectado: {deteccion.get('label', 'desconocido')}",
                confianza=confianza,
            ))
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


async def dispositivo_vision(websocket: WebSocket, dispositivo_id: uuid.UUID):
    token = websocket.query_params.get("token")
    usuario_id = await asyncio.to_thread(
        _consultar_autorizacion,
        token or "",
        dispositivo_id,
    )
    if not usuario_id:
        await websocket.close(code=1008, reason="Token o sesión de dispositivo inválida")
        return

    await websocket.accept()
    try:
        while True:
            image_bytes = await websocket.receive_bytes()
            if not image_bytes or len(image_bytes) > MAX_IMAGE_SIZE:
                await websocket.send_json({"ok": False, "error": "Imagen inválida"})
                continue

            try:
                resultado = await asyncio.to_thread(_enviar_a_vision, image_bytes)
                await asyncio.to_thread(
                    _guardar_detecciones,
                    usuario_id,
                    dispositivo_id,
                    resultado,
                )
                await websocket.send_json({
                    "ok": True,
                    "id_dispositivo": str(dispositivo_id),
                    "resultado": resultado,
                })
            except (OSError, urllib.error.URLError, ValueError):
                await websocket.send_json({
                    "ok": False,
                    "error": "No fue posible procesar la imagen",
                })
    except WebSocketDisconnect:
        pass