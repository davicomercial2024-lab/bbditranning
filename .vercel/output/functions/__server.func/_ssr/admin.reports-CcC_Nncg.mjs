import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as Clock, a as TrendingUp, n as Users, w as CircleCheck, x as Download } from "../_libs/lucide-react.mjs";
import { n as StatCard, s as usePortalData, t as PortalShell } from "./portal-data-T52_kgG4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-CcC_Nncg.js
var import_jsx_runtime = require_jsx_runtime();
function Reports() {
	const { students, trainings } = usePortalData();
	const avg = students.length > 0 ? Math.round(students.reduce((s, u) => s + u.progress, 0) / students.length) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Relatórios",
		subtitle: "Engajamento e desempenho consolidados.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Exportar CSV"]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Engajamento",
					value: `${avg}%`,
					color: "amber",
					icon: TrendingUp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Usuários ativos",
					value: students.filter((s) => s.progress > 0).length,
					color: "info",
					icon: Users
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Horas totais",
					value: "142h",
					color: "success",
					icon: Clock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Conclusões",
					value: students.reduce((s, u) => s + u.completed, 0),
					color: "violet",
					icon: CircleCheck
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3",
				children: "TOP COLABORADORES"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card/60 divide-y divide-border/60",
				children: [...students].sort((a, b) => b.progress - a.progress).slice(0, 5).map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-3.5 flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground tabular-nums w-5",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded-full bg-primary/15 text-primary grid place-items-center text-xs font-semibold",
							children: u.name.charAt(0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium truncate",
								children: u.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: u.department
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-display font-semibold text-primary tabular-nums",
							children: [u.progress, "%"]
						})
					]
				}, u.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3",
				children: "CONCLUSÃO POR TREINAMENTO"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card/60 p-5 space-y-4",
				children: trainings.map((t) => {
					const p = Math.round(t.completedLessons / t.totalLessons * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: t.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground tabular-nums",
							children: [p, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 rounded-full bg-muted overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-primary",
							style: { width: `${p}%` }
						})
					})] }, t.id);
				})
			})] })]
		})]
	});
}
//#endregion
export { Reports as component };
