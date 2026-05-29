import { getDownloadUrl } from "../../api/documents";
import { formatDateTime, formatFileSize, titleCase } from "../../utils/formatters";

export function DocumentsTable({ documents, isLoading }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
            Documents
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Uploaded document list
          </h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {documents.length} files
        </span>
      </div>

      {isLoading ? (
        <div className="mt-6 rounded-[24px] bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
          Loading documents...
        </div>
      ) : documents.length ? (
        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
          <div className="hidden grid-cols-[2.2fr_1fr_1.4fr_1fr_1fr] gap-4 bg-slate-950 px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 md:grid">
            <span>Name</span>
            <span>Size</span>
            <span>Upload date</span>
            <span>Status</span>
            <span>Download</span>
          </div>

          <div className="divide-y divide-slate-200">
            {documents.map((document) => (
              <div
                key={document.id}
                className="grid gap-3 px-5 py-5 md:grid-cols-[2.2fr_1fr_1.4fr_1fr_1fr] md:items-center"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {document.fileName}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{document.fileType}</p>
                </div>
                <p className="text-sm text-slate-600">
                  {formatFileSize(document.fileSize)}
                </p>
                <p className="text-sm text-slate-600">
                  {formatDateTime(document.uploadDate)}
                </p>
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {titleCase(document.status)}
                </span>
                <a
                  href={getDownloadUrl(document.downloadUrl)}
                  className="w-fit rounded-full border border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 transition hover:border-brand-500 hover:bg-brand-50"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50/60 px-5 py-10 text-center text-sm text-slate-500">
          No documents uploaded yet. Add a PDF to populate the dashboard.
        </div>
      )}
    </section>
  );
}
