import { d as Link, i as useRouterState, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as usePortalData } from "./portal-data-DzS8TpSK.mjs";
import { l as Plus, o as Trash2, u as Pencil } from "../_libs/lucide-react.mjs";
import { t as PortalShell } from "./portal-shell-n0aby6Gi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.trainings-DvVCpq-3.js
var import_jsx_runtime = require_jsx_runtime();
function AdminTrainings() {
	const { trainings, deleteTraining } = usePortalData();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	if (pathname !== "/admin/trainings" && pathname !== "/admin/trainings/") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Treinamentos",
		subtitle: "Crie, edite e organize os treinamentos do portal.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/admin/trainings/new",
			className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo treinamento"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card/60 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "Treinamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "Categoria"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: "Departamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium text-right",
							children: "Modulos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium text-right",
							children: "Aulas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-5 py-3" })
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border/60",
					children: trainings.map((training) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-accent/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-9 w-9 rounded-md bg-gradient-to-br ${training.cover} shrink-0` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: training.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground line-clamp-1",
										children: training.description
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-muted-foreground",
								children: training.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-muted-foreground",
								children: training.department ?? "Todos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-right tabular-nums",
								children: training.modules.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-right tabular-nums",
								children: training.totalLessons
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin/trainings/edit/$id",
										params: { id: training.id },
										className: "h-8 w-8 grid place-items-center rounded-md hover:bg-accent",
										"aria-label": "Editar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => deleteTraining(training.id),
										className: "h-8 w-8 grid place-items-center rounded-md hover:bg-accent text-destructive",
										"aria-label": "Remover",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})
							})
						]
					}, training.id))
				})]
			}), trainings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-10 text-center text-sm text-muted-foreground",
				children: "Nenhum treinamento cadastrado."
			})]
		})
	});
}
//#endregion
export { AdminTrainings as component };
