import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";

import { usePortalData } from "@/lib/portal-data";
import { BookOpen, Users, TrendingUp, Activity as ActivityIcon } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — BBDI Trainning" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { trainings, students } = usePortalData();
  const avg = students.length > 0 ? Math.round(students.reduce((s, u) => s + u.progress, 0) / students.length) : 0;
  const completions = students.reduce((s, u) => s + u.completed, 0);

  return (
    <PortalShell title="Visão geral" subtitle="Resumo do engajamento e desempenho dos colaboradores.">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatCard label="Treinamentos ativos" value={trainings.length} color="amber" icon={BookOpen} />
        <StatCard label="Colaboradores" value={students.length} color="info" icon={Users} />
        <StatCard label="Progresso médio" value={`${avg}%`} color="success" icon={TrendingUp} />
        <StatCard label="Conclusões" value={completions} color="violet" icon={ActivityIcon} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3">DESEMPENHO POR TREINAMENTO</div>
          <div className="rounded-xl border border-border bg-card/60 p-5 space-y-4">
            {trainings.map((t) => {
              const p = Math.round((t.completedLessons / t.totalLessons) * 100);
              return (
                <div key={t.id} className="flex items-center gap-4">
                  <div className={`h-9 w-9 rounded-md bg-gradient-to-br ${t.cover} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm">
                      <span className="truncate">{t.title}</span>
                      <span className="text-muted-foreground tabular-nums">{p}%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3">ATIVIDADE RECENTE</div>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border/60">
            <div className="p-4 text-sm text-muted-foreground">Nenhuma atividade recente.</div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
