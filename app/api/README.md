# app/api

Contiene la configuración del enrutamiento de la API y los módulos de endpoints.

Estructura:
- `router.py`: definición de routers principales y montaje de subrouters.
- `endpoints/`: módulos que agrupan endpoints por recurso (usuarios, dispositivos, eventos, alertas, autenticación, etc.).

Propósito: mantener separada la capa de transporte HTTP de la lógica de negocio, facilitando pruebas y mantenibilidad.