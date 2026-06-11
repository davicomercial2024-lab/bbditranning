import { d as Link, i as useRouterState, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as getStoredSession } from "./auth.functions-BnxT7gQl.mjs";
import { s as usePortalData, t as PortalShell } from "./portal-data-8SR4AXfH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trainings-DjgcxNBo.js
var import_jsx_runtime = require_jsx_runtime();
function TrainingsList() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const session = getStoredSession();
	const { getStudentByEmail, getVisibleTrainingsForStudent, isTrainingCompletedByStudent } = usePortalData();
	const student = getStudentByEmail(session?.email);
	const trainings = getVisibleTrainingsForStudent(session?.email);
	if (pathname !== "/trainings") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Treinamentos",
		subtitle: "Treinamentos disponiveis para o seu departamento.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: trainings.map((training) => {
				const done = isTrainingCompletedByStudent(student?.id, training.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/trainings/$id",
					params: { id: training.id },
					className: "group rounded-xl border border-border bg-card/60 overflow-hidden hover:border-primary/40 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-32 bg-gradient-to-br ${training.cover}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: training.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display font-semibold",
									children: training.title
								}), done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary",
									children: "Concluido"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground line-clamp-2",
								children: training.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [training.totalLessons, " aulas"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: training.department ?? "Todos" })]
							})
						]
					})]
				}, training.id);
			})
		}), trainings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground",
			children: "Nenhum treinamento disponivel para o seu departamento."
		})]
	});
}
//#endregion
export { TrainingsList as component };
