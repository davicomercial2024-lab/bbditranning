import { createClient } from "@libsql/client";
import * as fs from "fs";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is missing");
  const client = createClient({ url });
  const sqlFile = fs.readFileSync("migrate-user.sql", "utf8");
  try {
    await client.executeMultiple(sqlFile);
    console.log("Migration executed successfully!");
  } catch (e) {
    console.error("Migration failed:", e);
    process.exit(1);
  }
}
main();
