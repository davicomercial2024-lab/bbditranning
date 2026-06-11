import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Save, d as Pen, l as Plus, o as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { s as usePortalData, t as PortalShell } from "./portal-data-8SR4AXfH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.departments-eyFE3btc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDepartments() {
	const { departments, trainings, students, saveDepartment, deleteDepartment } = usePortalData();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	function handleSubmit(event) {
		event.preventDefault();
		if (!draft) return;
		const name = draft.name.trim();
		const duplicate = departments.some((department) => department.id !== draft.id && department.name.trim().toLowerCase() === name.toLowerCase());
		if (!name) {
			setError("Informe o nome do departamento.");
			return;
		}
		if (duplicate) {
			setError("Ja existe um departamento com esse nome.");
			return;
		}
		saveDepartment({
			...draft,
			name
		});
		setDraft(null);
		setError("");
	}
	function canDelete(department) {
		if (department.name === "Todos") return false;
		const usedByStudents = students.some((student) => student.department === department.name);
		const usedByTrainings = trainings.some((training) => (training.department ?? "Todos") === department.name);
		return !usedByStudents && !usedByTrainings;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Departamentos",
		subtitle: "Cadastre os departamentos usados para atribuir treinamentos.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setDraft({
				id: "",
				name: ""
			}),
			className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo departamento"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: departments.map((department) => {
					const trainingCount = trainings.filter((training) => (training.department ?? "Todos") === department.name).length;
					const studentCount = students.filter((student) => student.department === department.name).length;
					const deletable = canDelete(department);
					const editable = department.name !== "Todos";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-border bg-card/60 p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-semibold truncate",
									children: department.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										studentCount,
										" colaboradores - ",
										trainingCount,
										" treinamentos"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !editable,
									onClick: () => setDraft(department),
									className: "h-8 w-8 grid place-items-center rounded-md hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30",
									"aria-label": "Editar departamento",
									title: editable ? "Editar departamento" : "Departamento global",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !deletable,
									onClick: () => deleteDepartment(department.id),
									className: "h-8 w-8 grid place-items-center rounded-md text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-30",
									"aria-label": "Excluir departamento",
									title: deletable ? "Excluir departamento" : "Departamento em uso",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})]
							})]
						})
					}, department.id);
				})
			}), draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "rounded-xl border border-border bg-card/60 p-5 h-fit space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: draft.id ? "Editar departamento" : "Novo departamento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Esse nome aparece no cadastro de colaboradores e treinamentos."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDraft(null),
							className: "h-8 w-8 grid place-items-center rounded-md hover:bg-accent",
							"aria-label": "Fechar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "Nome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.name,
							onChange: (event) => setDraft({
								...draft,
								name: event.target.value
							}),
							className: "mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary",
							autoFocus: true
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar departamento"]
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminDepartments as component };
