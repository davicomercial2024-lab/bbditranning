import { d as Link, i as useRouterState, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as getStoredSession } from "./auth.functions-Cn6A4SUf.mjs";
import { C as CirclePlay, T as ChevronRight, _ as FileTypeCorner, m as Headphones, v as FileText, w as CircleCheck } from "../_libs/lucide-react.mjs";
import { s as usePortalData, t as PortalShell } from "./portal-data-T52_kgG4.mjs";
import { t as Route } from "./trainings._id-BDEcMThS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trainings._id-Djx8OG4o.js
var import_jsx_runtime = require_jsx_runtime();
var typeIcon = {
	video: CirclePlay,
	pdf: FileTypeCorner,
	audio: Headphones,
	text: FileText
};
var typeLabel = {
	video: "Video",
	pdf: "PDF",
	audio: "Audio",
	text: "Texto"
};
function TrainingDetail() {
	const { id } = Route.useParams();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const session = getStoredSession();
	const { getStudentByEmail, getTraining, getVisibleTrainingsForStudent, isTrainingCompletedByStudent, markTrainingCompleted, unmarkTrainingCompleted } = usePortalData();
	const student = getStudentByEmail(session?.email);
	const visibleIds = new Set(getVisibleTrainingsForStudent(session?.email).map((training) => training.id));
	const training = getTraining(id);
	if (pathname !== `/trainings/${id}`) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (!training || !visibleIds.has(training.id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Treinamento nao encontrado",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Esse treinamento nao existe ou nao esta disponivel para o seu departamento."
		})
	});
	const completed = isTrainingCompletedByStudent(student?.id, training.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: training.title,
		subtitle: training.description,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `rounded-xl p-5 bg-gradient-to-br ${training.cover} border border-border/60 mb-8 flex items-center gap-6 flex-wrap`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					if (completed) unmarkTrainingCompleted(student?.id, training.id);
					else markTrainingCompleted(student?.id, training.id);
				},
				className: "inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), completed ? "Reabrir treinamento" : "Marcar treinamento como concluido"]
			})]
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
								className: `h-9 w-9 grid place-items-center rounded-md ${completed ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
								children: completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
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
