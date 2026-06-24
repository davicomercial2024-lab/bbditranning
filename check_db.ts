import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const trainings = await prisma.training.findMany({
    select: { id: true, title: true, evaluationQuestions: true }
  });
  console.log(JSON.stringify(trainings, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
