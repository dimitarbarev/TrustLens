export function hasVerificationInput(text: string, image: File | null): boolean {
  return Boolean(text.trim()) || Boolean(image)
}

export function createImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file)
}

export function revokeImagePreviewUrl(url: string | null): void {
  if (url) {
    URL.revokeObjectURL(url)
  }
}

export function getRiskLevelStyles(riskLevel: string): {
  badge: string
  border: string
} {
  const normalized = riskLevel.toLowerCase()

  if (normalized.includes("high")) {
    return {
      badge: "bg-red-100 text-red-900",
      border: "border-red-200"
    }
  }

  if (normalized.includes("low")) {
    return {
      badge: "bg-green-100 text-green-900",
      border: "border-green-200"
    }
  }

  return {
    badge: "bg-amber-100 text-amber-900",
    border: "border-amber-200"
  }
}

export {
  BACKEND_OFFLINE_MESSAGE,
  EMPTY_SUBMISSION_MESSAGE,
  parseApiErrorDetail
} from "./errors"
