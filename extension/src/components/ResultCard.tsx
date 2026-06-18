import type { VerificationResponse } from "~types/verification"
import { getRiskLevelStyles } from "~utils"

import { SourceList } from "./SourceList"

interface ResultCardProps {
  result: VerificationResponse
}

export function ResultCard({ result }: ResultCardProps) {
  const styles = getRiskLevelStyles(result.riskLevel)

  return (
    <section
      aria-live="polite"
      className={`rounded-xl border bg-white p-4 shadow-sm ${styles.border}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Check result</h2>
          <p className="mt-1 text-sm text-slate-600">
            This is a guide to help you decide whether to trust the post.
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-2 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Trust score
          </p>
          <p className="text-2xl font-bold text-slate-900">{result.trustScore}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">
          Verdict: {result.verdict}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}>
          Risk level: {result.riskLevel}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">What this means</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {result.explanation}
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Claims we noticed
          </h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {result.detectedClaims.map((claim) => (
              <li key={claim}>{claim}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-slate-900">
            About the image
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {result.imageAnalysis.summary}
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Helpful sources
          </h3>
          <div className="mt-2">
            <SourceList sources={result.sources} />
          </div>
        </div>
      </div>
    </section>
  )
}
