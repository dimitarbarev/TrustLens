# TrustLens Browser Extension

Chrome extension (Manifest V3) built with **Plasmo**, **React**, **TypeScript**, and **Tailwind CSS**.

## Status

**MVP connected** — popup sends verification requests to the local FastAPI backend and displays mocked results.

## MVP Flow

1. User opens the popup and pastes suspicious post text and/or uploads an image.
2. User optionally describes what the image shows (`imageContext`).
3. User clicks **Verify Post**.
4. Extension sends `multipart/form-data` to `POST /api/verify`.
5. Backend returns a mocked verification result.
6. Extension displays trust score, verdict, risk level, explanation, detected claims, image analysis summary, and sources.

Nothing is stored on the backend. Selected text from the context menu is held briefly in `chrome.storage.session` only until the popup opens, then cleared.

## Structure

```
extension/
├── src/
│   ├── popup.tsx          # Popup UI
│   ├── background.ts      # Context menu foundation
│   ├── hooks/             # Verification state and actions
│   ├── components/        # Reusable UI components
│   ├── services/          # Backend API client
│   ├── types/             # TypeScript types
│   ├── utils/             # Helpers and error parsing
│   ├── config.ts          # API URL configuration
│   └── style.css          # Tailwind styles
└── assets/                # Extension icons
```

## Configuration

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PLASMO_PUBLIC_API_BASE_URL` | `http://127.0.0.1:8000` | TrustLens backend URL (no trailing slash) |

## Setup

```bash
cd extension
npm install
cp .env.example .env
```

## Development

```bash
npm run dev
```

Load `build/chrome-mv3-dev` in Chrome (`chrome://extensions` → Developer mode → Load unpacked).

Start the backend first:

```bash
cd ../backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Manual Testing

| Scenario | Steps | Expected result |
|----------|-------|-----------------|
| Text only | Paste caption, click **Verify Post** | Mock result with `contentType: text` |
| Image only | Upload chart/screenshot, click **Verify Post** | Mock result with `contentType: image` |
| Text + image | Paste text, upload image, add optional context | Mock result with `contentType: text_and_image` |
| Empty submit | Click **Verify Post** with no input | Friendly validation message; button stays disabled |
| Backend offline | Stop backend, click **Verify Post** | Error: service unreachable |

## Production Build

```bash
npm run build
```

Output: `build/chrome-mv3-prod`

## Related Docs

- [Backend API](../backend/README.md)
- [Root README](../README.md)
- [Architecture](../docs/ARCHITECTURE.md)
