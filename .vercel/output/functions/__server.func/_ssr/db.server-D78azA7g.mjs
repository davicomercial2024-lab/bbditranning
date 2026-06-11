import { i as TSS_SERVER_FUNCTION } from "./esm-I6x-3bX5.mjs";
import { t as createClient } from "../_libs/@libsql/client.mjs";
import { t as PrismaLibSQLAdapterFactory } from "../_libs/@prisma/adapter-libsql+[...].mjs";
import { PrismaClient } from "@prisma/client";
//#region node_modules/.nitro/vite/services/ssr/assets/db.server-D78azA7g.js
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
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error("DATABASE_URL is not set");
	return new PrismaLibSQLAdapterFactory(createClient({ url }));
}
var prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: getAdapter() });
//#endregion
export { prisma as n, createServerRpc as t };
