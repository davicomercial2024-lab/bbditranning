import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./esm-I6x-3bX5.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DempE8DM.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-BNA8SXrM.js
var import_jsx_runtime = require_jsx_runtime();
function BrandLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.svg",
		alt: "BBDI Trainning",
		className
	});
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
var loginFn = createServerFn({ method: "POST" }).validator(objectType({
	email: stringType().email(),
	password: stringType()
})).handler(createSsrRpc("1410941f1858cb37e40d4e06d89f57bbd74c19e08216943094c08119d7d94236"));
var logoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("2e0d99256c909847a98d4f611d1fd1e487b6962fad37b282307519b357797cfc"));
createServerFn({ method: "GET" }).handler(createSsrRpc("142aa38b95b50675586163bba05c611f6901432278cee38d20fb5d8c0f0a43a0"));
//#endregion
export { logoutFn as i, createSsrRpc as n, loginFn as r, BrandLogo as t };
