interface ImageUploadProps {
  id: string
  label: string
  helpText: string
  previewUrl: string | null
  onFileSelect: (file: File | null) => void
}

export function ImageUpload({
  id,
  label,
  helpText,
  previewUrl,
  onFileSelect
}: ImageUploadProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-semibold text-slate-800">
        {label}
      </label>
      <p className="text-sm leading-relaxed text-slate-600">{helpText}</p>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={(event) => onFileSelect(event.target.files?.[0] ?? null)}
        className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
      />
      {previewUrl ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-slate-700">Image preview</p>
          <img
            src={previewUrl}
            alt="Uploaded screenshot or chart preview"
            className="max-h-48 w-full rounded-lg object-contain"
          />
        </div>
      ) : null}
    </div>
  )
}
