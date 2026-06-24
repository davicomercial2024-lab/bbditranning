import { d as Link, i as useRouterState, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as getStoredSession } from "./auth.functions-BzDK34tH.mjs";
import { D as ChevronRight, E as CircleCheck, T as CirclePlay, h as Headphones, p as Link$1, v as FileTypeCorner, w as CircleQuestionMark, y as FileText } from "../_libs/lucide-react.mjs";
import { c as usePortalData, s as useLessonProgress, t as PortalShell } from "./portal-data-Cxlz1458.mjs";
import { t as Route } from "./trainings._id-CVIDTX8k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trainings._id-CFoGFbHY.js
var import_jsx_runtime = require_jsx_runtime();
var typeIcon = {
	video: CirclePlay,
	pdf: FileTypeCorner,
	audio: Headphones,
	text: FileText,
	quiz: CircleQuestionMark,
	article: FileText,
	link: Link$1
};
var typeLabel = {
	video: "Video",
	pdf: "PDF",
	audio: "Audio",
	text: "Texto",
	quiz: "Quiz",
	article: "Artigo",
	link: "Link"
};
function TrainingDetail() {
	const { id } = Route.useParams();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const session = getStoredSession();
	const { getStudentByEmail, getTraining, getVisibleTrainingsForStudent, isTrainingCompletedByStudent, markTrainingCompleted, unmarkTrainingCompleted } = usePortalData();
	const student = getStudentByEmail(session?.email);
	const { isLessonCompleted } = useLessonProgress(student?.id);
	const visibleIds = new Set(getVisibleTrainingsForStudent(session?.email).map((training) => training.id));
	const training = getTraining(id);
	const flat = training?.modules.flatMap((m) => m.lessons) ?? [];
	const allLessonsCompleted = flat.every((l) => isLessonCompleted(l.id));
	const isSingleLessonTraining = flat.length === 1;
	const completed = isTrainingCompletedByStudent(student?.id, training?.id);
	const canCompleteTraining = isSingleLessonTraining || allLessonsCompleted || completed;
	if (pathname !== `/trainings/${id}`) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (!training || !visibleIds.has(training.id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Treinamento não encontrado",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Este conteúdo não está disponível ou foi removido."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: training.title,
		subtitle: "Detalhes do Treinamento",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-card p-6 border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-32 w-48 shrink-0 overflow-hidden rounded-lg bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: training.cover,
						alt: training.title,
						className: "h-full w-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-[220px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs uppercase tracking-wider text-foreground/70",
						children: [
							training.category,
							" - ",
							training.department ?? "Todos"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 text-xs text-foreground/70",
						children: [training.totalLessons, " aulas disponiveis"]
					})]
				}),
				canCompleteTraining ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (completed) unmarkTrainingCompleted(student?.id, training.id);
						else markTrainingCompleted(student?.id, training.id);
					},
					className: "inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), completed ? "Reabrir treinamento" : "Marcar treinamento como concluido"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: true,
					className: "inline-flex items-center gap-2 rounded-md bg-muted text-muted-foreground px-4 py-2.5 text-sm font-medium opacity-70 cursor-not-allowed",
					title: "Finalize todas as aulas para concluir",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Finalize todas as aulas"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: training.modules.map((module, moduleIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground tabular-nums",
					children: ["Modulo ", String(moduleIndex + 1).padStart(2, "0")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display font-semibold text-lg",
					children: module.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card/60 divide-y divide-border/60 overflow-hidden",
				children: module.lessons.map((lesson, lessonIndex) => {
					const Icon = typeIcon[lesson.type];
					const lessonDone = isLessonCompleted(lesson.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/trainings/$id/lesson/$lessonId",
						params: {
							id: training.id,
							lessonId: lesson.id
						},
						className: "flex items-center gap-4 px-4 py-3.5 hover:bg-accent/50 transition-colors group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground tabular-nums w-6",
								children: lessonIndex + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-9 w-9 grid place-items-center rounded-md ${lessonDone || completed ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
								children: lessonDone || completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium truncate",
									children: lesson.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										typeLabel[lesson.type],
										" - ",
										lesson.duration
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-foreground" })
						]
					}, lesson.id);
				})
			})] }, module.id))
		})]
	});
}
//#endregion
export { TrainingDetail as component };
