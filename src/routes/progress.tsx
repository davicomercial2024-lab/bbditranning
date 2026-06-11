import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Flame, Trophy } from "lucide-react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { getStoredSession } from "@/lib/auth";
import { usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "Meu progresso - BBDI Trainning" }] }),
  component: ProgressPage,
});

function ProgressPage() {
  return (
    <PortalShell title="Meu progresso" subtitle="Acompanhe o seu desempenho e conclusoes.">
      <ProgressContent />
    </PortalShell>
  );
}

function ProgressContent() {
  const session = getStoredSession();
  const { getStudentByEmail, getVisibleTrainingsForStudent, isTrainingCompletedByStudent } = usePortalData();
  const student = getStudentByEmail(session?.email);
  const trainings = getVisibleTrainingsForStudent(session?.email);
  const completedCount = trainings.filter((training) => isTrainingCompletedByStudent(student?.id, training.id)).length;
  const pct = trainings.length > 0 ? Math.round((completedCount / trainings.length) * 100) : 0;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatCard label="Progresso geral" value={`${pct}%`} color="amber" icon={Trophy} />
        <StatCard label="Treinos concluidos" value={completedCount} color="info" icon={CheckCircle2} />
        <StatCard label="Treinos atribuidos" value={trainings.length} color="success" icon={Clock} />
        <StatCard label="Departamento" value={student?.department ?? "-"} color="violet" icon={Flame} />
      </div>

      <div className="rounded-xl border border-border bg-card/60 divide-y divide-border/60 overflow-hidden">
        {trainings.map((training) => {
          const done = isTrainingCompletedByStudent(student?.id, training.id);
          return (
            <div key={training.id} className="p-5 flex items-center gap-5">
              <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${training.cover} shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display font-semibold truncate">{training.title}</h3>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">{training.totalLessons} aulas</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: done ? "100%" : "0%" }} />
                </div>
              </div>
              <div className="text-sm font-medium tabular-nums w-24 text-right">{done ? "Concluido" : "Pendente"}</div>
            </div>
          );
        })}
        {trainings.length === 0 && <div className="p-6 text-sm text-muted-foreground">Nenhum treinamento disponivel para o seu departamento.</div>}
      </div>
    </>
  );
}
