# Base de Datos

## Descripción
Esta carpeta contiene la configuración y gestión de la conexión a la base de datos PostgreSQL.

## Archivos

### `base.py`
Define la clase base para los modelos SQLAlchemy y la configuración de la sesión de base de datos.

- **Base**: Clase declarativa que sirve como base para todos los modelos ORM
- **engine**: Configuración del motor de conexión a PostgreSQL
- **SessionLocal**: Factory para crear sesiones de base de datos
