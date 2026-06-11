import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { usePortalData } from "@/lib/portal-data";
import { Download, TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Relatórios — BBDI" }] }),
  component: Reports,
});

function Reports() {
  const { students, trainings } = usePortalData();
  const avg = students.length > 0 ? Math.round(students.reduce((s, u) => s + u.progress, 0) / students.length) : 0;

  return (
    <PortalShell
      title="Relatórios"
      subtitle="Engajamento e desempenho consolidados."
      actions={
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent">
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Engajamento" value={`${avg}%`} color="amber" icon={TrendingUp} />
        <StatCard label="Usuários ativos" value={students.filter(s => s.progress > 0).length} color="info" icon={Users} />
        <StatCard label="Horas totais" value="142h" color="success" icon={Clock} />
        <StatCard label="Conclusões" value={students.reduce((s, u) => s + u.completed, 0)} color="violet" icon={CheckCircle2} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section>
          <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3">TOP COLABORADORES</div>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border/60">
            {[...students].sort((a, b) => b.progress - a.progress).slice(0, 5).map((u, i) => (
              <div key={u.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="text-xs text-muted-foreground tabular-nums w-5">{i + 1}</div>
                <div className="h-8 w-8 rounded-full bg-primary/15 text-primary grid place-items-center text-xs font-semibold">{u.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.department}</div>
                </div>
                <div className="text-sm font-display font-semibold text-primary tabular-nums">{u.progress}%</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3">CONCLUSÃO POR TREINAMENTO</div>
          <div className="rounded-xl border border-border bg-card/60 p-5 space-y-4">
            {trainings.map((t) => {
              const p = Math.round((t.completedLessons / t.totalLessons) * 100);
              return (
                <div key={t.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="truncate">{t.title}</span>
                    <span className="text-muted-foreground tabular-nums">{p}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
