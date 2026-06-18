"""
Verification orchestration service.

MVP uses deterministic mock responses. Future integrations:
- Phase 2: Gemini multimodal analysis (text + image reasoning)
- Phase 3: OCR and chart/map/diagram interpretation
- Phase 4: Evidence search and real source retrieval
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class VerificationInput:
    text: str | None
    image_bytes: bytes | None
    image_content_type: str | None
    image_context: str | None


class VerificationService:
    def verify(self, payload: VerificationInput) -> dict:
        has_text = bool(payload.text and payload.text.strip())
        has_image = bool(payload.image_bytes)

        content_type = self._resolve_content_type(has_text, has_image)
        image_type = self._resolve_image_type(payload.image_context, has_image)

        # Phase 2: Send text/image to Gemini for claim detection and reasoning.
        detected_claims = self._mock_detect_claims(payload.text, has_text)

        # Phase 3: Run OCR / visual parsing on image_bytes before multimodal analysis.
        image_summary = self._mock_image_summary(has_image, image_type)

        # Phase 4: Query fact-check APIs and web sources; replace placeholder sources.
        sources = self._mock_sources()

        return {
            "trustScore": 72,
            "verdict": "Needs Review",
            "riskLevel": "Medium",
            "explanation": "This is a mocked result for the MVP foundation.",
            "contentType": content_type,
            "detectedClaims": detected_claims,
            "imageAnalysis": {
                "receivedImage": has_image,
                "imageType": image_type,
                "summary": image_summary,
            },
            "sources": sources,
        }

    @staticmethod
    def _resolve_content_type(has_text: bool, has_image: bool) -> str:
        if has_text and has_image:
            return "text_and_image"
        if has_image:
            return "image"
        return "text"

    @staticmethod
    def _resolve_image_type(image_context: str | None, has_image: bool) -> str:
        if not has_image:
            return "unknown"

        if not image_context:
            return "unknown"

        normalized = image_context.strip().lower()
        allowed = {"chart", "map", "screenshot", "unknown"}
        return normalized if normalized in allowed else "unknown"

    @staticmethod
    def _mock_detect_claims(text: str | None, has_text: bool) -> list[str]:
        if has_text and text:
            snippet = text.strip().replace("\n", " ")
            if len(snippet) > 120:
                snippet = f"{snippet[:117]}..."
            return [f"Mocked detected claim from supplied text: {snippet}"]

        return ["Mocked detected claim from the supplied post content."]

    @staticmethod
    def _mock_image_summary(has_image: bool, image_type: str) -> str:
        if not has_image:
            return "No image was supplied."

        return (
            f"Image analysis is mocked for now ({image_type}). "
            "Future versions will use multimodal Gemini and OCR."
        )

    @staticmethod
    def _mock_sources() -> list[dict]:
        # Phase 4: Replace with ranked evidence from search APIs and fact-check DBs.
        return [
            {
                "title": "Source placeholder",
                "url": "https://example.com",
                "relevance": "Placeholder source for future evidence retrieval.",
            }
        ]


def get_verification_service() -> VerificationService:
    return VerificationService()
