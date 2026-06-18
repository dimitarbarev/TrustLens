# TrustLens Roadmap

Phased delivery plan from browser extension proof of concept through mobile platforms.

---

## Phase 1: Browser Extension POC

**Status:** In progress (foundation laid)

**Goal:** End-to-end flow with text and image input, mocked backend verification.

**Deliverables:**

- Chrome extension (Manifest V3) with popup UI
- FastAPI backend with verification and health endpoints
- Mock verification service
- Shared API contract for verification results
- Local development documentation

**Success metric:** User can verify sample text/image and see a structured result without external AI dependencies.

---

## Phase 2: Gemini Multimodal Integration

**Goal:** Replace mock verification with real AI analysis for text and images.

**Deliverables:**

- Gemini API integration in backend verification service
- Server-side API key management
- Prompt design for claim assessment (verdict, confidence, reasoning)
- Graceful fallback when API is unavailable
- Updated architecture docs for AI layer

**Dependencies:** Phase 1 contracts stable; Google Cloud / Gemini API access.

---

## Phase 3: OCR and Visual Interpretation

**Goal:** Extract and interpret text and structure from charts, maps, and diagrams.

**Deliverables:**

- OCR pipeline for screenshot and image-based posts
- Specialized handling for charts, maps, and diagrams (multimodal or dedicated parsers)
- Extension UX for image-heavy content (e.g., cropped regions)
- Documentation for supported visual types

**Dependencies:** Phase 2 multimodal baseline.

---

## Phase 4: Evidence Search

**Goal:** Support verdicts with retrievable evidence and source links.

**Deliverables:**

- Evidence retrieval service (fact-check APIs, trusted sources, web search)
- Extended verification result schema with citations
- Source ranking and deduplication
- User-visible evidence section in extension UI

**Dependencies:** Phase 2+ for meaningful claim decomposition; may introduce caching.

---

## Phase 5: Facebook Post Detection

**Goal:** Detect and verify Facebook-specific post formats (text, shared images, screenshots).

**Deliverables:**

- Content script patterns for Facebook DOM structures
- Post boundary detection (avoid partial captures)
- Handling of shared links and image albums
- Maintenance process for DOM changes

**Dependencies:** Stable extension architecture from Phase 1; legal/ToS review recommended.

**Note:** Not started in foundation or MVP.

---

## Phase 6: Android Overlay App

**Goal:** Bring TrustLens verification to Android via an overlay or share-target experience.

**Deliverables:**

- Android app scaffold
- Share-intent and overlay UX for verifying content from other apps
- Backend API client (reuse contracts from `shared/`)
- Platform-specific permissions and privacy disclosure

**Dependencies:** Mature backend API from Phases 2–4.

---

## Phase 7: iOS and Safari Extension Exploration

**Goal:** Evaluate and prototype iOS distribution options (Safari Web Extension, native share extension, or companion app).

**Deliverables:**

- Technical spike document (Safari Web Extension vs native)
- Proof-of-concept build for chosen approach
- App Store / Safari extension submission checklist
- Parity assessment with Chrome extension features

**Dependencies:** Phase 6 learnings; Apple developer program requirements.

---

## Timeline

No fixed dates are attached at this stage. Each phase completes when its deliverables and success metrics are met. Phases may overlap for documentation and contract work, but **implementation of later phases should not block Phase 1 completion**.

## How to Contribute

Pick a phase aligned with open issues (to be created). Start with Phase 1 tasks if you are new to the project. See [PROMPTS.md](PROMPTS.md) for development workflow.
