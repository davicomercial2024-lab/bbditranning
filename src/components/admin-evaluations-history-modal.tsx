import { useState } from "react";
import { X, Star, BookOpen, ClipboardCheck } from "lucide-react";
import { type Student, usePortalData } from "@/lib/portal-data";

export function AdminEvaluationsHistoryModal({
  student,
  isOpen,
  onClose,
}: {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { adminEvaluations, feedbacks, trainings } = usePortalData();
  const [activeTab, setActiveTab] = useState<"practice" | "trainings">("practice");

  if (!isOpen || !student) return null;

  const practiceEvals = adminEvaluations.filter(e => e.studentId === student.id);
  const trainingFeedbacks = feedbacks ? feedbacks.filter(f => f.studentId === student.id) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <h2 className="text-xl font-display font-semibold">Histórico Completo</h2>
            <p className="text-sm text-muted-foreground mt-1">Colaborador: {student.name}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-4 border-b border-border shrink-0 mb-4">
          <button
            onClick={() => setActiveTab("practice")}
            className={`pb-2.5 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "practice"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardCheck className="h-4 w-4" />
            Avaliações do Admin
          </button>
          <button
            onClick={() => setActiveTab("trainings")}
            className={`pb-2.5 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "trainings"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Feedbacks de Treinamentos
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-2">
          {activeTab === "practice" && (
            <>
              {practiceEvals.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">
                  Nenhuma avaliação de prática registrada para este colaborador.
                </div>
              ) : (
                practiceEvals.map((ev, i) => {
                  const training = trainings.find(t => t.id === ev.trainingId);
                  let lessonTitle = "Aula Removida";
                  if (training) {
                    const lesson = training.modules.flatMap(m => m.lessons).find(l => l.id === ev.lessonId);
                    if (lesson) lessonTitle = lesson.title;
                  }

                  return (
                    <div key={ev.id || i} className="rounded-lg border border-border bg-accent/30 p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                            {training?.title || "Treinamento Removido"}
                          </div>
                          <div className="text-sm font-medium">{lessonTitle}</div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 bg-background px-2 py-1 rounded border border-border">
                          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-bold">{ev.rating}/5</span>
                        </div>
                      </div>
                      {ev.comments && (
                        <div className="mt-3 text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
                          "{ev.comments}"
                        </div>
                      )}
                      {ev.createdAt && (
                        <div className="mt-3 text-[10px] text-muted-foreground text-right">
                          {new Date(ev.createdAt).toLocaleString('pt-BR')}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}

          {activeTab === "trainings" && (
            <>
              {trainingFeedbacks.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">
                  Nenhum feedback de treinamento feito por este colaborador.
                </div>
              ) : (
                trainingFeedbacks.map((f, i) => {
                  const training = trainings.find(t => t.id === f.trainingId);
                  return (
                    <div key={i} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="text-sm font-medium">{training?.title || "Treinamento Removido"}</div>
                      </div>
                      
                      {f.feedback && (
                        <div className="mt-2">
                          {(() => {
                            try {
                              const parsed = JSON.parse(f.feedback);
                              if (parsed && parsed.ratings && Array.isArray(parsed.ratings)) {
                                return (
                                  <div className="space-y-3 bg-accent/30 p-3 rounded-md">
                                    {parsed.ratings.map((r: any, idx: number) => (
                                      <div key={idx} className="flex flex-col gap-1">
                                        <div className="text-[11px] text-muted-foreground">{r.question}</div>
                                        <div className="flex items-center gap-1">
                                          {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={`h-3 w-3 ${s <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                    {parsed.comment && (
                                      <div className="pt-2 mt-2 border-t border-border/50">
                                        <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1">Comentário Geral</div>
                                        <p className="text-xs italic text-foreground">"{parsed.comment}"</p>
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            } catch(e) {}
                            
                            return (
                              <p className="text-xs italic text-muted-foreground bg-accent/50 p-3 rounded-md">
                                "{f.feedback}"
                              </p>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
