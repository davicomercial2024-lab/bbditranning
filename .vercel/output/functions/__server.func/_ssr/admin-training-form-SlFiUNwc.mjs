import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as Save, k as ArrowLeft, l as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { a as emptyTraining, c as usePortalData, i as emptyModule, r as emptyLesson, s as recalculateTraining } from "./portal-data-D2H2aWYH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-training-form-SlFiUNwc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function AdminTrainingForm({ training }) {
	const navigate = useNavigate();
	const { saveTraining, coverOptions, departmentNames } = usePortalData();
	const [draft, setDraft] = (0, import_react.useState)(() => recalculateTraining(training ?? emptyTraining()));
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setDraft(recalculateTraining(training ?? emptyTraining()));
	}, [training]);
	function updateModule(moduleIndex, title) {
		setDraft((current) => ({
			...current,
			modules: current.modules.map((module, index) => index === moduleIndex ? {
				...module,
				title
			} : module)
		}));
	}
	function updateLesson(moduleIndex, lessonIndex, field, value) {
		setDraft((current) => ({
			...current,
			modules: current.modules.map((module, index) => index === moduleIndex ? {
				...module,
				lessons: module.lessons.map((lesson, currentLessonIndex) => currentLessonIndex === lessonIndex ? {
					...lesson,
					[field]: field === "type" ? value : value,
					...field === "type" && value === "text" && lesson.source === "#" ? { source: "" } : {}
				} : lesson)
			} : module)
		}));
	}
	function addModule() {
		setDraft((current) => ({
			...current,
			modules: [...current.modules, emptyModule(current.modules.length + 1)]
		}));
	}
	function removeModule(moduleIndex) {
		setDraft((current) => ({
			...current,
			modules: current.modules.filter((_, index) => index !== moduleIndex)
		}));
	}
	function addLesson(moduleIndex) {
		setDraft((current) => ({
			...current,
			modules: current.modules.map((module, index) => index === moduleIndex ? {
				...module,
				lessons: [...module.lessons, emptyLesson(module.lessons.length + 1)]
			} : module)
		}));
	}
	function removeLesson(moduleIndex, lessonIndex) {
		setDraft((current) => ({
			...current,
			modules: current.modules.map((module, index) => index === moduleIndex ? {
				...module,
				lessons: module.lessons.filter((_, currentLessonIndex) => currentLessonIndex !== lessonIndex)
			} : module)
		}));
	}
	function handleSubmit(event) {
		event.preventDefault();
		const cleaned = recalculateTraining({
			...draft,
			title: draft.title.trim(),
			category: draft.category.trim(),
			description: draft.description.trim(),
			modules: draft.modules.map((module) => ({
				...module,
				title: module.title.trim(),
				lessons: module.lessons.map((lesson) => ({
					...lesson,
					title: lesson.title.trim(),
					duration: lesson.duration.trim(),
					source: lesson.source.trim() || (lesson.type === "text" ? "<p>Conteudo em preparacao.</p>" : "#")
				})).filter((lesson) => lesson.title.length > 0)
			})).filter((module) => module.title.length > 0)
		});
		if (!cleaned.title || !cleaned.category || !cleaned.description) {
			setError("Preencha titulo, categoria e descricao antes de salvar.");
			return;
		}
		if (cleaned.modules.length === 0 || cleaned.totalLessons === 0) {
			setError("Adicione pelo menos um modulo com uma aula nomeada.");
			return;
		}
		const saved = saveTraining(cleaned);
		navigate({ to: "/admin/trainings" });
		return saved;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/admin/trainings",
		className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Voltar"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-6 max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card/60 p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70",
						children: "INFORMACOES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Titulo",
						value: draft.title,
						onChange: (event) => setDraft({
							...draft,
							title: event.target.value
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Categoria",
							value: draft.category,
							onChange: (event) => setDraft({
								...draft,
								category: event.target.value
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Departamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: draft.department ?? "Todos",
								onChange: (event) => setDraft({
									...draft,
									department: event.target.value
								}),
								className: "mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary",
								children: departmentNames.map((department) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: department,
									children: department
								}, department))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Capa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: draft.cover,
								onChange: (event) => setDraft({
									...draft,
									cover: event.target.value
								}),
								className: "mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary",
								children: coverOptions.map((cover, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: cover,
									children: ["Capa ", index + 1]
								}, cover))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "Descricao"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: draft.description,
							onChange: (event) => setDraft({
								...draft,
								description: event.target.value
							}),
							className: "mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card/60 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70",
						children: "MODULOS E AULAS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addModule,
						className: "inline-flex items-center gap-2 text-xs rounded-md border border-border px-3 py-1.5 hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Adicionar modulo"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: draft.modules.map((module, moduleIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/70 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: module.title,
								onChange: (event) => updateModule(moduleIndex, event.target.value),
								className: "min-w-0 flex-1 bg-transparent text-sm font-display font-semibold outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeModule(moduleIndex),
								className: "text-muted-foreground hover:text-destructive",
								"aria-label": "Remover modulo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2",
							children: [module.lessons.map((lesson, lessonIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-background/40 px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 md:grid-cols-[110px_1fr_110px_28px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: lesson.type,
											onChange: (event) => updateLesson(moduleIndex, lessonIndex, "type", event.target.value),
											className: "bg-transparent text-xs text-muted-foreground outline-none",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "video",
													children: "Video"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "pdf",
													children: "PDF"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "audio",
													children: "Audio"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "text",
													children: "Texto"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: lesson.title,
											onChange: (event) => updateLesson(moduleIndex, lessonIndex, "title", event.target.value),
											placeholder: "Titulo da aula",
											className: "bg-transparent text-sm outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: lesson.duration,
											onChange: (event) => updateLesson(moduleIndex, lessonIndex, "duration", event.target.value),
											placeholder: "Duracao",
											className: "bg-transparent text-sm outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => removeLesson(moduleIndex, lessonIndex),
											className: "text-muted-foreground hover:text-destructive",
											"aria-label": "Remover aula",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								}), lesson.type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: lesson.source,
									onChange: (event) => updateLesson(moduleIndex, lessonIndex, "source", event.target.value),
									placeholder: "Escreva aqui o texto que o aluno vai visualizar no portal.",
									rows: 6,
									className: "mt-3 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: lesson.source,
									onChange: (event) => updateLesson(moduleIndex, lessonIndex, "source", event.target.value),
									placeholder: lesson.type === "pdf" ? "URL do arquivo PDF" : lesson.type === "audio" ? "URL do audio" : "URL/embed do video",
									className: "mt-3 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
								})]
							}, lesson.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => addLesson(moduleIndex),
								className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Adicionar aula"]
							})]
						})]
					}, module.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-3",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mr-auto rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/trainings",
						className: "rounded-md border border-border px-4 py-2.5 text-sm hover:bg-accent",
						children: "Cancelar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Salvar treinamento"]
					})
				]
			})
		]
	})] });
}
//#endregion
export { AdminTrainingForm as t };
