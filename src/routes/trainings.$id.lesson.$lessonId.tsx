import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { getStoredSession } from "@/lib/auth";
import { useState } from "react";
import { usePortalData, type QuizQuestion } from "@/lib/portal-data";

function QuizPlayer({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="text-center text-muted-foreground">Nenhuma pergunta neste quiz.</div>;
  }

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const passed = score === questions.length;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            {qIndex + 1}. {q.question}
          </h3>
          <div className="space-y-2">
            {q.options.map((opt, optIndex) => {
              const isSelected = answers[qIndex] === optIndex;
              const isCorrect = q.correctIndex === optIndex;
              let btnClass = "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ";
              
              if (!submitted) {
                btnClass += isSelected ? "border-primary bg-primary/10 text-primary" : "border-border bg-card/50 hover:border-primary/50 text-foreground";
              } else {
                if (isCorrect) {
                  btnClass += "border-green-500 bg-green-500/10 text-green-500 font-medium";
                } else if (isSelected && !isCorrect) {
                  btnClass += "border-red-500 bg-red-500/10 text-red-500";
                } else {
                  btnClass += "border-border bg-card/20 text-muted-foreground opacity-50";
                }
              }

              return (
                <button
                  key={optIndex}
                  type="button"
                  disabled={submitted}
                  onClick={() => setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))}
                  className={btnClass}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-6 border-t border-border">
        {!submitted ? (
          <button
            type="button"
            disabled={Object.keys(answers).length < questions.length}
            onClick={() => setSubmitted(true)}
            className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            Finalizar Quiz
          </button>
        ) : (
          <div className="text-center space-y-4">
            <div className={`text-2xl font-display font-bold ${passed ? "text-green-500" : "text-amber-500"}`}>
              {passed ? "Parabens! Voce acertou tudo!" : `Voce acertou ${score} de ${questions.length}.`}
            </div>
            {!passed && (
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="rounded-md border border-border bg-card px-6 py-2 text-sm font-medium hover:bg-accent"
              >
                Tentar Novamente
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/trainings/$id/lesson/$lessonId")({
  component: LessonPage,
});

function normalizeGithubFileUrl(source: string) {
  try {
    const url = new URL(source);
    if (url.hostname !== "github.com") return source;

    const parts = url.pathname.split("/").filter(Boolean);
    const markerIndex = parts.findIndex((part) => part === "blob" || part === "raw");
    if (parts.length < 5 || markerIndex !== 2) return source;

    const [owner, repo, , branch, ...fileParts] = parts;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fileParts.join("/")}`;
  } catch {
    return source;
  }
}

function LessonPage() {
  const { id, lessonId } = Route.useParams();
  const session = getStoredSession();
  const { getStudentByEmail, getTraining, getVisibleTrainingsForStudent, isTrainingCompletedByStudent, markTrainingCompleted, unmarkTrainingCompleted } = usePortalData();
  const student = getStudentByEmail(session?.email);
  const visibleIds = new Set(getVisibleTrainingsForStudent(session?.email).map((training) => training.id));
  const training = getTraining(id);
  const flat = training?.modules.flatMap((m) => m.lessons) ?? [];
  const idx = flat.findIndex((lesson) => lesson.id === lessonId);
  const lesson = idx >= 0 ? flat[idx] : null;
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx >= 0 ? flat[idx + 1] ?? null : null;

  if (!training || !lesson || !visibleIds.has(training.id)) {
    return (
      <PortalShell title="Aula nao encontrada">
        <p className="text-muted-foreground">Conteudo indisponivel.</p>
      </PortalShell>
    );
  }

  const textLooksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(lesson.source);
  const contentSource = lesson.type === "pdf" ? normalizeGithubFileUrl(lesson.source) : lesson.source;
  const completed = isTrainingCompletedByStudent(student?.id, training.id);

  return (
    <PortalShell title={lesson.title} subtitle={`${training.title} - ${lesson.duration}`}>
      <Link to="/trainings/$id" params={{ id: training.id }} className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar para {training.title}
      </Link>

      <div className="rounded-xl border border-border bg-card/60 overflow-hidden">
        {lesson.type === "video" && (
          <div className="aspect-video bg-black">
            <iframe src={lesson.source} title={lesson.title} className="w-full h-full" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        )}
        {lesson.type === "pdf" && (
          <div className="bg-background">
            <div className="flex flex-col gap-3 border-b border-border bg-card/80 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="text-sm font-medium">Arquivo PDF</div>
                <div className="mt-1 break-all text-xs text-muted-foreground">{contentSource}</div>
              </div>
              <a
                href={contentSource}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" /> Abrir PDF
              </a>
            </div>
            <div className="h-[70vh] bg-black">
              <iframe src={contentSource} title={lesson.title} className="h-full w-full" />
            </div>
          </div>
        )}
        {lesson.type === "audio" && (
          <div className="p-10 flex flex-col items-center gap-6 bg-gradient-to-br from-violet-500/10 to-fuchsia-700/10">
            <div className="h-24 w-24 rounded-full bg-primary/15 grid place-items-center text-primary text-3xl font-display font-bold">Audio</div>
            <audio controls src={contentSource} className="w-full max-w-md" />
          </div>
        )}
        {lesson.type === "text" && textLooksLikeHtml && (
          <article className="prose prose-invert max-w-none p-8 prose-headings:font-display prose-h2:text-2xl" dangerouslySetInnerHTML={{ __html: contentSource }} />
        )}
        {lesson.type === "text" && !textLooksLikeHtml && (
          <article className="p-8 text-sm leading-7 whitespace-pre-wrap text-foreground">{contentSource}</article>
        )}
        {lesson.type === "quiz" && (
          <div className="p-8">
            <QuizPlayer questions={lesson.questions || []} />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {prev ? (
          <Link to="/trainings/$id/lesson/$lessonId" params={{ id: training.id, lessonId: prev.id }} className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm hover:bg-accent">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Link>
        ) : <div />}

        <button
          type="button"
          onClick={() => {
            if (completed) {
              unmarkTrainingCompleted(student?.id, training.id);
            } else {
              markTrainingCompleted(student?.id, training.id);
            }
          }}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90"
        >
          <CheckCircle2 className="h-4 w-4" /> {completed ? "Reabrir treinamento" : "Concluir treinamento"}
        </button>

        {next ? (
          <Link to="/trainings/$id/lesson/$lessonId" params={{ id: training.id, lessonId: next.id }} className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm hover:bg-accent">
            Proxima <ChevronRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </div>
    </PortalShell>
  );
}
