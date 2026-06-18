interface VerifyButtonProps {
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

export function VerifyButton({ disabled, loading, onClick }: VerifyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full rounded-xl bg-blue-700 px-4 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400">
      {loading ? "Checking..." : "Verify Post"}
    </button>
  )
}
