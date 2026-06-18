# TrustLens Backend

Python FastAPI service that accepts verification requests from the browser extension and returns structured results.

## Status

**MVP implemented** — health and verify endpoints with in-memory mock verification.

## Structure

```
backend/
├── app/
│   ├── api/           # Route handlers (health, verify)
│   ├── core/          # Settings and shared configuration
│   ├── models/        # Pydantic response models
│   ├── services/      # Verification orchestration (mock → AI later)
│   └── main.py        # FastAPI application factory
└── tests/
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Service health check |
| POST | `/api/verify` | Verify text and/or image (multipart form) |

### POST `/api/verify`

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | No* | Claim or post text |
| `image` | file | No* | Image to analyze |
| `imageContext` | string | No | Hint: `chart`, `map`, `screenshot`, or `unknown` |

\* At least one of `text` or `image` is required.

**Privacy:** Uploaded images and text are processed in memory only and are not stored.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Run

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Interactive docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | TrustLens | Shown in health response |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins; use `*` for extension dev |
| `VERIFICATION_MODE` | `mock` | `mock` only in MVP |

## Future Integration Points

See comments in `app/services/verification_service.py`:

- **Phase 2:** Gemini multimodal analysis
- **Phase 3:** OCR and chart/map/diagram parsing
- **Phase 4:** Evidence search and real sources

## Related Docs

- [Shared verification contract](../shared/api-contracts/verification-result.md)
- [Architecture](../docs/ARCHITECTURE.md)
