//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CR8RRGrf.js
var manifest = {
	"1410941f1858cb37e40d4e06d89f57bbd74c19e08216943094c08119d7d94236": {
		functionName: "loginFn_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-DfrBluPC.mjs")
	},
	"2e0d99256c909847a98d4f611d1fd1e487b6962fad37b282307519b357797cfc": {
		functionName: "logoutFn_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-DfrBluPC.mjs")
	},
	"142aa38b95b50675586163bba05c611f6901432278cee38d20fb5d8c0f0a43a0": {
		functionName: "getSessionFn_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-DfrBluPC.mjs")
	},
	"889618ac28c07b82364ef1828457d3380bbf130e11f7a23dc1946ad4fa4c1f01": {
		functionName: "getDepartmentsFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"a50f9e307953ebac7e3123eb7ec0f1c8abad0e916ea43dd8a8e0136c16b5ffc2": {
		functionName: "getPortalDataFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"4bf175c12610d4aee26b9dcb2d4a29972ced2db4da28d4d835604a87b7dac607": {
		functionName: "getStudentsFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"cd44e1b4f74f1edcc78717e152da895da34a738b7109f7aab05ebe44ee707f6f": {
		functionName: "getTrainingsFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"e2f233065deb4b094d48153c93bcdf028ea48591f6618210e0a662828cd0cacd": {
		functionName: "saveDepartmentFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"cca70dce1fec605ecf9e55218236801a6da56a2a109868021fa7c19ac6416dd5": {
		functionName: "deleteDepartmentFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"645973e1ac2df2a32f675e0a1e006bc6c0d5ea09874275a85f9151b7e535cdd6": {
		functionName: "saveStudentFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"44f908faa62562a34925f370aff7add353ebd906fa56bc210853594c6c6307a0": {
		functionName: "deleteStudentFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"0a4b3fb92279fa8b7d4c0d14eedf2b006a4a8dbe806db7a84a21e3f818c49ad8": {
		functionName: "saveTrainingFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"9397574ddeaf50b236ed4499fb7f837a6dcd03201ab69ca42c16d875d4779450": {
		functionName: "deleteTrainingFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"fa48b45acf5702eb014194c7771e42b7adcd4b0d5ce603cf6cddd7317de2c994": {
		functionName: "reorderTrainingsFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"a163e7ae89d6fdb8ff28108af5f53b6f113c3dd9caa85f10cbfd1425fc314304": {
		functionName: "markTrainingCompletedFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"de84fabb2884e9abd85898ad4c6c82143571a1048f96893eea259954ab4fde2e": {
		functionName: "unmarkTrainingCompletedFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	},
	"dd424c6c4697747bf08053449477c6eeb9c0fa5a7ca7393a94f6ebf082a79656": {
		functionName: "markStudentAccessFn_createServerFn_handler",
		importer: () => import("./_ssr/data.functions-Mih78MSB.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
