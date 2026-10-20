import asyncio
import json
from urllib.parse import urlencode

import cv2
import websockets


HOST = "191.237.250.3"
PORT = 8000
DISPOSITIVO_ID = "5a766537-72eb-498e-8a82-fd4a2aaef2b1"
ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNTU0OTkzMy1jMmUwLTRkZmUtYmM0Ni1lMjEyZWFkODRlZjUiLCJzaWQiOiJmYzIzNWRhMS0yYzNjLTQ2YTktYWFiZS03YjlmNWQ2ZWZmMjkiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzg5MTU4OTg2LCJleHAiOjE3ODkxNTk4ODYsImp0aSI6IjBhMmUxMjUzLTFjYjEtNGM0ZC1hNGM5LTk1YmRkYTc3ZTg3OCJ9.zFKvI_YIFuwSBG4UmTJFgZZqbrUzjGR0o7uBgM6oF8g"

WS_PATH = f"/api/v1/ws/dispositivos/{DISPOSITIVO_ID}/vision"
WS_URL = f"ws://{HOST}:{PORT}{WS_PATH}?{urlencode({'token': ACCESS_TOKEN})}"

CAMERA_INDEX = 0
FRAME_WIDTH = 640
FRAME_HEIGHT = 480
JPEG_QUALITY = 80
SECONDS_BETWEEN_PREDICTIONS = 1
WINDOW_NAME = "AuraVision - Camara remota"


def dibujar_detecciones(frame, respuesta):
    resultado = respuesta.get("resultado", {})

    for deteccion in resultado.get("detections", []):
        bbox = deteccion.get("bbox", {})
        if not all(key in bbox for key in ("x1", "y1", "x2", "y2")):
            continue

        x1 = int(bbox["x1"])
        y1 = int(bbox["y1"])
        x2 = int(bbox["x2"])
        y2 = int(bbox["y2"])
        etiqueta = deteccion.get("label", "objeto")
        confianza = float(deteccion.get("confidence", 0))
        posicion = deteccion.get("relative_position")
        texto = f"{etiqueta} {confianza:.2f}"

        if posicion:
            texto += f" | {posicion}"

        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 220, 0), 2)
        cv2.putText(
            frame,
            texto,
            (x1, max(y1 - 10, 20)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.55,
            (0, 220, 0),
            2,
            cv2.LINE_AA,
        )

    return frame


async def probar_camara():
    camera = cv2.VideoCapture(CAMERA_INDEX, cv2.CAP_MSMF)

    camera.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)

    if not camera.isOpened():
        print("No se pudo abrir la cámara.")
        print("Prueba CAMERA_INDEX = 1 si tienes más de una cámara.")
        return

    try:
        async with websockets.connect(
            WS_URL,
            max_size=10 * 1024 * 1024,
        ) as websocket:
            print(f"Conectado a {WS_URL.split('?token=')[0]}?token=***")
            print("Presiona Q en la ventana de cámara para terminar.")

            while True:
                ok, frame = camera.read()

                if not ok:
                    print("No fue posible capturar un frame.")
                    break

                frame_mostrado = frame.copy()

                encoded_ok, encoded_frame = cv2.imencode(
                    ".jpg",
                    frame,
                    [
                        cv2.IMWRITE_JPEG_QUALITY,
                        JPEG_QUALITY,
                    ],
                )

                if not encoded_ok:
                    print("No se pudo convertir el frame a JPEG.")
                    continue

                image_bytes = encoded_frame.tobytes()

                await websocket.send(image_bytes)

                respuesta = await websocket.recv()
                resultado = json.loads(respuesta)

                if resultado.get("ok"):
                    frame_mostrado = dibujar_detecciones(frame_mostrado, resultado)

                cv2.imshow(WINDOW_NAME, frame_mostrado)
                key = cv2.waitKey(1) & 0xFF
                if key in (ord("q"), 27):
                    break

                print(json.dumps(
                    resultado,
                    ensure_ascii=False,
                    indent=2,
                ))

                await asyncio.sleep(SECONDS_BETWEEN_PREDICTIONS)

    except websockets.InvalidStatus as error:
        print(f"El servidor rechazó el handshake WebSocket: {error}")
        print("Revisa la ruta, el token y la vinculación activa del dispositivo.")

    except ConnectionRefusedError:
        print("No se pudo conectar al backend remoto.")
        print("Revisa IP, puerto, firewall y que el backend esté ejecutándose.")

    except TimeoutError:
        print("Tiempo agotado al conectar con el backend remoto.")

    except Exception as error:
        print(f"Error: {error}")

    finally:
        camera.release()
        cv2.destroyAllWindows()


if __name__ == "__main__":
    asyncio.run(probar_camara())