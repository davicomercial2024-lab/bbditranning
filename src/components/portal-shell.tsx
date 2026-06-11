import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, GraduationCap, Activity, User, Building2, FileBarChart, Users, BookOpen, LogOut, Search } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { clearSession, getStoredSession, type AuthSession } from "@/lib/auth";

const studentNav = [
  { to: "/", label: "Visão geral", icon: LayoutDashboard },
  { to: "/trainings", label: "Treinamentos", icon: GraduationCap },
  { to: "/progress", label: "Meu progresso", icon: Activity },
  { to: "/profile", label: "Perfil", icon: User },
];

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/trainings", label: "Treinamentos", icon: BookOpen },
  { to: "/admin/users", label: "Colaboradores", icon: Users },
  { to: "/admin/departments", label: "Departamentos", icon: Building2 },
  { to: "/admin/reports", label: "Relatórios", icon: FileBarChart },
];

export function PortalShell({ children, title, subtitle, actions }: { children: ReactNode; title: string; subtitle?: string; actions?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isAdmin = pathname.startsWith("/admin");
  const expectedRole = isAdmin ? "admin" : "student";
  const nav = isAdmin ? adminNav : studentNav;
  const [session, setSession] = useState<AuthSession | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const isAuthorized = useMemo(() => session?.role === expectedRole, [expectedRole, session?.role]);

  useEffect(() => {
    const storedSession = getStoredSession();

    if (!storedSession || storedSession.role !== expectedRole) {
      clearSession();
      void navigate({ to: "/login", search: { redirect: pathname } });
      return;
    }

    setSession(storedSession);
    setCheckedAuth(true);
  }, [expectedRole, navigate, pathname]);

  function handleLogout() {
    clearSession();
    void navigate({ to: "/login" });
  }

  if (!checkedAuth || !isAuthorized || !session) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
        <div className="text-sm text-muted-foreground">Verificando acesso...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-6 pt-7 pb-8">
          <Link to="/" className="block w-full">
            <BrandLogo className="h-auto w-full max-h-32 object-contain" />
          </Link>
        </div>

        <div className="px-4">
          <div className="px-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70">
            {isAdmin ? "ADMINISTRAÇÃO" : "PORTAL DO ALUNO"}
          </div>
          <nav className="mt-3 space-y-1">
            {nav.map((item) => {
              const active = pathname === item.to || (item.to !== "/" && item.to !== "/admin" && pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-accent text-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto px-4 pb-6">
          <div className="rounded-lg border border-sidebar-border/70 p-3 text-xs text-muted-foreground">
            Logado como <span className="text-foreground font-medium">{session.name}</span>
          </div>
          <div className="mt-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-sidebar-border bg-secondary/40 px-3 py-2 text-xs hover:bg-secondary"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-10">
          <header className="flex items-start justify-between gap-6 mb-8 pb-6 border-b border-border/60">
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-display font-semibold">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
              <div className="mt-4 h-0.5 w-12 bg-primary rounded-full" />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <input className="bg-transparent outline-none w-40 placeholder:text-muted-foreground/60" placeholder="Buscar..." />
              </div>
              {actions}
            </div>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}

export function StatCard({ label, value, color, icon: Icon }: { label: string; value: string | number; color: "amber" | "info" | "success" | "violet"; icon: React.ComponentType<{ className?: string }> }) {
  const map = {
    amber: { ring: "stat-glow-amber", text: "text-[var(--amber)]", bg: "bg-[var(--amber)]/10" },
    info: { ring: "stat-glow-info", text: "text-[var(--info)]", bg: "bg-[var(--info)]/10" },
    success: { ring: "stat-glow-success", text: "text-[var(--success)]", bg: "bg-[var(--success)]/10" },
    violet: { ring: "stat-glow-violet", text: "text-[var(--violet)]", bg: "bg-[var(--violet)]/10" },
  }[color];
  return (
    <div className={`min-w-0 rounded-xl bg-card/60 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 ${map.ring}`}>
      <div className={`h-10 w-10 grid place-items-center rounded-lg ${map.bg}`}>
        <Icon className={`h-5 w-5 ${map.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground break-words">{label}</div>
      </div>
      <div className={`w-full min-w-0 break-words text-2xl font-display font-bold leading-tight sm:w-auto sm:max-w-[55%] sm:text-right sm:text-3xl ${map.text}`}>{value}</div>
    </div>
  );
}
