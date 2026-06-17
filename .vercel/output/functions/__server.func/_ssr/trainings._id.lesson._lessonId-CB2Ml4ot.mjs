import { o as __toESM } from "../_runtime.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as getStoredSession } from "./auth.functions-Cn6A4SUf.mjs";
import { A as ArrowLeft, E as ChevronLeft, T as ChevronRight, b as ExternalLink, w as CircleCheck } from "../_libs/lucide-react.mjs";
import { s as usePortalData, t as PortalShell } from "./portal-data-T52_kgG4.mjs";
import { t as Route } from "./trainings._id.lesson._lessonId-Dy40a7Bc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trainings._id.lesson._lessonId-CB2Ml4ot.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizPlayer({ questions }) {
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	if (!questions || questions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-muted-foreground",
		children: "Nenhuma pergunta neste quiz."
	});
	const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
	const passed = score === questions.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto space-y-8",
		children: [questions.map((q, qIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-lg font-medium text-foreground",
				children: [
					qIndex + 1,
					". ",
					q.question
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: q.options.map((opt, optIndex) => {
					const isSelected = answers[qIndex] === optIndex;
					const isCorrect = q.correctIndex === optIndex;
					let btnClass = "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ";
					if (!submitted) btnClass += isSelected ? "border-primary bg-primary/10 text-primary" : "border-border bg-card/50 hover:border-primary/50 text-foreground";
					else if (isCorrect) btnClass += "border-green-500 bg-green-500/10 text-green-500 font-medium";
					else if (isSelected && !isCorrect) btnClass += "border-red-500 bg-red-500/10 text-red-500";
					else btnClass += "border-border bg-card/20 text-muted-foreground opacity-50";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: submitted,
						onClick: () => setAnswers((prev) => ({
							...prev,
							[qIndex]: optIndex
						})),
						className: btnClass,
						children: opt
					}, optIndex);
				})
			})]
		}, qIndex)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pt-6 border-t border-border",
			children: !submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: Object.keys(answers).length < questions.length,
				onClick: () => setSubmitted(true),
				className: "w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
				children: "Finalizar Quiz"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `text-2xl font-display font-bold ${passed ? "text-green-500" : "text-amber-500"}`,
					children: passed ? "Parabens! Voce acertou tudo!" : `Voce acertou ${score} de ${questions.length}.`
				}), !passed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setAnswers({});
						setSubmitted(false);
					},
					className: "rounded-md border border-border bg-card px-6 py-2 text-sm font-medium hover:bg-accent",
					children: "Tentar Novamente"
				})]
			})
		})]
	});
}
function normalizeGithubFileUrl(source) {
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
function getValidVideoUrl(source) {
	if (!source) return "";
	if (source.includes("<iframe") && source.includes("src=")) {
		const match = source.match(/src=["'](.*?)["']/);
		if (match && match[1]) return match[1];
	}
	try {
		const url = new URL(source);
		if (url.hostname.includes("youtube.com") && url.pathname === "/watch") {
			const v = url.searchParams.get("v");
			if (v) return `https://www.youtube.com/embed/${v}`;
		}
		if (url.hostname === "youtu.be") {
			const v = url.pathname.slice(1);
			if (v) return `https://www.youtube.com/embed/${v}`;
		}
	} catch {}
	return source;
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
	if (!training || !lesson || !visibleIds.has(training.id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Aula nao encontrada",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Conteudo indisponivel."
		})
	});
	const textLooksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(lesson.source);
	const contentSource = lesson.type === "pdf" ? normalizeGithubFileUrl(lesson.source) : lesson.source;
	const completed = isTrainingCompletedByStudent(student?.id, training.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: lesson.title,
		subtitle: `${training.title} - ${lesson.duration}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/trainings/$id",
				params: { id: training.id },
				className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }),
					" Voltar para ",
					training.title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card/60 overflow-hidden",
				children: [
					lesson.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-video bg-black",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							src: getValidVideoUrl(lesson.source),
							title: lesson.title,
							className: "w-full h-full",
							allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
							allowFullScreen: true
						})
					}),
					lesson.type === "pdf" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 border-b border-border bg-card/80 p-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: "Arquivo PDF"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 break-all text-xs text-muted-foreground",
									children: contentSource
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: contentSource,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), " Abrir PDF"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[70vh] bg-black",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								src: contentSource,
								title: lesson.title,
								className: "h-full w-full"
							})
						})]
					}),
					lesson.type === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-10 flex flex-col items-center gap-6 bg-gradient-to-br from-violet-500/10 to-fuchsia-700/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-24 w-24 rounded-full bg-primary/15 grid place-items-center text-primary text-3xl font-display font-bold",
							children: "Audio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
							controls: true,
							src: contentSource,
							className: "w-full max-w-md"
						})]
					}),
					lesson.type === "text" && textLooksLikeHtml && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "prose prose-invert max-w-none p-8 prose-headings:font-display prose-h2:text-2xl",
						dangerouslySetInnerHTML: { __html: contentSource }
					}),
					lesson.type === "text" && !textLooksLikeHtml && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "p-8 text-sm leading-7 whitespace-pre-wrap text-foreground",
						children: contentSource
					}),
					lesson.type === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPlayer, { questions: lesson.questions || [] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-between gap-3",
				children: [
					prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/trainings/$id/lesson/$lessonId",
						params: {
							id: training.id,
							lessonId: prev.id
						},
						className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Anterior"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (completed) unmarkTrainingCompleted(student?.id, training.id);
							else markTrainingCompleted(student?.id, training.id);
						},
						className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
							" ",
							completed ? "Reabrir treinamento" : "Concluir treinamento"
						]
					}),
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/trainings/$id/lesson/$lessonId",
						params: {
							id: training.id,
							lessonId: next.id
						},
						className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm hover:bg-accent",
						children: ["Proxima ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
				]
			})
		]
	});
}
//#endregion
export { LessonPage as component };
