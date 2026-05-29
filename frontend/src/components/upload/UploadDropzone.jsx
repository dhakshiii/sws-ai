import { useRef, useState } from "react";

export function UploadDropzone({ onFilesSelected, disabled }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length) {
      onFilesSelected(files);
    }
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
            PDF Upload
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Drag, drop, or browse PDF files
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Upload one file or a whole batch. Files larger than three will trigger
            background completion notifications.
          </p>
        </div>

        <button
          type="button"
          onClick={openPicker}
          disabled={disabled}
          className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Select PDFs
        </button>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`mt-6 rounded-[28px] border border-dashed px-6 py-12 text-center transition ${
          isDragging
            ? "border-brand-500 bg-brand-50"
            : "border-slate-300 bg-slate-50/80 hover:border-brand-300 hover:bg-brand-50/40"
        }`}
      >
        <div className="mx-auto max-w-xl">
          <p className="text-base font-semibold text-slate-900">
            Drop files here to start upload
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Only PDF files are accepted. Each file gets its own progress bar,
            status, and metadata card.
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
    </section>
  );
}
