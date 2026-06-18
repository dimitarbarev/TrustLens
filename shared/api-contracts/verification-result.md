# Verification Result API Contract

Shared specification for verification responses returned by the TrustLens backend and consumed by the extension (and future mobile clients).

**Version:** 0.1.0 (foundation — not yet implemented in code)

## Endpoint (Planned)

```
POST /api/v1/verify
```

### Request (Planned)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | No* | Claim or text to verify |
| `image` | string (base64) or file upload | No* | Image to verify (screenshot, chart, etc.) |
| `source_url` | string | No | Page URL where content was found |
| `locale` | string | No | BCP 47 language tag (e.g., `en-US`) |

\* At least one of `text` or `image` must be provided.

### Example Request (JSON)

```json
{
  "text": "Unemployment dropped 50% last month nationwide.",
  "source_url": "https://example.com/post/123",
  "locale": "en-US"
}
```

## Response: VerificationResult

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string (UUID) | Yes | Unique identifier for this verification |
| `verdict` | enum | Yes | Overall assessment (see Verdict enum) |
| `confidence` | number | Yes | 0.0–1.0 confidence score |
| `summary` | string | Yes | Plain-language explanation for the user |
| `reasoning` | string | No | Longer technical or model reasoning |
| `caveats` | string[] | No | Limitations of this check |
| `input_type` | enum | Yes | `text`, `image`, or `multimodal` |
| `created_at` | string (ISO 8601) | Yes | Timestamp of the verification |
| `evidence` | EvidenceItem[] | No | Phase 4+ — supporting sources |

## Verdict Enum

| Value | Meaning |
|-------|---------|
| `supported` | Claim appears consistent with available information |
| `unsupported` | Claim appears inconsistent or false |
| `mixed` | Partially true or missing critical context |
| `unverifiable` | Insufficient information to assess |
| `error` | Verification could not be completed |

## Input Type Enum

| Value | Meaning |
|-------|---------|
| `text` | Verification based on text input only |
| `image` | Verification based on image input only |
| `multimodal` | Both text and image were analyzed |

## EvidenceItem (Phase 4+)

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Source title |
| `url` | string | Link to source |
| `snippet` | string | Relevant excerpt |
| `relevance` | number | 0.0–1.0 relevance score |

## Example Response (Mock)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "verdict": "unsupported",
  "confidence": 0.82,
  "summary": "This claim exaggerates the reported change. Official data shows a much smaller shift.",
  "reasoning": "Mock response for development. No external sources were queried.",
  "caveats": [
    "This is a mocked result for MVP development.",
    "No live fact-check or search was performed."
  ],
  "input_type": "text",
  "created_at": "2026-06-18T12:00:00Z",
  "evidence": []
}
```

## Error Response (Planned)

| Field | Type | Description |
|-------|------|-------------|
| `error` | string | Machine-readable error code |
| `message` | string | Human-readable description |

HTTP status codes: `400` validation error, `422` unprocessable input, `500` internal error.

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| 0.1.0 | 2026-06-18 | Initial contract for MVP foundation |
