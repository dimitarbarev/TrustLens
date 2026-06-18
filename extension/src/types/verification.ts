export interface ImageAnalysis {
  receivedImage: boolean
  imageType: string
  summary: string
}

export interface Source {
  title: string
  url: string
  relevance: string
}

export interface VerificationResponse {
  trustScore: number
  verdict: string
  riskLevel: string
  explanation: string
  contentType: string
  detectedClaims: string[]
  imageAnalysis: ImageAnalysis
  sources: Source[]
}

export interface VerifyPostInput {
  text?: string
  image?: File | null
  imageContext?: string
}
