# TrustLens MVP Scope

This document defines what is **in** and **out** of the Minimum Viable Product (Phase 1: browser extension proof of concept).

## MVP Goal

Deliver an end-to-end demo where a user submits text or an image through a browser extension and receives a structured verification result from a backend API — using mocked verification logic.

## Included

### Extension

- [ ] Chrome extension scaffold (Manifest V3)
- [ ] Popup UI for submitting verification requests
- [ ] Text input via user selection or manual entry
- [ ] Image input via file upload (screenshot capture may follow in same phase)
- [ ] Display of structured verification results
- [ ] Basic error handling (network failures, invalid input)

### Backend

- [ ] FastAPI application with health check endpoint
- [ ] Verification endpoint accepting text and/or image payloads
- [ ] Request/response models matching shared contracts
- [ ] Mocked verification service (deterministic sample responses)
- [ ] CORS configuration for extension and local development
- [ ] Environment-based configuration (`.env`)

### Shared

- [ ] Verification result contract documented in `shared/api-contracts/`
- [ ] Consistent field names and enums across extension and backend

### Documentation & Repo

- [x] Monorepo structure
- [x] Architecture, roadmap, and scope documentation
- [x] Root and package README files
- [x] MIT license and `.gitignore`

## Excluded

The following are **explicitly out of scope** for the MVP. They appear on the roadmap but must not be implemented prematurely.

| Feature | Reason deferred |
|---------|-----------------|
| Google Gemini / any LLM integration | Phase 2; mock layer validates flow first |
| Database (PostgreSQL, SQLite, etc.) | No persistence needed for POC |
| User accounts or authentication | Adds complexity without MVP value |
| Facebook post detection / scanning | Phase 5; platform-specific and fragile |
| OCR for text-in-image | Phase 3 |
| Chart, map, diagram interpretation | Phase 3 |
| Evidence search and citations | Phase 4 |
| Android or iOS apps | Phases 6–7 |
| Safari extension | Phase 7 exploration |
| Production deployment / CI/CD | Follows after POC is functional |
| Analytics and telemetry | Requires privacy review and storage |

## Definition of Done (MVP)

The MVP is complete when:

1. A developer can run the backend locally and hit `/health`.
2. The extension can send a verification request and render the mock response.
3. All responses conform to the shared verification result contract.
4. Documentation reflects actual behavior (setup steps in package READMEs).

## Scope Change Process

New features should be added to [ROADMAP.md](ROADMAP.md) first. If a feature belongs in MVP, update this document and get alignment before implementation.
