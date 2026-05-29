const highlights = [
  "React + Vite app scaffolded",
  "Tailwind CSS configured",
  "Axios client ready for backend APIs",
  "React Router wired for multi-page flow"
];

export function DashboardPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
      <div className="rounded-[28px] bg-slate-950 px-6 py-8 text-white shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">
          Phase 3
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">
          Frontend foundation is ready for feature work.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          The upload experience, document table, and notification center will be
          layered onto this dashboard in the next phases.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
          Included
        </p>
        <div className="mt-4 space-y-3">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
