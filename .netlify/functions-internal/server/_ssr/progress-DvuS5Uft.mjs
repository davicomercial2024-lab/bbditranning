import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as getStoredSession } from "./auth.functions-BzDK34tH.mjs";
import { C as Clock, E as CircleCheck, _ as Flame, i as Trophy } from "../_libs/lucide-react.mjs";
import { c as usePortalData, n as StatCard, t as PortalShell } from "./portal-data-Cxlz1458.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DvuS5Uft.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Meu progresso",
		subtitle: "Acompanhe o seu desempenho e conclusoes.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressContent, {})
	});
}
function ProgressContent() {
	const session = getStoredSession();
	const { getStudentByEmail, getVisibleTrainingsForStudent, isTrainingCompletedByStudent } = usePortalData();
	const student = getStudentByEmail(session?.email);
	const trainings = getVisibleTrainingsForStudent(session?.email);
	const completedCount = trainings.filter((training) => isTrainingCompletedByStudent(student?.id, training.id)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Progresso geral",
				value: `${trainings.length > 0 ? Math.round(completedCount / trainings.length * 100) : 0}%`,
				color: "amber",
				icon: Trophy
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Treinos concluidos",
				value: completedCount,
				color: "info",
				icon: CircleCheck
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Treinos atribuidos",
				value: trainings.length,
				color: "success",
				icon: Clock
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Departamento",
				value: student?.department ?? "-",
				color: "violet",
				icon: Flame
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card/60 divide-y divide-border/60 overflow-hidden",
		children: [trainings.map((training) => {
			const done = isTrainingCompletedByStudent(student?.id, training.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 flex items-center gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-12 w-12 rounded-lg bg-gradient-to-br ${training.cover} shrink-0` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display font-semibold truncate",
								children: training.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground tabular-nums shrink-0",
								children: [training.totalLessons, " aulas"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-primary",
								style: { width: done ? "100%" : "0%" }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium tabular-nums w-24 text-right",
						children: done ? "Concluido" : "Pendente"
					})
				]
			}, training.id);
		}), trainings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-6 text-sm text-muted-foreground",
			children: "Nenhum treinamento disponivel para o seu departamento."
		})]
	})] });
}
//#endregion
export { ProgressPage as component };
