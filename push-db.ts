import { createClient } from "@libsql/client";
import * as fs from "fs";
import * as path from "path";

const url = process.env.DATABASE_URL || "libsql://bbditrainning-bbditrainning.aws-ap-northeast-1.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODExOTYwNzAsImlkIjoiMDE5ZWI3OGUtOGUwMS03YzBkLWE5NmMtY2Q3MzlmMTg0ZTZiIiwicmlkIjoiOTk5YmYxNDMtZjgyZS00Y2ZkLTkwYmItNGM3OWIzOTNlMWU2In0.XWQ07B0izduh6nbGpno9vvllxQl2yo1VK9jUjAxqTnNuKmAfUMxZTjldFGnaUsMFp6qzHZsXONiDwO6Ne5crCQ";

const client = createClient({ url, authToken });

async function main() {
  console.log("Reading schema.sql...");
  const sql = fs.readFileSync(path.join(process.cwd(), "schema.sql"), "utf-8");
  
  // Split the SQL into individual statements
  const statements = sql
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  console.log(`Executing ${statements.length} statements...`);
  
  for (const statement of statements) {
    try {
      await client.execute(statement);
      console.log("Success: " + statement.substring(0, 50) + "...");
    } catch (e) {
      console.error("Error executing statement: ", statement.substring(0, 50) + "...");
      console.error(e);
    }
  }

  console.log("Done pushing schema.");

  // After pushing, let's create the admin user if it doesn't exist
  console.log("Creating admin user...");
  const bcrypt = require("bcryptjs");
  const hashed = await bcrypt.hash("BPT#0020a", 10);
  
  try {
    await client.execute({
      sql: `INSERT INTO "User" ("id", "email", "password", "name", "role", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: ["admin-123", "admin@bbdi.com.br", hashed, "Admin", "admin", new Date().toISOString(), new Date().toISOString()]
    });
    console.log("Admin user created.");
  } catch(e) {
    console.error("Admin user might already exist or failed: ", e.message);
  }

  process.exit(0);
}

main().catch(console.error);
