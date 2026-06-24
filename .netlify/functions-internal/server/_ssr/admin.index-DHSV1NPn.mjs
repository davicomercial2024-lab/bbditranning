import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { A as BookOpen, P as Activity, a as TrendingUp, n as Users } from "../_libs/lucide-react.mjs";
import { c as usePortalData, n as StatCard, t as PortalShell } from "./portal-data-Cxlz1458.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DHSV1NPn.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const { trainings, students } = usePortalData();
	const avg = students.length > 0 ? Math.round(students.reduce((s, u) => s + u.progress, 0) / students.length) : 0;
	const completions = students.reduce((s, u) => s + u.completed, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Visão geral",
		subtitle: "Resumo do engajamento e desempenho dos colaboradores.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Treinamentos ativos",
					value: trainings.length,
					color: "amber",
					icon: BookOpen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Colaboradores",
					value: students.length,
					color: "info",
					icon: Users
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Progresso médio",
					value: `${avg}%`,
					color: "success",
					icon: TrendingUp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Conclusões",
					value: completions,
					color: "violet",
					icon: Activity
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3",
					children: "DESEMPENHO POR TREINAMENTO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border bg-card/60 p-5 space-y-4",
					children: trainings.map((t) => {
						const p = Math.round(t.completedLessons / t.totalLessons * 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-9 w-9 rounded-md bg-gradient-to-br ${t.cover} shrink-0` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: t.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground tabular-nums",
										children: [p, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-primary",
										style: { width: `${p}%` }
									})
								})]
							})]
						}, t.id);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3",
				children: "ATIVIDADE RECENTE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card/60 divide-y divide-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 text-sm text-muted-foreground",
					children: "Nenhuma atividade recente."
				})
			})] })]
		})]
	});
}
//#endregion
export { AdminDashboard as component };
