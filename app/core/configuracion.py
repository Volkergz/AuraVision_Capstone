from pydantic_settings import BaseSettings, SettingsConfigDict


class Configuracion(BaseSettings):
    """
    Configuración global de la aplicación.

    Los valores se obtienen desde las variables
    de entorno o desde el archivo .env.
    """

    # ---------------------------------------------------------
    # INFORMACIÓN DE LA APLICACIÓN
    # ---------------------------------------------------------

    # Información general de la aplicación
    app_nombre: str = "Aura Vision API"
    app_version: str = "1.0.0"
    app_debug: bool = True

    # ---------------------------------------------------------
    # BASE DE DATOS
    # ---------------------------------------------------------

    # Configuración de PostgreSQL
    database_url: str

    # ---------------------------------------------------------
    # JWT
    # ---------------------------------------------------------

    # Configuración JWT
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"

    # Tiempo de vida del Access Token
    access_token_expire_minutes: int = 15

    # Tiempo de vida del Refresh Token
    refresh_token_expire_days: int = 7

    # ---------------------------------------------------------
    # CONFIGURACIÓN DE PYDANTIC
    # ---------------------------------------------------------

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

# Instancia única de configuración.
#
# El resto de la aplicación importará esta instancia
# en lugar de crear nuevas configuraciones.
configuracion = Configuracion()