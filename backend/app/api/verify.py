from typing import Annotated

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.models.verification import VerificationResponse
from app.services.verification_service import (
    VerificationInput,
    get_verification_service,
)

router = APIRouter(tags=["verification"])


@router.post(
    "/verify",
    response_model=VerificationResponse,
    response_model_by_alias=True,
)
async def verify_content(
    text: Annotated[str | None, Form()] = None,
    image_context: Annotated[str | None, Form(alias="imageContext")] = None,
    image: Annotated[UploadFile | None, File()] = None,
) -> VerificationResponse:
    """
    Accept multipart verification input. All data is processed in memory and
    discarded after the response is returned — nothing is persisted.
    """
    normalized_text = text.strip() if text else None
    has_text = bool(normalized_text)

    image_bytes: bytes | None = None
    image_content_type: str | None = None

    if image is not None:
        # Read into memory only; no disk writes.
        image_bytes = await image.read()
        image_content_type = image.content_type
        await image.close()
        if not image_bytes:
            image_bytes = None
            image_content_type = None

    has_image = bool(image_bytes)

    if not has_text and not has_image:
        raise HTTPException(
            status_code=422,
            detail="Please provide some text from the post or upload an image before checking.",
        )

    service = get_verification_service()
    result = service.verify(
        VerificationInput(
            text=normalized_text,
            image_bytes=image_bytes,
            image_content_type=image_content_type,
            image_context=image_context.strip() if image_context else None,
        )
    )

    # image_bytes and normalized_text go out of scope here and are discarded.
    return VerificationResponse.model_validate(result)
