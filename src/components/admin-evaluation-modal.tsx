import { useState } from "react";
import { Star, X } from "lucide-react";
import { type Student, usePortalData } from "@/lib/portal-data";

export function AdminEvaluationModal({
  student,
  isOpen,
  onClose,
}: {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { trainings, saveAdminEvaluation } = usePortalData();
  const [selectedTrainingId, setSelectedTrainingId] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  if (!isOpen || !student) return null;

  // Filter trainings that have at least one practice lesson
  const practiceTrainings = trainings.filter(t => 
    t.modules.some(m => m.lessons.some(l => l.type === "practice"))
  );

  const selectedTraining = trainings.find(t => t.id === selectedTrainingId);
  const practiceLessons = selectedTraining 
    ? selectedTraining.modules.flatMap(m => m.lessons).filter(l => l.type === "practice")
    : [];

  const handleSubmit = () => {
    if (!selectedTrainingId || !selectedLessonId) {
      setError("Selecione um treinamento e uma aula.");
      return;
    }
    if (rating === 0) {
      setError("De a nota de avaliacao.");
      return;
    }

    saveAdminEvaluation({
      studentId: student.id,
      trainingId: selectedTrainingId,
      lessonId: selectedLessonId,
      rating,
      comments
    });
    
    // Reset state and close
    setSelectedTrainingId("");
    setSelectedLessonId("");
    setRating(0);
    setComments("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold">Avaliar Pratica Assistida</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            Avaliando o colaborador: <strong className="text-foreground">{student.name}</strong>
          </div>

          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Treinamento</span>
            <select 
              value={selectedTrainingId} 
              onChange={(e) => {
                setSelectedTrainingId(e.target.value);
                setSelectedLessonId("");
              }}
              className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Selecione um treinamento...</option>
              {practiceTrainings.map(t => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </label>

          {selectedTrainingId && (
            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Aula Pratica</span>
              <select 
                value={selectedLessonId} 
                onChange={(e) => setSelectedLessonId(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                <option value="">Selecione a aula...</option>
                {practiceLessons.map(l => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </select>
            </label>
          )}

          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Nota</div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <label className="block pt-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Comentarios Internos (Opcional)</span>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Anotacoes sobre o desempenho do aluno..."
              className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>

          {error && <div className="text-sm font-medium text-destructive">{error}</div>}

          <button
            onClick={handleSubmit}
            className="w-full mt-4 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Salvar Avaliacao
          </button>
        </div>
      </div>
    </div>
  );
}
