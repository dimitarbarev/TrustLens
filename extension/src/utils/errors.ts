export const EMPTY_SUBMISSION_MESSAGE =
  "Please paste some text from the post, or upload an image, before you continue."

export const BACKEND_OFFLINE_MESSAGE =
  "We could not reach TrustLens. Please make sure the TrustLens service is running on your computer, then try again."

export function parseApiErrorDetail(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return null
  }

  const detail = (body as { detail?: unknown }).detail

  if (typeof detail === "string") {
    return detail
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0]
    if (typeof first === "object" && first !== null && "msg" in first) {
      return String((first as { msg: string }).msg)
    }
  }

  return null
}
