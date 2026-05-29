import { NavLink } from "react-router-dom";

export function NotificationBell({ unreadCount, connectionStatus }) {
  const connectionLabel =
    connectionStatus === "connected"
      ? "Live"
      : connectionStatus === "connecting"
        ? "Connecting"
        : "Offline";

  const connectionClass =
    connectionStatus === "connected"
      ? "bg-emerald-500"
      : connectionStatus === "connecting"
        ? "bg-amber-400"
        : "bg-rose-500";

  return (
    <NavLink
      to="/notifications"
      className="relative flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700"
    >
      <span className="text-sm font-semibold" aria-hidden="true">
        Bell
      </span>
      <span>Notifications</span>
      <span className="flex items-center gap-2 text-xs text-slate-500">
        <span className={`h-2.5 w-2.5 rounded-full ${connectionClass}`} />
        {connectionLabel}
      </span>
      {unreadCount > 0 ? (
        <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
          {unreadCount}
        </span>
      ) : null}
    </NavLink>
  );
}
