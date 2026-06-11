import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { type FormEvent, type InputHTMLAttributes, useEffect, useState } from "react";
import { emptyLesson, emptyModule, emptyTraining, recalculateTraining, usePortalData, type LessonType, type Training } from "@/lib/portal-data";

function Field({ label, ...rest }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
    </label>
  );
}

export function AdminTrainingForm({ training }: { training?: Training }) {
  const navigate = useNavigate();
  const { saveTraining, coverOptions, departmentNames } = usePortalData();
  const [draft, setDraft] = useState<Training>(() => recalculateTraining(training ?? emptyTraining()));
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(recalculateTraining(training ?? emptyTraining()));
  }, [training]);

  function updateModule(moduleIndex: number, title: string) {
    setDraft((current) => ({
      ...current,
      modules: current.modules.map((module, index) => (index === moduleIndex ? { ...module, title } : module)),
    }));
  }

  function updateLesson(moduleIndex: number, lessonIndex: number, field: "title" | "type" | "duration" | "source" | "questions", value: any) {
    setDraft((current) => ({
      ...current,
      modules: current.modules.map((module, index) =>
        index === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.map((lesson, currentLessonIndex) =>
                currentLessonIndex === lessonIndex
                  ? {
                      ...lesson,
                      [field]: field === "type" ? (value as LessonType) : value,
                      ...(field === "type" && value === "text" && lesson.source === "#" ? { source: "" } : {}),
                    }
                  : lesson,
              ),
            }
          : module,
      ),
    }));
  }

  function addModule() {
    setDraft((current) => ({
      ...current,
      modules: [...current.modules, emptyModule(current.modules.length + 1)],
    }));
  }

  function removeModule(moduleIndex: number) {
    setDraft((current) => ({
      ...current,
      modules: current.modules.filter((_, index) => index !== moduleIndex),
    }));
  }

  function addLesson(moduleIndex: number) {
    setDraft((current) => ({
      ...current,
      modules: current.modules.map((module, index) =>
        index === moduleIndex ? { ...module, lessons: [...module.lessons, emptyLesson(module.lessons.length + 1)] } : module,
      ),
    }));
  }

  function removeLesson(moduleIndex: number, lessonIndex: number) {
    setDraft((current) => ({
      ...current,
      modules: current.modules.map((module, index) =>
        index === moduleIndex ? { ...module, lessons: module.lessons.filter((_, currentLessonIndex) => currentLessonIndex !== lessonIndex) } : module,
      ),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaned = recalculateTraining({
      ...draft,
      title: draft.title.trim(),
      category: draft.category.trim(),
      description: draft.description.trim(),
      modules: draft.modules
        .map((module) => ({
          ...module,
          title: module.title.trim(),
          lessons: module.lessons
            .map((lesson) => ({
              ...lesson,
              title: lesson.title.trim(),
              duration: lesson.duration.trim(),
              source: lesson.source.trim() || (lesson.type === "text" ? "<p>Conteudo em preparacao.</p>" : "#"),
            }))
            .filter((lesson) => lesson.title.length > 0),
        }))
        .filter((module) => module.title.length > 0),
    });

    if (!cleaned.title || !cleaned.category || !cleaned.description) {
      setError("Preencha titulo, categoria e descricao antes de salvar.");
      return;
    }

    if (cleaned.modules.length === 0 || cleaned.totalLessons === 0) {
      setError("Adicione pelo menos um modulo com uma aula nomeada.");
      return;
    }

    const saved = saveTraining(cleaned);
    void navigate({ to: "/admin/trainings" });
    return saved;
  }

  return (
    <>
      <Link to="/admin/trainings" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="rounded-xl border border-border bg-card/60 p-6 space-y-4">
          <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70">INFORMACOES</div>
          <Field label="Titulo" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Categoria" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Departamento</span>
              <select
                value={draft.department ?? "Todos"}
                onChange={(event) => setDraft({ ...draft, department: event.target.value })}
                className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                {departmentNames.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Capa</span>
              <select
                value={draft.cover}
                onChange={(event) => setDraft({ ...draft, cover: event.target.value })}
                className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                {coverOptions.map((cover, index) => (
                  <option key={cover} value={cover}>
                    Capa {index + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Descricao</span>
            <textarea
              rows={3}
              value={draft.description}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70">MODULOS E AULAS</div>
            <button type="button" onClick={addModule} className="inline-flex items-center gap-2 text-xs rounded-md border border-border px-3 py-1.5 hover:bg-accent">
              <Plus className="h-3.5 w-3.5" /> Adicionar modulo
            </button>
          </div>

          <div className="space-y-4">
            {draft.modules.map((module, moduleIndex) => (
              <div key={module.id} className="rounded-lg border border-border/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <input
                    value={module.title}
                    onChange={(event) => updateModule(moduleIndex, event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm font-display font-semibold outline-none"
                  />
                  <button type="button" onClick={() => removeModule(moduleIndex)} className="text-muted-foreground hover:text-destructive" aria-label="Remover modulo">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="rounded-md border border-border bg-background/40 px-3 py-3">
                      <div className="grid gap-2 md:grid-cols-[110px_1fr_110px_28px]">
                        <select value={lesson.type} onChange={(event) => updateLesson(moduleIndex, lessonIndex, "type", event.target.value)} className="bg-transparent text-xs text-muted-foreground outline-none">
                          <option value="video">Video</option>
                          <option value="pdf">PDF</option>
                          <option value="audio">Audio</option>
                          <option value="text">Texto</option>
                          <option value="quiz">Quiz</option>
                        </select>
                        <input value={lesson.title} onChange={(event) => updateLesson(moduleIndex, lessonIndex, "title", event.target.value)} placeholder="Titulo da aula" className="bg-transparent text-sm outline-none" />
                        <input value={lesson.duration} onChange={(event) => updateLesson(moduleIndex, lessonIndex, "duration", event.target.value)} placeholder="Duracao" className="bg-transparent text-sm outline-none" />
                        <button type="button" onClick={() => removeLesson(moduleIndex, lessonIndex)} className="text-muted-foreground hover:text-destructive" aria-label="Remover aula">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {lesson.type === "text" ? (
                        <textarea
                          value={lesson.source}
                          onChange={(event) => updateLesson(moduleIndex, lessonIndex, "source", event.target.value)}
                          placeholder="Escreva aqui o texto que o aluno vai visualizar no portal."
                          rows={6}
                          className="mt-3 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      ) : lesson.type === "quiz" ? (
                        <div className="mt-4 space-y-4 rounded-md border border-border/50 bg-background/20 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Perguntas do Quiz</span>
                            <button
                              type="button"
                              onClick={() => {
                                const q = lesson.questions || [];
                                updateLesson(moduleIndex, lessonIndex, "questions" as any, [...q, { question: "", options: ["", "", "", ""], correctIndex: 0 }] as any);
                              }}
                              className="inline-flex items-center gap-1.5 text-xs text-primary hover:opacity-80"
                            >
                              <Plus className="h-3.5 w-3.5" /> Adicionar pergunta
                            </button>
                          </div>
                          {(lesson.questions || []).map((q, qIndex) => (
                            <div key={qIndex} className="relative rounded border border-border/60 bg-background/50 p-3 pt-5">
                              <button
                                type="button"
                                onClick={() => {
                                  const qs = [...(lesson.questions || [])];
                                  qs.splice(qIndex, 1);
                                  updateLesson(moduleIndex, lessonIndex, "questions" as any, qs as any);
                                }}
                                className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                              <input
                                value={q.question}
                                onChange={(e) => {
                                  const qs = [...(lesson.questions || [])];
                                  qs[qIndex].question = e.target.value;
                                  updateLesson(moduleIndex, lessonIndex, "questions" as any, qs as any);
                                }}
                                placeholder="Digite a pergunta"
                                className="mb-3 w-full border-b border-border bg-transparent pb-1 text-sm font-medium outline-none placeholder:text-muted-foreground/50 focus:border-primary"
                              />
                              <div className="space-y-2 pl-2">
                                {q.options.map((opt, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`quiz-${moduleIndex}-${lessonIndex}-${qIndex}`}
                                      checked={q.correctIndex === optIndex}
                                      onChange={() => {
                                        const qs = [...(lesson.questions || [])];
                                        qs[qIndex].correctIndex = optIndex;
                                        updateLesson(moduleIndex, lessonIndex, "questions" as any, qs as any);
                                      }}
                                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary"
                                    />
                                    <input
                                      value={opt}
                                      onChange={(e) => {
                                        const qs = [...(lesson.questions || [])];
                                        qs[qIndex].options[optIndex] = e.target.value;
                                        updateLesson(moduleIndex, lessonIndex, "questions" as any, qs as any);
                                      }}
                                      placeholder={`Opcao ${optIndex + 1}`}
                                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                          {(!lesson.questions || lesson.questions.length === 0) && (
                            <div className="text-center text-xs text-muted-foreground">Nenhuma pergunta adicionada.</div>
                          )}
                        </div>
                      ) : (
                        <input
                          value={lesson.source}
                          onChange={(event) => updateLesson(moduleIndex, lessonIndex, "source", event.target.value)}
                          placeholder={lesson.type === "pdf" ? "URL do arquivo PDF" : lesson.type === "audio" ? "URL do audio" : "URL/embed do video"}
                          className="mt-3 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addLesson(moduleIndex)} className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mt-2">
                    <Plus className="h-3.5 w-3.5" /> Adicionar aula
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {error && <div className="mr-auto rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}
          <Link to="/admin/trainings" className="rounded-md border border-border px-4 py-2.5 text-sm hover:bg-accent">Cancelar</Link>
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90">
            <Save className="h-4 w-4" /> Salvar treinamento
          </button>
        </div>
      </form>
    </>
  );
}
