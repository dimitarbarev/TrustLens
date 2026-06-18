# TrustLens Development Prompts

## Overview

TrustLens is being built through **Cursor-driven development**: structured prompts guide each increment of work — from repository foundation through extension, backend, and future phases.

This approach keeps scope explicit, preserves architectural decisions in chat history, and allows reproducible steps for contributors who use Cursor or similar AI-assisted editors.

## How We Use Prompts

1. **One concern per prompt** — e.g., "scaffold FastAPI health endpoint" rather than "build entire backend."
2. **Reference docs first** — Prompts should cite [ARCHITECTURE.md](ARCHITECTURE.md), [MVP_SCOPE.md](MVP_SCOPE.md), and shared contracts before generating code.
3. **Respect phase boundaries** — Do not prompt for Gemini, databases, or Facebook scanning until the relevant roadmap phase is active.
4. **Update docs when behavior changes** — Code and documentation stay in sync.

## Completed Prompts

### Phase 1 — Monorepo foundation

Created monorepo structure, documentation (`PROJECT_PLAN`, `ARCHITECTURE`, `MVP_SCOPE`, `ROADMAP`), shared API contract stub, MIT license, and package READMEs. No application logic.

### Phase 1 — Backend MVP

Implemented FastAPI backend with `GET /api/health`, `POST /api/verify` (multipart form), mocked verification service, in-memory-only processing, and CORS configuration.

### Phase 1 — Extension MVP

Implemented Plasmo + React + TypeScript + Tailwind popup UI with reusable components, verification service, configurable API URL, and background context-menu foundation.

### Phase 1 — Connect extension to backend

Wired the full MVP flow: extension sends `text`, optional `image`, and optional `imageContext` via multipart form to `POST /api/verify`; backend returns mocked results; extension renders trust score, verdict, risk level, explanation, detected claims, image analysis summary, and sources. Added frontend/backend empty-submission validation, offline error handling, loading state, CORS defaults for extension dev (`CORS_ORIGINS=*`), and updated root README with run/test instructions.

## Prompt Categories

| Category | Examples |
|----------|----------|
| Foundation | Monorepo layout, README, architecture docs |
| Extension | Popup UI, content scripts, messaging, API client |
| Backend | Routes, Pydantic models, mock verification service |
| Integration | Connect extension to backend, CORS, error handling |
| Contracts | Extend `verification-result.md`, add JSON Schema |
| Future phases | Gemini integration, OCR pipeline, evidence search |

## Example Prompt Templates

### Extension task

```
Implement [feature] in trustlens/extension following MVP_SCOPE.md.
Use types aligned with shared/api-contracts/verification-result.md.
Do not add Gemini or database code.
```

### Backend task

```
Add [endpoint] to trustlens/backend using FastAPI.
Validate requests with Pydantic models matching the shared contract.
Use the mock verification service only.
```

### Integration task

```
Connect trustlens/extension to the FastAPI backend POST /api/verify.
Ensure multipart form fields, CORS, loading/error states, and in-memory-only processing.
Do not add Gemini, OCR, evidence search, database, or Facebook scanning.
```

### Documentation task

```
Update ARCHITECTURE.md to reflect [change].
Keep MVP_SCOPE.md and ROADMAP.md consistent.
```

## Conventions for AI-Assisted Sessions

- State the target phase (e.g., "Phase 1 only").
- Point to specific files or directories when continuing work.
- Ask for minimal diffs; avoid unrelated refactors.
- Request tests when behavior is non-trivial.

## Recording Decisions

Significant prompt outcomes (new endpoints, contract changes, deferred features) should be reflected in:

- [ARCHITECTURE.md](ARCHITECTURE.md) for structural changes
- [MVP_SCOPE.md](MVP_SCOPE.md) for scope changes
- [ROADMAP.md](ROADMAP.md) for phase adjustments

## Contributing Without Cursor

Contributors using other tools can follow the same documents and issue templates. Prompts in this file describe *intent*; the source of truth remains the markdown docs and shared contracts in the repository.
