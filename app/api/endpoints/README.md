# API Endpoints

## Descripción
Esta carpeta contiene todos los endpoints REST de la API. Cada archivo representa un recurso (usuarios, dispositivos, etc.).

## Endpoints Disponibles

### `usuarios.py`
Endpoints para gestionar usuarios.

**Rutas:**
- `POST /api/usuarios/` - Crear nuevo usuario
- `GET /api/usuarios/{usuario_id}` - Obtener usuario por ID
- `GET /api/usuarios/` - Listar todos los usuarios
- `PUT /api/usuarios/{usuario_id}` - Actualizar usuario
- `DELETE /api/usuarios/{usuario_id}` - Eliminar usuario
- `GET /api/usuarios/{usuario_id}/perfil` - Obtener perfil completo

### `dispositivos.py`
Endpoints para gestionar dispositivos.

**Rutas:**
- `POST /api/dispositivos/` - Registrar nuevo dispositivo
- `GET /api/dispositivos/{dispositivo_id}` - Obtener dispositivo por ID
- `GET /api/usuarios/{usuario_id}/dispositivos/` - Listar dispositivos de usuario
- `PUT /api/dispositivos/{dispositivo_id}` - Actualizar dispositivo
- `DELETE /api/dispositivos/{dispositivo_id}` - Eliminar dispositivo
- `PATCH /api/dispositivos/{dispositivo_id}/conexion` - Actualizar estado de conexión
- `PATCH /api/dispositivos/{dispositivo_id}/bateria` - Actualizar batería

### `configuraciones.py`
Endpoints para gestionar configuraciones.

**Rutas:**
- `POST /api/configuraciones/` - Crear configuración
- `GET /api/usuarios/{usuario_id}/configuracion` - Obtener configuración
- `PUT /api/configuraciones/{config_id}` - Actualizar configuración
- `GET /api/configuraciones/presets/` - Obtener presets disponibles
- `POST /api/configuraciones/{config_id}/preset/{nombre}` - Aplicar preset

### `sensores.py`
Endpoints para gestionar sensores.

**Rutas:**
- `POST /api/sensores/` - Crear nuevo sensor
- `GET /api/sensores/{sensor_id}` - Obtener sensor por ID
- `GET /api/dispositivos/{dispositivo_id}/sensores/` - Listar sensores de dispositivo
- `PUT /api/sensores/{sensor_id}` - Actualizar sensor
- `DELETE /api/sensores/{sensor_id}` - Eliminar sensor
- `PATCH /api/sensores/{sensor_id}/estado` - Cambiar estado del sensor

## Códigos de Respuesta

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: código duplicado) |
| 500 | Internal Server Error - Error del servidor |