import type { Source } from "~types/verification"

interface SourceListProps {
  sources: Source[]
}

export function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-slate-600">
        No supporting sources were found for this check.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {sources.map((source) => (
        <li
          key={`${source.url}-${source.title}`}
          className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold text-blue-700 underline">
            {source.title}
          </a>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {source.relevance}
          </p>
        </li>
      ))}
    </ul>
  )
}
