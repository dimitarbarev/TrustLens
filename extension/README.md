# TrustLens Browser Extension

Chrome extension (Manifest V3) built with **Plasmo**, **React**, **TypeScript**, and **Tailwind CSS**.

## Status

**MVP connected** — popup sends verification requests to the local FastAPI backend and displays mocked results.

## Demonstration Mode

TrustLens is in **MVP Demonstration Mode**. A banner at the top of the popup explains that:

- Verification scores and verdicts are **simulated**
- Results do **not** represent real AI fact-checking yet
- Real multimodal verification is planned for a future phase (Gemini integration)

The backend mock service returns placeholder trust scores, verdicts, and sources for workflow testing only.

## MVP Flow

1. User opens the popup and reads the demonstration mode banner.
2. User pastes suspicious post text and/or uploads an image.
3. User optionally describes what the image shows (`imageContext`).
4. User clicks **Verify Post**.
5. Extension sends `multipart/form-data` to `POST /api/verify`.
6. Backend returns a mocked verification result.
7. Extension displays trust score, verdict, risk level, explanation, detected claims, image analysis summary, and sources.

Nothing is stored on the backend. Selected text from the context menu is held briefly in `chrome.storage.session` only until the popup opens, then cleared.

## Icons

Custom TrustLens icons live in `assets/icons/` (16, 32, 48, 128 px) with a 512 px master at `assets/icon.png`. The source artwork is kept at `assets/icon-source.png`.

Regenerate all sizes from the source artwork with:

```bash
python3 scripts/generate-icons.py
```

## Structure

```
extension/
├── src/
│   ├── popup.tsx          # Popup UI
│   ├── background.ts      # Context menu foundation
│   ├── hooks/             # Verification state and actions
│   ├── components/        # Reusable UI components (incl. MvpWarningBanner)
│   ├── services/          # Backend API client
│   ├── types/             # TypeScript types
│   ├── utils/             # Helpers and error parsing
│   ├── config.ts          # API URL configuration
│   └── style.css          # Tailwind styles
├── assets/
│   ├── icon.png           # Plasmo master icon (512 px)
│   └── icons/             # 16, 32, 48, 128 px extension icons
└── scripts/
    └── generate-icons.py
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
python3 scripts/generate-icons.py
```

## Development

```bash
npm run dev
```

Load `build/chrome-mv3-dev` in Chrome (`chrome://extensions` → Developer mode → Load unpacked).

After icon or manifest changes, click **Reload** on the extension card in `chrome://extensions`.

Start the backend first:

```bash
cd ../backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Manual Testing

| Scenario | Steps | Expected result |
|----------|-------|-----------------|
| Demo banner | Open popup | Yellow/orange MVP Demonstration Mode banner visible |
| Text only | Paste caption, click **Verify Post** | Mock result with `contentType: text` |
| Image only | Upload chart/screenshot, click **Verify Post** | Mock result with `contentType: image` |
| Text + image | Paste text, upload image, add optional context | Mock result with `contentType: text_and_image` |
| Empty submit | Click **Verify Post** with no input | Friendly validation message; button stays disabled |
| Backend offline | Stop backend, click **Verify Post** | Error: service unreachable |
| Icon | Check toolbar and `chrome://extensions` | Custom TrustLens icon (person + phone) |

## Production Build

```bash
npm run build
```

Output: `build/chrome-mv3-prod`

## Related Docs

- [Backend API](../backend/README.md)
- [Root README](../README.md)
- [Architecture](../docs/ARCHITECTURE.md)
