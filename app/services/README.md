# app/services

Contiene la lógica de negocio de la aplicación: clases o funciones que orquestan operaciones entre `repositories`, `models` y otras partes del sistema.

Responsabilidades:
- Implementar las reglas de negocio.
- Coordinar transacciones y llamadas a repositorios.
- Preparar datos para la capa de `api`.

Ejemplos: `user_service.py`, `auth_service.py`, `device_service.py`, `event_service.py`, `alert_service.py`.