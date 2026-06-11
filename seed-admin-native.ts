import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is missing");
  const client = createClient({ url });

  const adminEmail = "admin@bbdi.com.br";
  const adminPassword = "BPT#0020a";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Check if admin exists
  const existing = await client.execute({
    sql: "SELECT * FROM User WHERE email = ?",
    args: [adminEmail]
  });

  if (existing.rows.length === 0) {
    const id = "admin-" + Date.now().toString(36);
    await client.execute({
      sql: 'INSERT INTO "User" (id, email, password, name, role, updatedAt) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      args: [id, adminEmail, hashedPassword, "Admin BBDI", "admin"]
    });
    console.log("Admin user created successfully!");
  } else {
    await client.execute({
      sql: 'UPDATE "User" SET password = ? WHERE email = ?',
      args: [hashedPassword, adminEmail]
    });
    console.log("Admin user updated successfully!");
  }
}

main().catch(console.error);
