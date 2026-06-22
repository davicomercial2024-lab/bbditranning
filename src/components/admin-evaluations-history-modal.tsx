import { X, Star } from "lucide-react";
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
  const { adminEvaluations, trainings } = usePortalData();

  if (!isOpen || !student) return null;

  const evaluations = adminEvaluations.filter(e => e.studentId === student.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h2 className="text-xl font-display font-semibold">Histórico de Práticas</h2>
            <p className="text-sm text-muted-foreground mt-1">Avaliações do colaborador {student.name}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 space-y-4">
          {evaluations.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              Nenhuma avaliação de prática registrada para este colaborador.
            </div>
          ) : (
            evaluations.map((ev, i) => {
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
        </div>
      </div>
    </div>
  );
}
