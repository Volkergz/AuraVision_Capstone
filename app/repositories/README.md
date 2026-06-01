# Repositorios

## Descripción
Esta carpeta contiene los repositorios (Data Access Objects) que encapsulan toda la lógica de acceso a datos. Utilizan patrones CRUD (Create, Read, Update, Delete).

## Repositorios Disponibles

### `usuario_repositorio.py`
Acceso a datos de usuarios.

**Métodos:**
- `crear_usuario()`: Crear nuevo usuario
- `obtener_usuario_por_id()`: Obtener usuario por ID
- `obtener_todos_los_usuarios()`: Listar todos los usuarios
- `actualizar_usuario()`: Actualizar datos del usuario
- `eliminar_usuario()`: Eliminar usuario
- `obtener_usuario_por_nombre()`: Buscar usuario por nombre

### `dispositivo_repositorio.py`
Acceso a datos de dispositivos.

**Métodos:**
- `crear_dispositivo()`: Crear nuevo dispositivo
- `obtener_dispositivo_por_id()`: Obtener dispositivo por ID
- `obtener_dispositivos_por_usuario()`: Listar dispositivos de un usuario
- `actualizar_dispositivo()`: Actualizar datos del dispositivo
- `eliminar_dispositivo()`: Eliminar dispositivo

### `configuracion_repositorio.py`
Acceso a datos de configuraciones.

**Métodos:**
- `crear_configuracion()`: Crear nueva configuración
- `obtener_configuracion_por_usuario()`: Obtener configuración de un usuario
- `actualizar_configuracion()`: Actualizar configuración
- `eliminar_configuracion()`: Eliminar configuración

### `sensor_repositorio.py`
Acceso a datos de sensores.

**Métodos:**
- `crear_sensor()`: Crear nuevo sensor
- `obtener_sensor_por_id()`: Obtener sensor por ID
- `obtener_sensores_por_dispositivo()`: Listar sensores de un dispositivo
- `actualizar_sensor()`: Actualizar datos del sensor
- `eliminar_sensor()`: Eliminar sensor