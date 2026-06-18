# TrustLens Project Plan

## Mission

Build an open-source tool that helps everyday users quickly assess whether factual claims, statistics, and visual content (charts, maps, screenshots, social posts) are trustworthy — starting in the browser, expanding to mobile later.

## Problem

Users encounter misleading or unverified claims constantly on social media and news sites. Existing fact-checking workflows are slow and disconnected from the browsing experience. TrustLens reduces friction by offering verification in context.

## Solution (Phased)

TrustLens delivers verification through a browser extension backed by an API. Early versions use mocked responses to validate UX and contracts. Later phases add multimodal AI, OCR, evidence retrieval, and platform-specific detection.

## Guiding Principles

1. **Start simple** — Ship a working POC before adding AI, databases, or platform integrations.
2. **Contracts first** — Extension and backend share explicit API shapes in `shared/api-contracts/`.
3. **Open by default** — MIT license, clear docs, welcoming to contributors.
4. **Privacy-aware** — Minimize data sent to servers; document what leaves the device at each phase.
5. **Incremental value** — Each roadmap phase should deliver user-visible improvement.

## Target Users

- Social media readers who want a second opinion before sharing
- Journalists and researchers doing quick sanity checks
- Developers contributing to an open verification toolchain

## Success Criteria (MVP)

- User can submit text or an image from the extension
- Backend returns a structured verification result within acceptable latency
- Results are understandable without technical knowledge
- Codebase is documented enough for a new contributor to orient quickly

## Non-Goals (Initial Phases)

- Replacing professional fact-checking organizations
- Real-time monitoring of entire social feeds
- Storing user history in a database (until explicitly scoped)

## Team & Process

Development is driven through structured prompts in Cursor. See [PROMPTS.md](PROMPTS.md) for workflow notes.

## Related Documents

- [ARCHITECTURE.md](ARCHITECTURE.md) — Technical layers and data flow
- [MVP_SCOPE.md](MVP_SCOPE.md) — Feature boundaries for the first release
- [ROADMAP.md](ROADMAP.md) — Delivery phases
