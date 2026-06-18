interface TextInputProps {
  id: string
  label: string
  value: string
  placeholder: string
  onChange: (value: string) => void
}

export function TextInput({
  id,
  label,
  value,
  placeholder,
  onChange
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-semibold text-slate-800">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        rows={5}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base leading-relaxed text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  )
}
