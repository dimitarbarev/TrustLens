from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "TrustLens"
    app_env: str = "development"
    debug: bool = True

    host: str = "127.0.0.1"
    port: int = 8000

    # Comma-separated list. Use "*" to allow any origin (extension dev).
    cors_origins: str = "http://localhost:3000"

    verification_mode: str = "mock"

    @property
    def cors_origin_list(self) -> list[str]:
        origins = [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]
        if not origins:
            return ["*"]
        if "*" in origins:
            return ["*"]
        return origins


@lru_cache
def get_settings() -> Settings:
    return Settings()
