import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, FileText, FileType2, Headphones, PlayCircle } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { getStoredSession } from "@/lib/auth";
import { usePortalData, type LessonType } from "@/lib/portal-data";

export const Route = createFileRoute("/trainings/$id")({
  component: TrainingDetail,
});

const typeIcon: Record<LessonType, React.ComponentType<{ className?: string }>> = {
  video: PlayCircle,
  pdf: FileType2,
  audio: Headphones,
  text: FileText,
};

const typeLabel: Record<LessonType, string> = { video: "Video", pdf: "PDF", audio: "Audio", text: "Texto" };

function TrainingDetail() {
  const { id } = Route.useParams();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const session = getStoredSession();
  const {
    getStudentByEmail,
    getTraining,
    getVisibleTrainingsForStudent,
    isTrainingCompletedByStudent,
    markTrainingCompleted,
    unmarkTrainingCompleted,
  } = usePortalData();
  const student = getStudentByEmail(session?.email);
  const visibleIds = new Set(getVisibleTrainingsForStudent(session?.email).map((training) => training.id));
  const training = getTraining(id);

  if (pathname !== `/trainings/${id}`) {
    return <Outlet />;
  }

  if (!training || !visibleIds.has(training.id)) {
    return (
      <PortalShell title="Treinamento nao encontrado">
        <p className="text-muted-foreground">Esse treinamento nao existe ou nao esta disponivel para o seu departamento.</p>
      </PortalShell>
    );
  }

  const completed = isTrainingCompletedByStudent(student?.id, training.id);

  return (
    <PortalShell title={training.title} subtitle={training.description}>
      <div className={`rounded-xl p-5 bg-gradient-to-br ${training.cover} border border-border/60 mb-8 flex items-center gap-6 flex-wrap`}>
        <div className="flex-1 min-w-[220px]">
          <div className="text-xs uppercase tracking-wider text-foreground/70">{training.category} - {training.department ?? "Todos"}</div>
          <div className="mt-2 text-xs text-foreground/70">{training.totalLessons} aulas disponiveis</div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (completed) {
              unmarkTrainingCompleted(student?.id, training.id);
            } else {
              markTrainingCompleted(student?.id, training.id);
            }
          }}
          className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90"
        >
          <CheckCircle2 className="h-4 w-4" />
          {completed ? "Reabrir treinamento" : "Marcar treinamento como concluido"}
        </button>
      </div>

      <div className="space-y-6">
        {training.modules.map((module, moduleIndex) => (
          <section key={module.id}>
            <div className="flex items-baseline gap-3 mb-3">
              <div className="text-xs text-muted-foreground tabular-nums">Modulo {String(moduleIndex + 1).padStart(2, "0")}</div>
              <h2 className="font-display font-semibold text-lg">{module.title}</h2>
            </div>
            <div className="rounded-xl border border-border bg-card/60 divide-y divide-border/60 overflow-hidden">
              {module.lessons.map((lesson, lessonIndex) => {
                const Icon = typeIcon[lesson.type];
                return (
                  <Link
                    key={lesson.id}
                    to="/trainings/$id/lesson/$lessonId"
                    params={{ id: training.id, lessonId: lesson.id }}
                    className="flex items-center gap-4 px-4 py-3.5 hover:bg-accent/50 transition-colors group"
                  >
                    <div className="text-xs text-muted-foreground tabular-nums w-6">{lessonIndex + 1}</div>
                    <div className={`h-9 w-9 grid place-items-center rounded-md ${completed ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {completed ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{lesson.title}</div>
                      <div className="text-xs text-muted-foreground">{typeLabel[lesson.type]} - {lesson.duration}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </PortalShell>
  );
}
