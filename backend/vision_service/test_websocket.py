import asyncio
import json

import websockets


WS_URL = "ws://127.0.0.1:8001/api/ws/test"


async def probar_websocket():
    try:
        async with websockets.connect(WS_URL) as websocket:
            print(f"Conectado a {WS_URL}")

            mensaje = "Hola desde el cliente de prueba"

            await websocket.send(mensaje)
            print(f"Enviado: {mensaje}")

            respuesta = await websocket.recv()
            respuesta_json = json.loads(respuesta)

            print("Respuesta del servidor:")
            print(json.dumps(
                respuesta_json,
                indent=2,
                ensure_ascii=False,
            ))

    except ConnectionRefusedError:
        print("No se pudo conectar. ¿Está encendido vision_service?")

    except Exception as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    asyncio.run(probar_websocket())