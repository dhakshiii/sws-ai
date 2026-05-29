import { NotificationList } from "../components/notifications/NotificationList";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead
  } = useNotifications();

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
              Notification Center
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Persistent system notifications
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Every upload completion and system alert is stored in the backend
              and remains available across refreshes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
              {unreadCount} unread
            </span>
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={!unreadCount}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Mark all read
            </button>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="rounded-[24px] bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-soft">
          Loading notifications...
        </div>
      ) : (
        <NotificationList
          notifications={notifications}
          onMarkRead={markAsRead}
          emptyMessage="No notifications have been generated yet."
        />
      )}
    </div>
  );
}
