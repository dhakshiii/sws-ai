import { formatDateTime } from "../../utils/formatters";

const typeClasses = {
  SUCCESS: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  ERROR: "bg-rose-50 text-rose-700 ring-rose-200",
  INFO: "bg-sky-50 text-sky-700 ring-sky-200"
};

export function NotificationList({
  notifications,
  onMarkRead,
  emptyMessage = "No notifications yet."
}) {
  if (!notifications.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <article
          key={notification.id}
          className={`rounded-[24px] border px-5 py-5 shadow-soft transition ${
            notification.readStatus
              ? "border-slate-200 bg-white"
              : "border-brand-200 bg-brand-50/50"
          }`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                    typeClasses[notification.type] || typeClasses.INFO
                  }`}
                >
                  {notification.type}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDateTime(notification.timestamp)}
                </span>
                {!notification.readStatus ? (
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                    Unread
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-7 text-slate-700">
                {notification.message}
              </p>
            </div>

            {!notification.readStatus && onMarkRead ? (
              <button
                type="button"
                onClick={() => onMarkRead(notification.id)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                Mark read
              </button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
