import { useCallback, useEffect, useState } from "react"

import {
  VerificationServiceError,
  verifyPost
} from "~services/verificationService"
import type { VerificationResponse } from "~types/verification"
import {
  createImagePreviewUrl,
  EMPTY_SUBMISSION_MESSAGE,
  hasVerificationInput,
  revokeImagePreviewUrl
} from "~utils"

const PENDING_SELECTED_TEXT_KEY = "pendingSelectedText"

export function useVerification() {
  const [text, setText] = useState("")
  const [imageContext, setImageContext] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VerificationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    chrome.storage.session.get(PENDING_SELECTED_TEXT_KEY, (stored) => {
      const pendingText = stored[PENDING_SELECTED_TEXT_KEY]
      if (typeof pendingText === "string" && pendingText.trim()) {
        setText(pendingText)
        chrome.storage.session.remove(PENDING_SELECTED_TEXT_KEY)
      }
    })
  }, [])

  const clearResultState = useCallback(() => {
    setResult(null)
    setError(null)
    setValidationError(null)
  }, [])

  const handleTextChange = useCallback(
    (value: string) => {
      setText(value)
      clearResultState()
    },
    [clearResultState]
  )

  const handleImageContextChange = useCallback((value: string) => {
    setImageContext(value)
  }, [])

  const handleImageSelect = useCallback(
    (file: File | null) => {
      setImagePreviewUrl((currentUrl) => {
        revokeImagePreviewUrl(currentUrl)
        return file ? createImagePreviewUrl(file) : null
      })
      setImageFile(file)
      clearResultState()
    },
    [clearResultState]
  )

  const handleVerify = async () => {
    clearResultState()

    if (!hasVerificationInput(text, imageFile)) {
      setValidationError(EMPTY_SUBMISSION_MESSAGE)
      return
    }

    setLoading(true)

    try {
      const response = await verifyPost({
        text,
        image: imageFile,
        imageContext
      })
      setResult(response)
    } catch (caughtError) {
      if (caughtError instanceof VerificationServiceError) {
        setError(caughtError.message)
      } else {
        setError(
          "Something unexpected happened. Please wait a moment and try again."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    text,
    imageContext,
    imagePreviewUrl,
    loading,
    result,
    error,
    validationError,
    canSubmit: hasVerificationInput(text, imageFile),
    handleTextChange,
    handleImageContextChange,
    handleImageSelect,
    handleVerify
  }
}
