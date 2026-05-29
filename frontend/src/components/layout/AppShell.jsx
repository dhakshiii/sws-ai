import { NavLink } from "react-router-dom";
import { NotificationBell } from "../notifications/NotificationBell";
import { useNotifications } from "../../hooks/useNotifications";

const navItemClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-brand-600 text-white shadow-soft"
      : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
  }`;

export function AppShell({ children }) {
  const { unreadCount, connectionStatus } = useNotifications();

  return (
    <div className="min-h-screen px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col rounded-[32px] border border-white/70 bg-white/65 shadow-soft backdrop-blur">
        <header className="flex flex-col gap-5 border-b border-slate-200/80 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-700">
              SWS AI
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Document Management Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Upload, organize, and monitor documents from a clean workspace
              prepared for realtime notifications.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <NavLink to="/" className={navItemClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/notifications" className={navItemClass}>
              Notifications
            </NavLink>
            <NotificationBell
              unreadCount={unreadCount}
              connectionStatus={connectionStatus}
            />
          </nav>
        </header>

        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
