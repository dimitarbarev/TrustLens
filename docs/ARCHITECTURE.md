# TrustLens Architecture

This document describes the system layers for TrustLens: what exists in the MVP foundation, what is mocked, and what is planned for future phases.

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (user)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Extension Layer (Phase 1)                     │
│  Content scripts · Popup UI · Text/image capture · API client   │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS (REST)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend Layer (Phase 1)                      │
│  FastAPI · Request validation · CORS · Health checks            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Mocked Verification Layer (MVP)                    │
│  Deterministic / rule-based responses for dev and demos         │
└─────────────────────────────────────────────────────────────────┘

Future layers (not in MVP) connect below the backend orchestration layer.
```

## Extension Layer

**Location:** `extension/`

The extension is the primary user interface in Phase 1. Responsibilities:

| Concern | Description |
|---------|-------------|
| Input capture | Selected text, pasted text, uploaded images, future screenshot hooks |
| UI | Popup and in-page components for submitting checks and showing results |
| Messaging | Communication between content scripts, background worker, and popup |
| API client | Calls backend verification endpoints with typed payloads |

The extension does **not** perform verification itself in the MVP. It collects input, displays results, and handles errors gracefully.

## Backend Layer

**Location:** `backend/`

The backend is a stateless API service in the MVP (no database).

| Concern | Description |
|---------|-------------|
| HTTP API | REST endpoints for verification and health |
| Validation | Pydantic models aligned with shared contracts |
| Orchestration | Routes requests to the appropriate verification service |
| Configuration | Environment-driven settings (CORS, mode, future API keys) |

## Mocked Verification Layer (MVP)

**Location:** `backend/app/services/` (planned)

Until Gemini and evidence sources are integrated, verification is **mocked**:

- Returns predictable sample responses for development and UI work
- Exercises the full request/response contract without external dependencies
- Allows extension and backend to be built and tested in parallel

Switching from mock to real verification should require changing configuration and service implementation, not extension contracts.

## Future: Gemini Multimodal Layer (Phase 2)

**Not implemented in MVP.**

Planned role:

- Analyze text claims and image content in a single multimodal request
- Produce structured outputs: verdict, confidence, reasoning summary, caveats
- Replace or augment the mock service behind the same API surface

Configuration placeholder: `GEMINI_API_KEY` in `.env.example` (commented out).

## Future: OCR Layer (Phase 3)

**Not implemented in MVP.**

Planned role:

- Extract text from screenshots, charts, and image-based posts
- Feed extracted text (and layout hints) into multimodal or specialized parsers
- Support chart, map, and diagram interpretation as a follow-on within this phase

May run server-side or via managed APIs; decision deferred until Phase 3 scoping.

## Future: Evidence Retrieval Layer (Phase 4)

**Not implemented in MVP.**

Planned role:

- Search trusted sources, fact-check databases, and open web snippets
- Attach citations and source links to verification results
- Improve transparency by showing *why* a verdict was reached

Results schema will extend [verification-result.md](../shared/api-contracts/verification-result.md) with an `evidence` array.

## Future: Database & Analytics Layer (Post-MVP)

**Not implemented in MVP.**

Planned role (when explicitly scoped):

- Optional anonymized usage analytics
- Rate limiting and abuse prevention at scale
- Cached results for repeated queries
- Contributor dashboards

No database is included in the current foundation. Persistence decisions will be documented before implementation.

## Shared Contracts

**Location:** `shared/api-contracts/`

Cross-package definitions ensure the extension and backend stay aligned. MVP uses Markdown specifications; JSON Schema may be added later for codegen and validation.

## Data Flow (MVP)

1. User selects text or provides an image in the extension.
2. Extension sends a verification request to the backend API.
3. Backend validates the payload and invokes the mock verification service.
4. Backend returns a structured `VerificationResult`.
5. Extension renders the result in the popup (verdict, summary, confidence).

## Security Considerations (Planned)

- CORS restricted to extension origin and local dev hosts
- No storage of raw user content in MVP backend (stateless)
- API keys for external services kept server-side only (Phase 2+)
- Rate limiting before public deployment (Phase 4+ or earlier if needed)

## Technology Choices

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Extension | TypeScript, Manifest V3 | Industry standard for Chrome; portable to Edge |
| Backend | FastAPI | Fast to develop, strong typing with Pydantic |
| AI (future) | Google Gemini | Multimodal support for text + images |
| Mobile (future) | TBD | Android overlay in Phase 6; iOS in Phase 7 |
