import { API_BASE_URL } from "~config"
import type { VerificationResponse, VerifyPostInput } from "~types/verification"
import {
  BACKEND_OFFLINE_MESSAGE,
  EMPTY_SUBMISSION_MESSAGE,
  hasVerificationInput,
  parseApiErrorDetail
} from "~utils"

export class VerificationServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "VerificationServiceError"
  }
}

function buildVerifyFormData(input: VerifyPostInput): FormData {
  const formData = new FormData()

  if (input.text?.trim()) {
    formData.append("text", input.text.trim())
  }

  if (input.image) {
    formData.append("image", input.image, input.image.name)
  }

  if (input.imageContext?.trim()) {
    formData.append("imageContext", input.imageContext.trim())
  }

  return formData
}

export async function verifyPost(
  input: VerifyPostInput
): Promise<VerificationResponse> {
  if (!hasVerificationInput(input.text ?? "", input.image ?? null)) {
    throw new VerificationServiceError(EMPTY_SUBMISSION_MESSAGE)
  }

  const formData = buildVerifyFormData(input)

  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}/api/verify`, {
      method: "POST",
      body: formData
    })
  } catch {
    throw new VerificationServiceError(BACKEND_OFFLINE_MESSAGE)
  }

  if (!response.ok) {
    let message = "Something went wrong while checking this post. Please try again."

    try {
      const errorBody = await response.json()
      message = parseApiErrorDetail(errorBody) ?? message
    } catch {
      // Keep the default friendly message.
    }

    throw new VerificationServiceError(message)
  }

  return (await response.json()) as VerificationResponse
}
