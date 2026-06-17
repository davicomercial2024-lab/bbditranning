import { o as __toESM } from "../_runtime.mjs";
import { f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as saveSession, o as loginFn, t as BrandLogo } from "./auth.functions-Cn6A4SUf.mjs";
import { t as Route } from "./login-DNmiuxFH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D52q341u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getRedirectPath(role, redirect) {
	if (role === "admin") return redirect?.startsWith("/admin") ? redirect : "/admin";
	return redirect && !redirect.startsWith("/admin") && redirect !== "/login" ? redirect : "/";
}
function LoginPage() {
	const navigate = useNavigate();
	const { redirect } = Route.useSearch();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		try {
			const session = await loginFn({ data: {
				email,
				password
			} });
			saveSession(session);
			const destination = getRedirectPath(session.role, redirect);
			if (destination === "/admin") {
				navigate({ to: "/admin" });
				return;
			}
			if (destination === "/") {
				navigate({ to: "/" });
				return;
			}
			window.location.assign(destination);
		} catch (err) {
			setError(err.message || "E-mail ou senha invalidos.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-background px-4 py-10 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "w-full max-w-sm rounded-xl border border-border bg-card/70 p-6 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "mx-auto h-auto w-full max-h-44 object-contain" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-400 text-sm mb-6 text-center",
						children: "Alunos usam o e-mail cadastrado pelo admin. (V2)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-medium",
					htmlFor: "email",
					children: "E-mail"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "email",
					type: "email",
					autoComplete: "email",
					value: email,
					onChange: (event) => setEmail(event.target.value),
					className: "mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary",
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-sm font-medium",
					htmlFor: "password",
					children: "Senha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "password",
					type: "password",
					autoComplete: "current-password",
					value: password,
					onChange: (event) => setPassword(event.target.value),
					className: "mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary",
					required: true
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "Senha padrao de aluno: aluno123."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "mt-6 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: "Entrar"
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
