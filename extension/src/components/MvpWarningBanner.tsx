interface MvpWarningBannerProps {
  className?: string
}

export function MvpWarningBanner({ className = "" }: MvpWarningBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-3 text-amber-950 shadow-sm ${className}`}>
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900"
          aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-base font-bold leading-snug text-amber-950">
            🚧 MVP Demonstration Mode
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-900">
            TrustLens is currently running in demonstration mode. Verification
            scores and verdicts are simulated and do not yet represent real AI
            fact-checking results.
          </p>
        </div>
      </div>
    </div>
  )
}
