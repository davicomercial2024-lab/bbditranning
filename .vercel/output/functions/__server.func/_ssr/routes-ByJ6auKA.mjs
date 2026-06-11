import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as getStoredSession } from "./auth.functions-BnxT7gQl.mjs";
import { C as CirclePlay, O as BookOpen, S as Clock, g as Flame, w as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as StatCard, s as usePortalData, t as PortalShell } from "./portal-data-8SR4AXfH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ByJ6auKA.js
var import_jsx_runtime = require_jsx_runtime();
function StudentDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Visão geral",
		subtitle: "Bons treinos. Continue de onde parou ou explore novos modulos.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardContent, {})
	});
}
function DashboardContent() {
	const session = getStoredSession();
	const { getStudentByEmail, getVisibleTrainingsForStudent, isTrainingCompletedByStudent } = usePortalData();
	const student = getStudentByEmail(session?.email);
	const trainings = getVisibleTrainingsForStudent(session?.email);
	const completed = trainings.filter((training) => isTrainingCompletedByStudent(student?.id, training.id));
	const inProgress = trainings.filter((training) => !isTrainingCompletedByStudent(student?.id, training.id));
	const continueTraining = inProgress[0] ?? trainings[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Treinamentos ativos",
					value: trainings.length,
					color: "amber",
					icon: BookOpen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Treinos concluidos",
					value: completed.length,
					color: "info",
					icon: CircleCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pendentes",
					value: inProgress.length,
					color: "success",
					icon: Clock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Progresso",
					value: `${student?.progress ?? 0}%`,
					color: "violet",
					icon: Flame
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70 mb-3",
				children: "CONTINUAR TREINAMENTO"
			}), continueTraining ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `rounded-2xl p-6 md:p-8 bg-gradient-to-br ${continueTraining.cover} border border-border/60 relative overflow-hidden`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-foreground/70",
							children: continueTraining.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl md:text-3xl font-display font-bold",
							children: continueTraining.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-foreground/80",
							children: continueTraining.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/trainings/$id",
							params: { id: continueTraining.id },
							className: "mt-6 inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-4 w-4" }), " Abrir treinamento"]
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground",
				children: "Nenhum treinamento disponivel para o seu departamento."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70",
				children: "SEUS TREINAMENTOS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/trainings",
				className: "text-xs text-muted-foreground hover:text-foreground",
				children: "Ver todos"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: trainings.map((training) => {
				const done = isTrainingCompletedByStudent(student?.id, training.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/trainings/$id",
					params: { id: training.id },
					className: "group rounded-xl border border-border bg-card/60 overflow-hidden hover:border-primary/40 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-28 bg-gradient-to-br ${training.cover} relative`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-2 left-3 text-[10px] uppercase tracking-wider text-foreground/80 bg-background/40 backdrop-blur px-2 py-0.5 rounded",
							children: training.category
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display font-semibold text-base",
									children: training.title
								}), done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary",
									children: "Concluido"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground line-clamp-2",
								children: training.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-xs text-muted-foreground",
								children: [training.totalLessons, " aulas"]
							})
						]
					})]
				}, training.id);
			})
		})] })
	] });
}
//#endregion
export { StudentDashboard as component };
