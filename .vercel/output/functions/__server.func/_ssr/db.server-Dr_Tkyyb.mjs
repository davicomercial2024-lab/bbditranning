import { i as TSS_SERVER_FUNCTION } from "./esm-I6x-3bX5.mjs";
import { t as PrismaLibSQLAdapterFactory } from "../_libs/@prisma/adapter-libsql+[...].mjs";
import { PrismaClient } from "@prisma/client";
//#region node_modules/.nitro/vite/services/ssr/assets/db.server-Dr_Tkyyb.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var globalForPrisma = globalThis;
function getAdapter() {
	let url = process.env.DATABASE_URL;
	if (!url || url === "undefined") url = "libsql://bbditrainning-bbditrainning.aws-ap-northeast-1.turso.io";
	let authToken = process.env.TURSO_AUTH_TOKEN;
	if (!authToken || authToken === "undefined") authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODExOTYwNzAsImlkIjoiMDE5ZWI3OGUtOGUwMS03YzBkLWE5NmMtY2Q3MzlmMTg0ZTZiIiwicmlkIjoiOTk5YmYxNDMtZjgyZS00Y2ZkLTkwYmItNGM3OWIzOTNlMWU2In0.XWQ07B0izduh6nbGpno9vvllxQl2yo1VK9jUjAxqTnNuKmAfUMxZTjldFGnaUsMFp6qzHZsXONiDwO6Ne5crCQ";
	return new PrismaLibSQLAdapterFactory({
		url,
		authToken
	});
}
var prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: getAdapter() });
//#endregion
export { prisma as n, createServerRpc as t };
