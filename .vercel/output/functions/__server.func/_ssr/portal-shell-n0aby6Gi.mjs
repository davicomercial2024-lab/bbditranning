import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate, i as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { o as logoutFn, t as BrandLogo } from "./portal-data-DzS8TpSK.mjs";
import { A as Activity, D as Building2, O as BookOpen, f as LogOut, h as GraduationCap, n as Users, p as LayoutDashboard, r as User, s as Search, y as FileChartColumnIncreasing } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-shell-n0aby6Gi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var activity = [
	{
		id: "a1",
		user: "Camila Souza",
		action: "concluiu",
		target: "Atendimento ao Cliente · Empatia na prática",
		time: "há 12 min"
	},
	{
		id: "a2",
		user: "Ana Carolina",
		action: "iniciou",
		target: "Segurança da Informação",
		time: "há 1h"
	},
	{
		id: "a3",
		user: "Bruno Lima",
		action: "concluiu",
		target: "Onboarding BBDI · Manual do colaborador",
		time: "há 3h"
	},
	{
		id: "a4",
		user: "Elaine Pires",
		action: "comentou em",
		target: "Ferramentas Internas · ERP",
		time: "há 5h"
	}
];
var STORAGE_KEY = "bbdi-auth-session";
function canUseStorage() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function getStoredSession() {
	if (!canUseStorage()) return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const session = JSON.parse(raw);
		if (typeof session.email === "string" && typeof session.name === "string" && (session.role === "student" || session.role === "admin")) return {
			email: session.email,
			name: session.name,
			role: session.role,
			studentId: typeof session.studentId === "string" ? session.studentId : void 0,
			department: typeof session.department === "string" ? session.department : void 0
		};
	} catch {
		clearSession();
	}
	return null;
}
function clearSession() {
	if (!canUseStorage()) return;
	window.localStorage.removeItem(STORAGE_KEY);
}
var studentNav = [
	{
		to: "/",
		label: "Visão geral",
		icon: LayoutDashboard
	},
	{
		to: "/trainings",
		label: "Treinamentos",
		icon: GraduationCap
	},
	{
		to: "/progress",
		label: "Meu progresso",
		icon: Activity
	},
	{
		to: "/profile",
		label: "Perfil",
		icon: User
	}
];
var adminNav = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/admin/trainings",
		label: "Treinamentos",
		icon: BookOpen
	},
	{
		to: "/admin/users",
		label: "Colaboradores",
		icon: Users
	},
	{
		to: "/admin/departments",
		label: "Departamentos",
		icon: Building2
	},
	{
		to: "/admin/reports",
		label: "Relatórios",
		icon: FileChartColumnIncreasing
	}
];
function PortalShell({ children, title, subtitle, actions }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const isAdmin = pathname.startsWith("/admin");
	const expectedRole = isAdmin ? "admin" : "student";
	const nav = isAdmin ? adminNav : studentNav;
	const [session, setSession] = (0, import_react.useState)(null);
	const [checkedAuth, setCheckedAuth] = (0, import_react.useState)(false);
	const isAuthorized = (0, import_react.useMemo)(() => session?.role === expectedRole, [expectedRole, session?.role]);
	(0, import_react.useEffect)(() => {
		getSessionFn().then((storedSession) => {
			if (!storedSession || storedSession.role !== expectedRole) {
				logoutFn().then(() => {
					clearSession();
					navigate({
						to: "/login",
						search: { redirect: pathname }
					});
				});
				return;
			}
			setSession(storedSession);
			setCheckedAuth(true);
		});
	}, [
		expectedRole,
		navigate,
		pathname
	]);
	async function handleLogout() {
		await logoutFn();
		clearSession();
		navigate({ to: "/login" });
	}
	if (!checkedAuth || !isAuthorized || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: "Verificando acesso..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-6 pt-7 pb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "block w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-auto w-full max-h-32 object-contain" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70",
						children: isAdmin ? "ADMINISTRAÇÃO" : "PORTAL DO ALUNO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-3 space-y-1",
						children: nav.map((item) => {
							const active = pathname === item.to || item.to !== "/" && item.to !== "/admin" && pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${active ? "bg-accent text-foreground font-medium" : "text-sidebar-foreground/70 hover:text-foreground hover:bg-accent/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), item.label]
							}, item.to);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto px-4 pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-sidebar-border/70 p-3 text-xs text-muted-foreground",
						children: ["Logado como ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-medium",
							children: session.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "flex w-full items-center justify-center gap-2 rounded-md border border-sidebar-border bg-secondary/40 px-3 py-2 text-xs hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "Sair"]
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 min-w-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-6 md:px-10 py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-6 mb-8 pb-6 border-b border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl md:text-4xl font-display font-semibold",
								children: title
							}),
							subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: subtitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-0.5 w-12 bg-primary rounded-full" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "bg-transparent outline-none w-40 placeholder:text-muted-foreground/60",
								placeholder: "Buscar..."
							})]
						}), actions]
					})]
				}), children]
			})
		})]
	});
}
function StatCard({ label, value, color, icon: Icon }) {
	const map = {
		amber: {
			ring: "stat-glow-amber",
			text: "text-[var(--amber)]",
			bg: "bg-[var(--amber)]/10"
		},
		info: {
			ring: "stat-glow-info",
			text: "text-[var(--info)]",
			bg: "bg-[var(--info)]/10"
		},
		success: {
			ring: "stat-glow-success",
			text: "text-[var(--success)]",
			bg: "bg-[var(--success)]/10"
		},
		violet: {
			ring: "stat-glow-violet",
			text: "text-[var(--violet)]",
			bg: "bg-[var(--violet)]/10"
		}
	}[color];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-w-0 rounded-xl bg-card/60 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 ${map.ring}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `h-10 w-10 grid place-items-center rounded-lg ${map.bg}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${map.text}` })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground break-words",
					children: label
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `w-full min-w-0 break-words text-2xl font-display font-bold leading-tight sm:w-auto sm:max-w-[55%] sm:text-right sm:text-3xl ${map.text}`,
				children: value
			})
		]
	});
}
//#endregion
export { getStoredSession as i, StatCard as n, activity as r, PortalShell as t };
