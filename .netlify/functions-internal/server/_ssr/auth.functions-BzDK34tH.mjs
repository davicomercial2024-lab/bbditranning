import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./esm-I6x-3bX5.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DteZudTO.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-BzDK34tH.js
var import_jsx_runtime = require_jsx_runtime();
function BrandLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.svg",
		alt: "BBDI Trainning",
		className
	});
}
var STORAGE_KEY = "bbdi-auth-session";
function canUseStorage() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function saveSession(session) {
	if (!canUseStorage()) return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
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
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loginFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	email: stringType().email(),
	password: stringType()
}).parse(data)).handler(createSsrRpc("1410941f1858cb37e40d4e06d89f57bbd74c19e08216943094c08119d7d94236"));
var logoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("2e0d99256c909847a98d4f611d1fd1e487b6962fad37b282307519b357797cfc"));
var getSessionFn = createServerFn({ method: "GET" }).handler(createSsrRpc("142aa38b95b50675586163bba05c611f6901432278cee38d20fb5d8c0f0a43a0"));
//#endregion
export { getStoredSession as a, saveSession as c, getSessionFn as i, clearSession as n, loginFn as o, createSsrRpc as r, logoutFn as s, BrandLogo as t };
