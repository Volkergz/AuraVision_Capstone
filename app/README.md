# app

Carpeta principal de la aplicación.
Contiene la lógica de la aplicación organizada en subpaquetes: `api`, `core`, `db`, `models`, `repositories`, `schemas` y `services`.

Resumen breve:
- `api/`: rutas y endpoints HTTP.
- `core/`: configuración y utilidades de aplicación (p. ej. `config.py`, `security.py`).
- `db/`: inicialización y sesión de la base de datos.
- `models/`: modelos ORM.
- `repositories/`: capa de acceso a datos (abstracciones sobre los modelos).
- `schemas/`: esquemas Pydantic / DTOs para validación y serialización.
- `services/`: lógica de negocio y orquestación entre repositorios y modelos.

Objetivo: centralizar y documentar la estructura para facilitar mantenimiento y contribuciones.