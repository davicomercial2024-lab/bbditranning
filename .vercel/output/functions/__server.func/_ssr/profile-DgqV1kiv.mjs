import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as usePortalData } from "./portal-data-DzS8TpSK.mjs";
import { i as getStoredSession, t as PortalShell } from "./portal-shell-n0aby6Gi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DgqV1kiv.js
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const session = getStoredSession();
	const { students } = usePortalData();
	const student = students.find((item) => item.email.trim().toLowerCase() === session?.email.trim().toLowerCase());
	const name = student?.name ?? session?.name ?? "Aluno";
	const email = student?.email ?? session?.email ?? "";
	const department = student?.department ?? session?.department ?? "Sem departamento";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalShell, {
		title: "Perfil",
		subtitle: "Suas informacoes de colaborador.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card/60 p-6 flex items-center gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-16 w-16 rounded-full bg-primary/15 text-primary grid place-items-center font-display font-bold text-2xl",
				children: name.charAt(0)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display font-semibold text-lg",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-muted-foreground",
				children: [
					email,
					" - ",
					department
				]
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid md:grid-cols-2 gap-4",
			children: [
				["Departamento", department],
				["Ultimo acesso", student?.lastActive ?? "Hoje"],
				["Treinamentos concluidos", `${student?.completed ?? 0}/${student?.trainings ?? 0}`],
				["Progresso geral", `${student?.progress ?? 0}%`]
			].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card/60 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-sm",
					children: v
				})]
			}, k))
		})]
	});
}
//#endregion
export { Profile as component };
