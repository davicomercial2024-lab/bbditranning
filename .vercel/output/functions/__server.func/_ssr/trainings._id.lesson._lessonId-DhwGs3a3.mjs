import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as usePortalData } from "./portal-data-DzS8TpSK.mjs";
import { E as ChevronLeft, T as ChevronRight, b as ExternalLink, k as ArrowLeft, w as CircleCheck } from "../_libs/lucide-react.mjs";
import { i as getStoredSession, t as PortalShell } from "./portal-shell-n0aby6Gi.mjs";
import { t as Route } from "./trainings._id.lesson._lessonId-CKimSKi_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trainings._id.lesson._lessonId-DhwGs3a3.js
var import_jsx_runtime = require_jsx_runtime();
function normalizeGithubFileUrl(source) {
	try {
		const url = new URL(source);
		if (url.hostname !== "github.com") return source;
		const parts = url.pathname.split("/").filter(Boolean);
		const markerIndex = parts.findIndex((part) => part === "blob" || part === "raw");
		if (parts.length < 5 || markerIndex !== 2) return source;
		const [owner, repo, , branch, ...fileParts] = parts;
		return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fileParts.join("/")}`;
	} catch {
		return source;
	}
}
function LessonPage() {
	const { id, lessonId } = Route.useParams();
	const session = getStoredSession();
	const { getStudentByEmail, getTraining, getVisibleTrainingsForStudent, isTrainingCompletedByStudent, markTrainingCompleted, unmarkTrainingCompleted } = usePortalData();
	const student = getStudentByEmail(session?.email);
	const visibleIds = new Set(getVisibleTrainingsForStudent(session?.email).map((training) => training.id));
	const training = getTraining(id);
	const flat = training?.modules.flatMap((m) => m.lessons) ?? [];
	const idx = flat.findIndex((lesson) => lesson.id === lessonId);
	const lesson = idx >= 0 ? flat[idx] : null;
	const prev = idx > 0 ? flat[idx - 1] : null;
	const next = idx >= 0 ? flat[idx + 1] ?? null : null;
	if (!training || !lesson || !visibleIds.has(training.id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Aula nao encontrada",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Conteudo indisponivel."
		})
	});
	const textLooksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(lesson.source);
	const contentSource = lesson.type === "pdf" ? normalizeGithubFileUrl(lesson.source) : lesson.source;
	const completed = isTrainingCompletedByStudent(student?.id, training.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: lesson.title,
		subtitle: `${training.title} - ${lesson.duration}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/trainings/$id",
				params: { id: training.id },
				className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }),
					" Voltar para ",
					training.title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card/60 overflow-hidden",
				children: [
					lesson.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-video bg-black",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							src: lesson.source,
							title: lesson.title,
							className: "w-full h-full",
							allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
							allowFullScreen: true
						})
					}),
					lesson.type === "pdf" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 border-b border-border bg-card/80 p-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: "Arquivo PDF"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 break-all text-xs text-muted-foreground",
									children: contentSource
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: contentSource,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), " Abrir PDF"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[70vh] bg-black",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								src: contentSource,
								title: lesson.title,
								className: "h-full w-full"
							})
						})]
					}),
					lesson.type === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-10 flex flex-col items-center gap-6 bg-gradient-to-br from-violet-500/10 to-fuchsia-700/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-24 w-24 rounded-full bg-primary/15 grid place-items-center text-primary text-3xl font-display font-bold",
							children: "Audio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
							controls: true,
							src: contentSource,
							className: "w-full max-w-md"
						})]
					}),
					lesson.type === "text" && textLooksLikeHtml && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "prose prose-invert max-w-none p-8 prose-headings:font-display prose-h2:text-2xl",
						dangerouslySetInnerHTML: { __html: contentSource }
					}),
					lesson.type === "text" && !textLooksLikeHtml && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "p-8 text-sm leading-7 whitespace-pre-wrap text-foreground",
						children: contentSource
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-between gap-3",
				children: [
					prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/trainings/$id/lesson/$lessonId",
						params: {
							id: training.id,
							lessonId: prev.id
						},
						className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Anterior"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (completed) unmarkTrainingCompleted(student?.id, training.id);
							else markTrainingCompleted(student?.id, training.id);
						},
						className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
							" ",
							completed ? "Reabrir treinamento" : "Concluir treinamento"
						]
					}),
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/trainings/$id/lesson/$lessonId",
						params: {
							id: training.id,
							lessonId: next.id
						},
						className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm hover:bg-accent",
						children: ["Proxima ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
				]
			})
		]
	});
}
//#endregion
export { LessonPage as component };
