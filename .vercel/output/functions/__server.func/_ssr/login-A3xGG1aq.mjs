import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-A3xGG1aq.js
var $$splitComponentImporter = () => import("./login-D6fYkOBv.mjs");
var Route = createFileRoute("/login")({
	validateSearch: (search) => ({ redirect: typeof search.redirect === "string" ? search.redirect : void 0 }),
	head: () => ({ meta: [{ title: "Login - BBDI Trainning" }, {
		name: "description",
		content: "Acesse o portal BBDI Trainning."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
