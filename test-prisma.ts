import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

async function main() {
  console.log("ENV:", process.env.DATABASE_URL);
  const client = createClient({ url: process.env.DATABASE_URL! });
  const adapter = new PrismaLibSql(client);
  const prisma = new PrismaClient({ adapter });
  console.log("Prisma client created");
  try {
    const res = await prisma.department.findMany();
    console.log("Success!", res);
  } catch (e) {
    console.error("Error running query:", e);
  }
}
main();
