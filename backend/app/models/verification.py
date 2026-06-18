from pydantic import BaseModel, ConfigDict, Field


class ImageAnalysis(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    received_image: bool = Field(alias="receivedImage")
    image_type: str = Field(alias="imageType")
    summary: str


class SourceItem(BaseModel):
    title: str
    url: str
    relevance: str


class VerificationResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    trust_score: int = Field(alias="trustScore", ge=0, le=100)
    verdict: str
    risk_level: str = Field(alias="riskLevel")
    explanation: str
    content_type: str = Field(alias="contentType")
    detected_claims: list[str] = Field(alias="detectedClaims")
    image_analysis: ImageAnalysis = Field(alias="imageAnalysis")
    sources: list[SourceItem]


class HealthResponse(BaseModel):
    status: str
    service: str
