import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getAdapter() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  
  // Extrai o authToken caso exista (por exemplo, na querystring)
  const client = createClient({
    url,
  });
  
  return new PrismaLibSQL(client);
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: getAdapter(),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
