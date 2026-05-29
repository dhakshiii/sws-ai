import { formatFileSize, titleCase } from "../../utils/formatters";

const statusClasses = {
  pending: "bg-slate-100 text-slate-700",
  uploading: "bg-amber-100 text-amber-700",
  complete: "bg-emerald-100 text-emerald-700",
  failed: "bg-rose-100 text-rose-700"
};

export function UploadQueue({
  items,
  collapsed,
  onToggleCollapse,
  showCompactHint
}) {
  if (!items.length) {
    return null;
  }

  const completeCount = items.filter((item) => item.status === "complete").length;
  const failedCount = items.filter((item) => item.status === "failed").length;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
            Upload Queue
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {items.length} files in this session
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {completeCount} complete, {failedCount} failed,{" "}
            {items.length - completeCount - failedCount} in progress.
          </p>
          {showCompactHint ? (
            <p className="mt-2 text-sm font-medium text-brand-700">
              Bulk mode is active. You can collapse the details while the files
              continue uploading.
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
        >
          {collapsed ? "Show queue details" : "Collapse queue"}
        </button>
      </div>

      {!collapsed ? (
        <div className="mt-6 grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-base font-semibold text-slate-950">
                      {item.name}
                    </h4>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusClasses[item.status]
                      }`}
                    >
                      {titleCase(item.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {formatFileSize(item.size)} • {item.type || "application/pdf"}
                  </p>
                  {item.error ? (
                    <p className="mt-2 text-sm font-medium text-rose-600">
                      {item.error}
                    </p>
                  ) : null}
                </div>

                <div className="w-full max-w-sm">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Upload progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        item.status === "failed"
                          ? "bg-rose-500"
                          : item.status === "complete"
                            ? "bg-emerald-500"
                            : "bg-brand-500"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
