import asyncio
import json

import cv2
import websockets


WS_URL = "ws://127.0.0.1:8001/api/ws/image"

CAMERA_INDEX = 0
FRAME_WIDTH = 640
FRAME_HEIGHT = 480
JPEG_QUALITY = 80
SECONDS_BETWEEN_PREDICTIONS = 1


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
            print(f"Conectado a {WS_URL}")
            print("Presiona Q en la ventana de cámara para terminar.")

            while True:
                ok, frame = camera.read()

                if not ok:
                    print("No fue posible capturar un frame.")
                    break

                cv2.imshow("AuraVision - Cámara de prueba", frame)

                key = cv2.waitKey(1) & 0xFF
                if key == ord("q"):
                    break

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

                print(json.dumps(
                    resultado,
                    ensure_ascii=False,
                    indent=2,
                ))

                await asyncio.sleep(SECONDS_BETWEEN_PREDICTIONS)

    except ConnectionRefusedError:
        print("No se pudo conectar a vision_service.")
        print("Verifica que Docker Compose esté ejecutándose.")

    except Exception as error:
        print(f"Error: {error}")

    finally:
        camera.release()
        cv2.destroyAllWindows()


if __name__ == "__main__":
    asyncio.run(probar_camara())