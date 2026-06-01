# Modelos

## Descripción
Esta carpeta contiene todos los modelos SQLAlchemy que representan las tablas de la base de datos PostgreSQL.

## Tablas Disponibles

### `usuario.py`
Modelo para la tabla `usuarios`. Representa los usuarios del sistema.

**Campos:**
- `id_usuario` (bigserial): ID único del usuario
- `nombre` (varchar): Nombre del usuario
- `apellido` (varchar): Apellido del usuario
- `fecha_creacion` (timestamptz): Fecha de creación
- `estado` (boolean): Indica si el usuario está activo

### `dispositivo.py`
Modelo para la tabla `dispositivos`. Representa los dispositivos asociados a usuarios.

**Campos:**
- `id_dispositivo` (bigserial): ID único del dispositivo
- `id_usuario_fk` (bigint): Referencia al usuario propietario
- `nombre` (varchar): Nombre del dispositivo
- `codigo_dispositivo` (varchar): Código único del dispositivo
- `p_bateria` (int): Porcentaje de batería (0-100)
- `tiempo_restante_min` (int): Minutos restantes de batería
- `estado_conexion` (varchar): Estado de conexión del dispositivo
- `fecha_registro` (timestamptz): Fecha de registro

### `configuracion.py`
Modelo para la tabla `configuraciones`. Almacena configuraciones personalizadas de los usuarios.

**Campos:**
- `id_configuracion` (bigserial): ID única
- `id_usuario_fk` (bigint): Referencia al usuario
- `intensidad_haptica` (int): Intensidad del feedback háptico (0-100)
- `volumen_audio` (int): Volumen de audio (0-100)
- `modo_audio` (varchar): Modo de audio
- `auto_conexion` (boolean): Activar conexión automática
- `fecha_actualizado` (timestamptz): Fecha de última actualización

### `sensor.py`
Modelo para la tabla `sensores`. Representa los sensores de los dispositivos.

**Campos:**
- `id_sensor` (bigserial): ID única del sensor
- `id_dispositivo_fk` (bigint): Referencia al dispositivo
- `tipo_sensor` (varchar): Tipo de sensor
- `ubicacion` (varchar): Ubicación del sensor en el dispositivo
- `estado` (varchar): Estado del sensor
- `rango_min_cm` (numeric): Rango mínimo en centímetros
- `rango_max_cm` (numeric): Rango máximo en centímetros
- `fecha_registro` (timestamptz): Fecha de registro