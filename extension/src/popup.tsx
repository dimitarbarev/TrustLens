import { ErrorMessage } from "~components/ErrorMessage"
import { ImageUpload } from "~components/ImageUpload"
import { LoadingState } from "~components/LoadingState"
import { ResultCard } from "~components/ResultCard"
import { TextInput } from "~components/TextInput"
import { VerifyButton } from "~components/VerifyButton"
import { useVerification } from "~hooks/useVerification"

import "~style.css"

function IndexPopup() {
  const {
    text,
    imageContext,
    imagePreviewUrl,
    loading,
    result,
    error,
    validationError,
    canSubmit,
    handleTextChange,
    handleImageContextChange,
    handleImageSelect,
    handleVerify
  } = useVerification()

  return (
    <main className="w-[440px] p-5">
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-slate-900">TrustLens</h1>
        <p className="mt-2 text-base leading-relaxed text-slate-700">
          Check whether a social media post, chart, map, or screenshot looks
          trustworthy before you share it.
        </p>
      </header>

      <div className="space-y-4">
        <TextInput
          id="post-text"
          label="Words from the post"
          value={text}
          placeholder="Paste the caption or main claim here."
          onChange={handleTextChange}
        />

        <ImageUpload
          id="post-image"
          label="Photo, chart, map, or screenshot"
          helpText="Upload a picture if the post includes a chart, map, graph, pie chart, or screenshot."
          previewUrl={imagePreviewUrl}
          onFileSelect={handleImageSelect}
        />

        <TextInput
          id="image-context"
          label="What does the picture show? (optional)"
          value={imageContext}
          placeholder='Example: "This image shows a pie chart about immigration statistics."'
          onChange={handleImageContextChange}
        />

        {validationError ? <ErrorMessage message={validationError} /> : null}

        <VerifyButton
          loading={loading}
          disabled={!canSubmit}
          onClick={handleVerify}
        />

        {loading ? <LoadingState /> : null}
        {error ? <ErrorMessage message={error} /> : null}
        {result && !loading ? <ResultCard result={result} /> : null}
      </div>
    </main>
  )
}

export default IndexPopup
