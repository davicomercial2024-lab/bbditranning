import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { a as setCookie$1, n as getCookie, t as deleteCookie$1 } from "./request-response-DKbRKVw6.mjs";
import { n as prisma, t as createServerRpc } from "./db.server-Dr_Tkyyb.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-DfrBluPC.js
var SESSION_COOKIE = "bbdi-session";
var loginFn_createServerFn_handler = createServerRpc({
	id: "1410941f1858cb37e40d4e06d89f57bbd74c19e08216943094c08119d7d94236",
	name: "loginFn",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => loginFn.__executeServer(opts));
var loginFn = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	email: stringType().email(),
	password: stringType()
}).parse(data)).handler(loginFn_createServerFn_handler, async ({ data }) => {
	const { email, password } = data;
	const user = await prisma.user.findUnique({
		where: { email },
		include: { student: true }
	});
	if (!user) throw new Error("E-mail ou senha invalidos.");
	if (!await bcryptjs_default.compare(password, user.password)) throw new Error("E-mail ou senha invalidos.");
	const session = {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		studentId: user.student?.id,
		department: user.student?.departmentId || void 0
	};
	if (user.student && user.student.departmentId) session.department = (await prisma.department.findUnique({ where: { id: user.student.departmentId } }))?.name;
	if (user.role === "student") {
		const formatter = new Intl.DateTimeFormat("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
		await prisma.student.updateMany({
			where: { email },
			data: { lastActive: formatter.format(/* @__PURE__ */ new Date()) }
		});
	}
	setCookie$1(SESSION_COOKIE, JSON.stringify(session), {
		path: "/",
		maxAge: 3600 * 24 * 7,
		httpOnly: true,
		secure: true,
		sameSite: "lax"
	});
	return session;
});
var logoutFn_createServerFn_handler = createServerRpc({
	id: "2e0d99256c909847a98d4f611d1fd1e487b6962fad37b282307519b357797cfc",
	name: "logoutFn",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => logoutFn.__executeServer(opts));
var logoutFn = createServerFn({ method: "POST" }).handler(logoutFn_createServerFn_handler, async () => {
	deleteCookie$1(SESSION_COOKIE);
	return { success: true };
});
var getSessionFn_createServerFn_handler = createServerRpc({
	id: "142aa38b95b50675586163bba05c611f6901432278cee38d20fb5d8c0f0a43a0",
	name: "getSessionFn",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => getSessionFn.__executeServer(opts));
var getSessionFn = createServerFn({ method: "GET" }).handler(getSessionFn_createServerFn_handler, async () => {
	const cookie = getCookie(SESSION_COOKIE);
	if (!cookie) return null;
	try {
		return JSON.parse(cookie);
	} catch {
		return null;
	}
});
//#endregion
export { getSessionFn_createServerFn_handler, loginFn_createServerFn_handler, logoutFn_createServerFn_handler };
