from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        description="TrustLens verification API (MVP — mocked analysis)",
        version="0.1.0",
        debug=settings.debug,
    )

    allow_origins = settings.cors_origin_list
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allow_origins,
        allow_credentials="*" not in allow_origins,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router)

    return app


app = create_app()
