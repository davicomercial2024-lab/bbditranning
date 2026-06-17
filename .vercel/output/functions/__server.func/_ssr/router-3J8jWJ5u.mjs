import { o as __toESM } from "../_runtime.mjs";
import { c as lazyRouteComponent, d as Link, l as createFileRoute, n as Scripts, o as createRouter, p as useRouter, r as HeadContent, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react, o as require_jsx_runtime, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$11 } from "./admin.trainings.edit._id-CHS62cbt.mjs";
import { t as Route$12 } from "./login-B3EiwESj.mjs";
import { t as Route$13 } from "./trainings._id-CVIDTX8k.mjs";
import { t as Route$14 } from "./trainings._id.lesson._lessonId-B_Yx2r6c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-3J8jWJ5u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DAgLLuUt.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground text-left",
					children: [
						"Something went wrong on our end. You can try refreshing or head back home.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-red-500 break-words block max-w-full p-2 rounded bg-red-500/10",
							children: ["Error: ", error?.message || String(error)]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BBDI Trainning" },
			{
				name: "description",
				content: "Portal de treinamento para colaboradores BBDI."
			},
			{
				name: "author",
				content: "BBDI"
			},
			{
				property: "og:title",
				content: "BBDI Trainning"
			},
			{
				property: "og:description",
				content: "Portal de treinamento para colaboradores BBDI."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/logo.svg"
			},
			{
				rel: "alternate icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$9 = () => import("./trainings-Bs2cq7BQ.mjs");
var Route$9 = createFileRoute("/trainings")({
	head: () => ({ meta: [{ title: "Treinamentos - BBDI Trainning" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./progress-DvuS5Uft.mjs");
var Route$8 = createFileRoute("/progress")({
	head: () => ({ meta: [{ title: "Meu progresso - BBDI Trainning" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./profile-B6U60CEf.mjs");
var Route$7 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Perfil - BBDI Trainning" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./routes-DwDKiPhJ.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "BBDI Trainning - Portal do aluno" }, {
		name: "description",
		content: "Portal de treinamento de novos colaboradores BBDI."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.index-DHSV1NPn.mjs");
var Route$5 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin — BBDI Trainning" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.users-Dk7ub2Ly.mjs");
var Route$4 = createFileRoute("/admin/users")({
	head: () => ({ meta: [{ title: "Colaboradores - BBDI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.trainings-X_fhmTiG.mjs");
var Route$3 = createFileRoute("/admin/trainings")({
	head: () => ({ meta: [{ title: "Gerenciar treinamentos - BBDI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.reports-C3mFFYuW.mjs");
var Route$2 = createFileRoute("/admin/reports")({
	head: () => ({ meta: [{ title: "Relatórios — BBDI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.departments-DpR5TXsL.mjs");
var Route$1 = createFileRoute("/admin/departments")({
	head: () => ({ meta: [{ title: "Departamentos - BBDI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.trainings.new-CnK_Wshj.mjs");
var Route = createFileRoute("/admin/trainings/new")({
	head: () => ({ meta: [{ title: "Novo treinamento - BBDI" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TrainingsRoute = Route$9.update({
	id: "/trainings",
	path: "/trainings",
	getParentRoute: () => Route$10
});
var ProgressRoute = Route$8.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$10
});
var ProfileRoute = Route$7.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$10
});
var LoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$10
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AdminIndexRoute = Route$5.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$10
});
var TrainingsIdRoute = Route$13.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => TrainingsRoute
});
var AdminUsersRoute = Route$4.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => Route$10
});
var AdminTrainingsRoute = Route$3.update({
	id: "/admin/trainings",
	path: "/admin/trainings",
	getParentRoute: () => Route$10
});
var AdminReportsRoute = Route$2.update({
	id: "/admin/reports",
	path: "/admin/reports",
	getParentRoute: () => Route$10
});
var AdminDepartmentsRoute = Route$1.update({
	id: "/admin/departments",
	path: "/admin/departments",
	getParentRoute: () => Route$10
});
var AdminTrainingsNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminTrainingsRoute
});
var TrainingsIdLessonLessonIdRoute = Route$14.update({
	id: "/lesson/$lessonId",
	path: "/lesson/$lessonId",
	getParentRoute: () => TrainingsIdRoute
});
var AdminTrainingsEditIdRoute = Route$11.update({
	id: "/edit/$id",
	path: "/edit/$id",
	getParentRoute: () => AdminTrainingsRoute
});
var TrainingsIdRouteChildren = { TrainingsIdLessonLessonIdRoute };
var TrainingsRouteChildren = { TrainingsIdRoute: TrainingsIdRoute._addFileChildren(TrainingsIdRouteChildren) };
var TrainingsRouteWithChildren = TrainingsRoute._addFileChildren(TrainingsRouteChildren);
var AdminTrainingsRouteChildren = {
	AdminTrainingsNewRoute,
	AdminTrainingsEditIdRoute
};
var rootRouteChildren = {
	IndexRoute,
	LoginRoute,
	ProfileRoute,
	ProgressRoute,
	TrainingsRoute: TrainingsRouteWithChildren,
	AdminDepartmentsRoute,
	AdminReportsRoute,
	AdminTrainingsRoute: AdminTrainingsRoute._addFileChildren(AdminTrainingsRouteChildren),
	AdminUsersRoute,
	AdminIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
