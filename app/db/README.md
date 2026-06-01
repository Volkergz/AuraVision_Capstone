# app/db

Módulo responsable de la conexión y la sesión con la base de datos.

Archivos típicos:
- `base.py`: clases base para ORM (p. ej. `Base` de SQLAlchemy).
- `session.py`: creación y gestión de la sesión/engine.

Propósito: encapsular la configuración de la capa de persistencia y facilitar la inicialización/uso de la base de datos en la aplicación y en pruebas.