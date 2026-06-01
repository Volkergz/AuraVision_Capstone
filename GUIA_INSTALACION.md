# Guía de Configuración Rápida

## Instalación Rápida

### 1. Crear Entorno Virtual
```bash
python --3.11 -m venv venv
venv\Scripts\activate.ps1  # En Windows
# source venv/bin/activate  # En Linux/Mac
```

### 2. Instalar Dependencias
```bash
pip install -r requirements.txt
```

### 3. Configurar Variable de Entorno
```bash
cp .env.example .env
# Editar .env con tu configuración de PostgreSQL
```

### 4. Crear Base de Datos en PostgreSQL
```sql
-- Conectarse a PostgreSQL como admin
psql -U postgres

-- Crear base de datos
CREATE DATABASE auravision;

-- Salir
\q
```

## Estructura Completada

```
AuraVision_Back_2.0/
├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── endpoints/
│   │   │    ├── __init__.py
│   │   │    ├── usuarios.py         ✅ CRUD usuarios
│   │   │    ├── dispositivos.py     ✅ CRUD dispositivos
│   │   │    ├── configuraciones.py  ✅ CRUD configuraciones
│   │   │    ├── sensores.py         ✅ CRUD sensores
│   │   │    └── README.md
│   │   └── rutas.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── configuracion.py        ✅ Config central
│   │   └── README.md
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py                 ✅ Conexión BD
│   │   └── README.md
│   ├── models/
│   │   ├── __init__.py
│   │   ├── usuario.py              ✅ Modelo Usuario
│   │   ├── dispositivo.py          ✅ Modelo Dispositivo
│   │   ├── configuracion.py        ✅ Modelo Configuración
│   │   ├── sensor.py               ✅ Modelo Sensor
│   │   └── README.md
│   ├── repositories/
│   │   ├── __init__.py
│   │   ├── usuario_repositorio.py      ✅ DAO Usuario
│   │   ├── dispositivo_repositorio.py  ✅ DAO Dispositivo
│   │   ├── configuracion_repositorio.py ✅ DAO Configuración
│   │   ├── sensor_repositorio.py       ✅ DAO Sensor
│   │   └── README.md
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── usuario_esquema.py          ✅ Validación Usuario
│   │   ├── dispositivo_esquema.py      ✅ Validación Dispositivo
│   │   ├── configuracion_esquema.py    ✅ Validación Configuración
│   │   ├── sensor_esquema.py           ✅ Validación Sensor
│   │   └── README.md
│   └── services/
│       ├── __init__.py
│       ├── usuario_servicio.py         ✅ Servicio Usuario
│       ├── dispositivo_servicio.py     ✅ Servicio Dispositivo
│       ├── configuracion_servicio.py   ✅ Servicio Configuración
│       ├── sensor_servicio.py          ✅ Servicio Sensor
│       └── README.md
├── main.py                         ✅ FastAPI app
├── requirements.txt                ✅ Dependencias
├── .env.example                    ✅ Variables de ejemplo
└── README.md                       ✅ Documentación

```

## Características Implementadas

✅ **4 Modelos Completos**
   - Usuario
   - Dispositivo
   - Configuración
   - Sensor

✅ **4 Esquemas Pydantic**
   - Validación de entrada/salida
   - Documentación automática

✅ **4 Repositorios**
   - Patrón DAO
   - Operaciones CRUD
   - Métodos especializados

✅ **4 Servicios**
   - Lógica de negocio
   - Validaciones complejas
   - Orchestración de datos

✅ **4 Endpoints REST**
   - Rutas API
   - Documentación Swagger
   - Manejo de errores

## Notas Importantes

1. **Conexión a PostgreSQL**: Asegúrate que PostgreSQL esté ejecutándose
2. **Variables de Entorno**: Copia `.env.example` a `.env` y configura
3. **Base de Datos**: Crea la BD manualmente o usa un cliente PostgreSQL
4. **Python 3.11+**: Requiere Python 3.11 o superior

---

**Creado:** 2026-05-31
**Versión:** 2.0.0
**Estado:** ✅ Completado
