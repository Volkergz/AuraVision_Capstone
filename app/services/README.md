# Servicios

## Descripción
Esta carpeta contiene la lógica de negocio de la aplicación. Los servicios encapsulan la lógica compleja y coordinan entre repositorios.

## Servicios Disponibles

### `usuario_servicio.py`
Lógica de negocio para usuarios.

**Métodos:**
- `crear_usuario_con_configuracion()`: Crear usuario con configuración por defecto
- `obtener_perfil_usuario()`: Obtener perfil completo del usuario
- `actualizar_perfil_usuario()`: Actualizar perfil
- `eliminar_usuario_completamente()`: Eliminar usuario y todos sus datos

### `dispositivo_servicio.py`
Lógica de negocio para dispositivos.

**Métodos:**
- `registrar_nuevo_dispositivo()`: Registrar dispositivo con validaciones
- `obtener_dispositivos_usuario()`: Obtener dispositivos con sensores
- `actualizar_estado_conexion()`: Actualizar estado de conexión
- `obtener_dispositivo_completo()`: Obtener dispositivo con todos sus sensores

### `configuracion_servicio.py`
Lógica de negocio para configuraciones.

**Métodos:**
- `aplicar_configuracion_predeterminada()`: Aplicar configuración por defecto
- `obtener_configuracion_usuario()`: Obtener configuración con validaciones
- `actualizar_configuracion_usuario()`: Actualizar con validaciones

### `sensor_servicio.py`
Lógica de negocio para sensores.

**Métodos:**
- `calibrar_sensor()`: Calibrar sensor
- `obtener_sensores_dispositivo()`: Obtener sensores con validaciones
- `cambiar_estado_sensor()`: Cambiar estado del sensor