from pydantic_settings import BaseSettings, SettingsConfigDict


class Configuracion(BaseSettings):
    """
    Configuración general de AURA Vision.

    Los valores se obtienen desde las variables
    de entorno definidas en el archivo .env.
    """

    # ---------------------------------------------------------
    # INFORMACIÓN DE LA APLICACIÓN
    # ---------------------------------------------------------

    app_nombre: str = "Aura Vision API"

    app_version: str = "1.0.0"

    app_debug: bool = True

    # ---------------------------------------------------------
    # BASE DE DATOS
    # ---------------------------------------------------------

    database_url: str

    # ---------------------------------------------------------
    # JWT
    # ---------------------------------------------------------

    # Clave utilizada para firmar Access Tokens.
    jwt_secret_key: str

    # Clave independiente para Refresh Tokens.
    jwt_refresh_secret_key: str

    # Algoritmo utilizado para firmar los JWT.
    jwt_algorithm: str = "HS256"

    # Tiempo de vida del Access Token.
    access_token_expire_minutes: int = 15

    # Tiempo de vida del Refresh Token.
    refresh_token_expire_days: int = 7

    # ---------------------------------------------------------
    # CONFIGURACIÓN DE PYDANTIC
    # ---------------------------------------------------------

    model_config = SettingsConfigDict(
        env_file=".env",
        extra = "ignore",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


# Instancia global de configuración.
configuracion = Configuracion()