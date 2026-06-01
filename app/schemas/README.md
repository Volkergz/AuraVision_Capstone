# Esquemas

## Descripción
Esta carpeta contiene todos los esquemas Pydantic para validación de datos en requests y responses.

## Esquemas Disponibles

### `usuario_esquema.py`
Esquemas para validación de datos de usuarios.

**Clases:**
- `UsuarioBase`: Datos básicos del usuario
- `UsuarioCrear`: Validación para crear usuario
- `UsuarioActualizar`: Validación para actualizar usuario
- `UsuarioRespuesta`: Modelo de respuesta

### `dispositivo_esquema.py`
Esquemas para validación de datos de dispositivos.

**Clases:**
- `DispositivoBase`: Datos básicos del dispositivo
- `DispositivoCrear`: Validación para crear dispositivo
- `DispositivoActualizar`: Validación para actualizar dispositivo
- `DispositivoRespuesta`: Modelo de respuesta

### `configuracion_esquema.py`
Esquemas para validación de configuraciones.

**Clases:**
- `ConfiguracionBase`: Datos básicos de configuración
- `ConfiguracionCrear`: Validación para crear configuración
- `ConfiguracionActualizar`: Validación para actualizar configuración
- `ConfiguracionRespuesta`: Modelo de respuesta

### `sensor_esquema.py`
Esquemas para validación de datos de sensores.

**Clases:**
- `SensorBase`: Datos básicos del sensor
- `SensorCrear`: Validación para crear sensor
- `SensorActualizar`: Validación para actualizar sensor
- `SensorRespuesta`: Modelo de respuesta