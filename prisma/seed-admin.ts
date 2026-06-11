import { prisma } from "../src/lib/db.server";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database with Admin User...");

  const adminEmail = "admin@bbdi.com.br";
  const adminPassword = "BPT#0020a";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: "Admin BBDI",
      role: "admin",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin BBDI",
      role: "admin",
    },
  });

  console.log("Admin user created/updated:", admin.email);

  // You can keep the rest of the mock-data seed logic here if needed,
  // but for now we focus on the admin user as requested.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
