# TrustLens

TrustLens is an open-source, AI-powered browser extension that helps users verify suspicious factual claims, statistics, charts, maps, screenshots, and image-based posts from social media.

Misinformation spreads quickly online. TrustLens gives users a simple way to check whether a claim or visual is plausible before they share it — without leaving the page they are reading.

## Why TrustLens Exists

Social platforms make it easy to post claims, charts, and screenshots with little context. Fact-checking is slow, fragmented, and often requires switching between multiple tabs and tools. TrustLens aims to reduce that friction by bringing verification closer to where people consume content.

The project is intentionally built in phases: start with a focused browser extension proof of concept, then expand into richer multimodal analysis, evidence retrieval, and mobile experiences.

## MVP Scope

The first release focuses on a **browser extension proof of concept** with:

- Text and image input from the user (selected text or uploaded/captured image)
- A lightweight backend API that returns structured verification results
- A **mocked verification layer** (deterministic responses for development and demos)
- Clear API contracts shared between extension and backend

Out of scope for the MVP: Gemini integration, databases, Facebook post scanning, OCR, evidence search, and mobile apps. See [docs/MVP_SCOPE.md](docs/MVP_SCOPE.md) for the full list.

## Repository Structure

```
trustlens/
├── extension/     # Browser extension (Chrome-first MVP)
├── backend/       # FastAPI verification API
├── shared/        # Cross-package contracts and types
└── docs/          # Architecture, roadmap, and planning
```

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Extension | TypeScript, Manifest V3 | Chrome-first; content scripts and popup UI |
| Backend | Python, FastAPI | REST API for verification requests |
| Shared contracts | Markdown (+ future JSON Schema) | Stable request/response shapes |
| Future AI | Google Gemini (multimodal) | Planned; not in MVP |
| Future storage | TBD database | Analytics and history; not in MVP |

## Getting Started

Detailed setup instructions will be added as implementation begins. For now:

1. Read [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md) for overall direction.
2. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design.
3. See package READMEs in [extension/](extension/README.md) and [backend/](backend/README.md).

## Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_PLAN.md](docs/PROJECT_PLAN.md) | Goals, principles, and high-level plan |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System layers and data flow |
| [MVP_SCOPE.md](docs/MVP_SCOPE.md) | Included and excluded MVP features |
| [ROADMAP.md](docs/ROADMAP.md) | Phased delivery plan |
| [PROMPTS.md](docs/PROMPTS.md) | Cursor-driven development notes |

## Roadmap (Summary)

1. **Phase 1** — Browser extension POC (text + image input, mocked backend)
2. **Phase 2** — Gemini multimodal integration
3. **Phase 3** — OCR and chart/map/diagram interpretation
4. **Phase 4** — Evidence search
5. **Phase 5** — Facebook post detection
6. **Phase 6** — Android overlay app
7. **Phase 7** — iOS / Safari extension exploration

See [docs/ROADMAP.md](docs/ROADMAP.md) for details.

## Contributing

Contributions are welcome. This repository is in early foundation stage — structure and documentation first, implementation to follow. Please open an issue before large changes so we can align on scope.

## License

[MIT](LICENSE)
