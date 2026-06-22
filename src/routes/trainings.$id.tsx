import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, FileText, FileType2, Headphones, PlayCircle, HelpCircle, Link as LinkIcon } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { getStoredSession } from "@/lib/auth";
import { useState } from "react";
import { FeedbackModal } from "@/components/feedback-modal";
import { usePortalData, type LessonType, useLessonProgress, useTrainingTimer } from "@/lib/portal-data";

export const Route = createFileRoute("/trainings/$id")({
  component: TrainingDetail,
});

const typeIcon: Record<LessonType, React.ComponentType<{ className?: string }>> = {
  video: PlayCircle,
  pdf: FileType2,
  audio: Headphones,
  text: FileText,
  quiz: HelpCircle,
  article: FileText,
  link: LinkIcon,
  practice: FileText,
};

const typeLabel: Record<LessonType, string> = { video: "Video", pdf: "PDF", audio: "Audio", text: "Texto", quiz: "Quiz", article: "Artigo", link: "Link", practice: "Pratica Assistida" };

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
  const { isLessonCompleted } = useLessonProgress(student?.id);
  const visibleIds = new Set(getVisibleTrainingsForStudent(session?.email).map((training) => training.id));
  const training = getTraining(id);
  const flat = training?.modules.flatMap((m) => m.lessons) ?? [];
  const allLessonsCompleted = flat.every(l => isLessonCompleted(l.id));
  const isSingleLessonTraining = flat.length === 1;
  const completed = isTrainingCompletedByStudent(student?.id, training?.id);
  const { isTimeMet, remainingMinutes } = useTrainingTimer(training?.id, training?.minTimeMinutes);
  const canCompleteTraining = (isSingleLessonTraining || allLessonsCompleted || completed) && isTimeMet;
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  if (pathname !== `/trainings/${id}`) {
    return <Outlet />;
  }

  if (!training || !visibleIds.has(training.id)) {
    return (
      <PortalShell title="Treinamento não encontrado">
        <p className="text-muted-foreground">Este conteúdo não está disponível ou foi removido.</p>
      </PortalShell>
    );
  }

  return (
    <PortalShell title={training.title} subtitle="Detalhes do Treinamento">
      <div className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-card p-6 border border-border">
        <div className="h-32 w-48 shrink-0 overflow-hidden rounded-lg bg-muted">
          <img src={training.cover} alt={training.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 min-w-[220px]">
          <div className="text-xs uppercase tracking-wider text-foreground/70">{training.category} - {training.department ?? "Todos"}</div>
          <div className="mt-2 text-xs text-foreground/70">{training.totalLessons} aulas disponiveis</div>
        </div>
        {canCompleteTraining ? (
          <button
            type="button"
            onClick={() => {
              if (completed) {
                unmarkTrainingCompleted(student?.id, training.id);
              } else {
                setIsFeedbackModalOpen(true);
              }
            }}
            className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90"
          >
            <CheckCircle2 className="h-4 w-4" />
            {completed ? "Reabrir treinamento" : "Marcar treinamento como concluido"}
          </button>
        ) : (
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-md bg-muted text-muted-foreground px-4 py-2.5 text-sm font-medium opacity-70 cursor-not-allowed"
              title={!isTimeMet ? `Aguarde ${remainingMinutes} min para concluir` : "Finalize todas as aulas para concluir"}
            >
              <CheckCircle2 className="h-4 w-4" />
              {!isTimeMet ? `Aguarde o tempo minimo` : "Finalize todas as aulas"}
            </button>
            {!isTimeMet && training?.minTimeMinutes > 0 && !completed && (
              <span className="text-xs text-muted-foreground font-medium animate-pulse">Tempo restante: ~{remainingMinutes} min</span>
            )}
          </div>
        )}
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
                const lessonDone = isLessonCompleted(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    to="/trainings/$id/lesson/$lessonId"
                    params={{ id: training.id, lessonId: lesson.id }}
                    className="flex items-center gap-4 px-4 py-3.5 hover:bg-accent/50 transition-colors group"
                  >
                    <div className="text-xs text-muted-foreground tabular-nums w-6">{lessonIndex + 1}</div>
                    <div className={`h-9 w-9 grid place-items-center rounded-md ${lessonDone || completed ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {lessonDone || completed ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
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

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={(rating, feedback) => {
          markTrainingCompleted(student?.id, training.id, rating, feedback);
          setIsFeedbackModalOpen(false);
        }}
      />
    </PortalShell>
  );
}
