interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-900">
      <p className="text-base font-semibold">We could not finish this check</p>
      <p className="mt-1 text-sm leading-relaxed">{message}</p>
    </div>
  )
}
