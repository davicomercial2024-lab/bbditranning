import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Clock, Flame, PlayCircle } from "lucide-react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { getStoredSession } from "@/lib/auth";
import { usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BBDI Trainning - Portal do aluno" },
      { name: "description", content: "Portal de treinamento de novos colaboradores BBDI." },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <PortalShell title="Visão geral" subtitle="Bons treinos. Continue de onde parou ou explore novos modulos.">
      <DashboardContent />
    </PortalShell>
  );
}

function DashboardContent() {
  const session = getStoredSession();
  const { getStudentByEmail, getVisibleTrainingsForStudent, isTrainingCompletedByStudent } = usePortalData();
  const student = getStudentByEmail(session?.email);
  const trainings = getVisibleTrainingsForStudent(session?.email);
  const completed = trainings.filter((training) => isTrainingCompletedByStudent(student?.id, training.id));
  const inProgress = trainings.filter((training) => !isTrainingCompletedByStudent(student?.id, training.id));
  const continueTraining = inProgress[0] ?? trainings[0];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatCard label="Treinamentos ativos" value={trainings.length} color="amber" icon={BookOpen} />
        <StatCard label="Treinos concluidos" value={completed.length} color="info" icon={CheckCircle2} />
        <StatCard label="Pendentes" value={inProgress.length} color="success" icon={Clock} />
        <StatCard label="Progresso" value={`${student?.progress ?? 0}%`} color="violet" icon={Flame} />
      </div>

      <section className="mb-10">
        <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3">CONTINUAR TREINAMENTO</div>
        {continueTraining ? (
          <div className={`rounded-2xl p-6 md:p-8 bg-gradient-to-br ${continueTraining.cover} border border-border/60 relative overflow-hidden`}>
            <div className="relative z-10 max-w-2xl">
              <div className="text-xs uppercase tracking-wider text-foreground/70">{continueTraining.category}</div>
              <h2 className="mt-1 text-2xl md:text-3xl font-display font-bold">{continueTraining.title}</h2>
              <p className="mt-2 text-sm text-foreground/80">{continueTraining.description}</p>
              <Link
                to="/trainings/$id"
                params={{ id: continueTraining.id }}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90"
              >
                <PlayCircle className="h-4 w-4" /> Abrir treinamento
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">Nenhum treinamento disponivel para o seu departamento.</div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70">SEUS TREINAMENTOS</div>
          <Link to="/trainings" className="text-xs text-muted-foreground hover:text-foreground">Ver todos</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainings.map((training) => {
            const done = isTrainingCompletedByStudent(student?.id, training.id);
            return (
              <Link
                key={training.id}
                to="/trainings/$id"
                params={{ id: training.id }}
                className="group rounded-xl border border-border bg-card/60 overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className={`h-28 bg-gradient-to-br ${training.cover} relative`}>
                  <div className="absolute bottom-2 left-3 text-[10px] uppercase tracking-wider text-foreground/80 bg-background/40 backdrop-blur px-2 py-0.5 rounded">{training.category}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-semibold text-base">{training.title}</h3>
                    {done && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">Concluido</span>}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{training.description}</p>
                  <div className="mt-4 text-xs text-muted-foreground">{training.totalLessons} aulas</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
