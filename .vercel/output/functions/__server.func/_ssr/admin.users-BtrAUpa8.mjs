import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Save, d as Pen, l as Plus, o as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { c as usePortalData, t as PortalShell } from "./portal-data-D2H2aWYH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-BtrAUpa8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyStudent = {
	id: "",
	name: "",
	email: "",
	department: "",
	progress: 0,
	lastActive: "Nunca acessou",
	trainings: 0,
	completed: 0
};
function Field({ label, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			...rest,
			className: "mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
		})]
	});
}
function AdminUsers() {
	const { students, departmentNames, saveStudent, deleteStudent } = usePortalData();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	function openDraft(student) {
		setError("");
		setDraft(student ? { ...student } : {
			...emptyStudent,
			department: departmentNames.find((name) => name !== "Todos") ?? ""
		});
	}
	function handleDeleteStudent(student) {
		deleteStudent(student.id);
		if (draft?.id === student.id) setDraft(null);
	}
	function handleSubmit(event) {
		event.preventDefault();
		if (!draft) return;
		const email = draft.email.trim().toLowerCase();
		if (students.some((student) => student.id !== draft.id && student.email.trim().toLowerCase() === email)) {
			setError("Ja existe um colaborador com este e-mail.");
			return;
		}
		if (!draft.department) {
			setError("Selecione um departamento.");
			return;
		}
		saveStudent({
			...draft,
			name: draft.name.trim(),
			email
		});
		setDraft(null);
		setError("");
	}
	function ProgressCell({ student }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 h-1.5 rounded-full bg-muted overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary",
					style: { width: `${student.progress}%` }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs tabular-nums w-10 text-right",
				children: [student.progress, "%"]
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Colaboradores",
		subtitle: "Acompanhe e edite os dados de cada aluno.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => openDraft(),
			className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo colaborador"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden overflow-x-auto rounded-xl border border-border bg-card/60 lg:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[860px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Colaborador"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Departamento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Ultimo acesso"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Concluidos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium w-64",
									children: "Progresso geral"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-5 py-3" })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: students.map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-accent/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-9 w-9 rounded-full bg-primary/15 text-primary grid place-items-center text-sm font-semibold",
												children: student.name.charAt(0)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium",
												children: student.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: student.email
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4 text-muted-foreground",
										children: student.department
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4 text-muted-foreground",
										children: student.lastActive
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-5 py-4 tabular-nums",
										children: [
											student.completed,
											"/",
											student.trainings
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, { student })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => openDraft(student),
												className: "inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" }), " Editar"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleDeleteStudent(student),
												className: "inline-flex items-center gap-2 rounded-md border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Excluir"]
											})]
										})
									})
								]
							}, student.id))
						})]
					}), students.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-10 text-center text-sm text-muted-foreground",
						children: "Nenhum colaborador cadastrado."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 lg:hidden",
					children: students.map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card/60 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium truncate",
										children: student.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground truncate",
										children: student.email
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => openDraft(student),
										className: "h-8 w-8 grid place-items-center rounded-md hover:bg-accent",
										"aria-label": "Editar colaborador",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleDeleteStudent(student),
										className: "h-8 w-8 grid place-items-center rounded-md text-destructive hover:bg-destructive/10",
										"aria-label": "Excluir colaborador",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-2 gap-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "Departamento"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: student.department
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "Ultimo acesso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: student.lastActive
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "Concluidos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1",
										children: [
											student.completed,
											"/",
											student.trainings
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "Progresso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1",
										children: [student.progress, "%"]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressCell, { student })
							})
						]
					}, student.id))
				}),
				draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "rounded-xl border border-border bg-card/60 p-5 h-fit space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: draft.id ? "Editar colaborador" : "Novo colaborador"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Login: e-mail cadastrado. Senha padrao: aluno123."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setDraft(null),
								className: "h-8 w-8 grid place-items-center rounded-md hover:bg-accent",
								"aria-label": "Fechar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome",
							value: draft.name,
							onChange: (event) => setDraft({
								...draft,
								name: event.target.value
							}),
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "E-mail",
							type: "email",
							value: draft.email,
							onChange: (event) => setDraft({
								...draft,
								email: event.target.value
							}),
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Departamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: draft.department,
								onChange: (event) => setDraft({
									...draft,
									department: event.target.value
								}),
								className: "mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary",
								required: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Selecione"
								}), departmentNames.filter((name) => name !== "Todos").map((department) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: department,
									children: department
								}, department))]
							})]
						}),
						draft.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-border bg-background/40 px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Ultimo acesso"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm",
								children: draft.lastActive
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-background/40 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "Treinos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm",
										children: draft.trainings
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-background/40 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "Concluidos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm",
										children: draft.completed
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-background/40 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "Progresso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-sm",
										children: [draft.progress, "%"]
									})]
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar colaborador"]
							}), draft.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleDeleteStudent(draft),
								className: "inline-flex w-full items-center justify-center gap-2 rounded-md border border-destructive/40 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Excluir colaborador"]
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AdminUsers as component };
