import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { getStoredSession } from "@/lib/auth";
import { usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/trainings")({
  head: () => ({ meta: [{ title: "Treinamentos - BBDI Trainning" }] }),
  component: TrainingsList,
});

function TrainingsList() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const session = getStoredSession();
  const { getStudentByEmail, getVisibleTrainingsForStudent, isTrainingCompletedByStudent } = usePortalData();
  const student = getStudentByEmail(session?.email);
  const trainings = getVisibleTrainingsForStudent(session?.email);

  if (pathname !== "/trainings") {
    return <Outlet />;
  }

  return (
    <PortalShell title="Treinamentos" subtitle="Treinamentos disponiveis para o seu departamento.">
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
              <div className={`h-32 bg-gradient-to-br ${training.cover}`} />
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{training.category}</div>
                <div className="mt-1 flex items-start justify-between gap-3">
                  <h3 className="font-display font-semibold">{training.title}</h3>
                  {done && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">Concluido</span>}
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{training.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{training.totalLessons} aulas</span>
                  <span>{training.department ?? "Todos"}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {trainings.length === 0 && <div className="rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">Nenhum treinamento disponivel para o seu departamento.</div>}
    </PortalShell>
  );
}
