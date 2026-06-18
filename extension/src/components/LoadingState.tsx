export function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-blue-900">
      <p className="text-base font-semibold">Checking this post...</p>
      <p className="mt-1 text-sm leading-relaxed">
        Please wait a moment while TrustLens reviews the text and image you shared.
      </p>
    </div>
  )
}
