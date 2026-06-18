# TrustLens Browser Extension

Chrome-first browser extension (Manifest V3) for verifying suspicious claims and visual content on the web.

## Status

**Foundation only** — directory structure and documentation are in place. Application logic is not implemented yet.

## Planned Structure

```
extension/
├── src/
│   ├── components/   # Popup and UI components
│   ├── services/     # API client, messaging, verification flow
│   ├── types/        # TypeScript types (aligned with shared contracts)
│   └── utils/        # Helpers (selection, image capture, formatting)
├── assets/           # Icons, static images
└── contents/         # Content scripts for page interaction
```

## MVP Capabilities (Planned)

- Capture user-selected text from the active page
- Accept image input (upload or screenshot)
- Send verification requests to the TrustLens backend
- Display structured verification results in the extension popup

## Out of Scope (MVP)

- Automatic Facebook post scanning
- On-device OCR or multimodal AI
- Offline verification

## Development

Setup and build instructions will be added when the extension scaffold is implemented. See the root [README](../README.md) and [docs/MVP_SCOPE.md](../docs/MVP_SCOPE.md).
