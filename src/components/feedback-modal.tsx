import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";

export function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  questions = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
  questions?: string[];
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  
  const isMultiQuestion = questions && questions.length > 0;
  const [ratings, setRatings] = useState<number[]>([]);
  const [hoverRatings, setHoverRatings] = useState<number[]>([]);

  useEffect(() => {
    if (isMultiQuestion) {
      setRatings(questions.map(() => 0));
      setHoverRatings(questions.map(() => 0));
    }
  }, [questions, isMultiQuestion]);

  if (!isOpen) return null;

  const isFormValid = isMultiQuestion 
    ? ratings.every((r) => r > 0)
    : rating > 0;

  const handleMultiSubmit = () => {
    const finalFeedback = JSON.stringify({
      ratings: questions.map((q, i) => ({ question: q, rating: ratings[i] })),
      comment: feedback
    });
    const averageRating = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
    onSubmit(averageRating, finalFeedback);
  };

  const setSingleHover = (index: number, val: number) => {
    const newH = [...hoverRatings];
    newH[index] = val;
    setHoverRatings(newH);
  };

  const setSingleRating = (index: number, val: number) => {
    const newR = [...ratings];
    newR[index] = val;
    setRatings(newR);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold">Avalie o Treinamento</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {isMultiQuestion ? (
            <div className="space-y-4">
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="flex flex-col items-start gap-1">
                  <div className="text-sm font-medium text-muted-foreground mb-1">{q}</div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSingleRating(qIndex, star)}
                        onMouseEnter={() => setSingleHover(qIndex, star)}
                        onMouseLeave={() => setSingleHover(qIndex, 0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            star <= (hoverRatings[qIndex] || ratings[qIndex])
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm font-medium text-muted-foreground">O quanto voce aprendeu hoje?</div>
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
              <div className="text-xs font-semibold uppercase tracking-wider text-primary h-4">
                {rating === 1 && "Ruim"}
                {rating === 2 && "Regular"}
                {rating === 3 && "Bom"}
                {rating === 4 && "Muito Bom"}
                {rating === 5 && "Excelente"}
              </div>
            </div>
          )}

          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Comentario Geral (Opcional)</span>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Deixe um comentário geral..."
              className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>

          <button
            onClick={() => {
              if (isFormValid) {
                if (isMultiQuestion) {
                  handleMultiSubmit();
                } else {
                  onSubmit(rating, feedback);
                }
              }
            }}
            disabled={!isFormValid}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar Avaliacao e Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
