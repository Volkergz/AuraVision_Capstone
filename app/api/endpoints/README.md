# app/api/endpoints

Contiene los módulos que implementan cada conjunto de rutas (endpoints) expuestos por la API.

Archivos típicos:
- `alerts.py`: endpoints relacionados con alertas.
- `auth.py`: endpoints de autenticación y autorización.
- `devices.py`: gestión de dispositivos.
- `events.py`: creación y consulta de eventos.
- `health.py`: chequeos de componentes.
- `sync.py`: sincronizaciones o integraciones externas.
- `users.py`: gestión de usuarios.

Responsabilidad: convertir peticiones HTTP en llamadas a servicios de la aplicación y devolver respuestas con el formato apropiado.