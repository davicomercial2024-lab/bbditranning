import { prisma } from "../src/lib/db.server";
import { students, trainings } from "../src/lib/mock-data";
import { initialDepartments } from "../src/lib/portal-data";

function departmentName(value?: string) {
  const name = value?.trim();
  return name && name !== "Todos" ? name : null;
}

async function main() {
  for (const department of initialDepartments.filter((item) => item.name !== "Todos")) {
    await prisma.department.upsert({
      where: { name: department.name },
      update: {},
      create: {
        id: department.id,
        name: department.name,
      },
    });
  }

  for (const student of students) {
    await prisma.student.upsert({
      where: { id: student.id },
      update: {
        name: student.name,
        email: student.email,
        department: departmentName(student.department)
          ? { connect: { name: departmentName(student.department)! } }
          : { disconnect: true },
        progress: student.progress,
        lastActive: student.lastActive,
        trainings: student.trainings,
        completed: student.completed,
      },
      create: {
        id: student.id,
        name: student.name,
        email: student.email,
        department: departmentName(student.department)
          ? { connect: { name: departmentName(student.department)! } }
          : undefined,
        progress: student.progress,
        lastActive: student.lastActive,
        trainings: student.trainings,
        completed: student.completed,
      },
    });
  }

  for (const training of trainings) {
    await prisma.training.upsert({
      where: { id: training.id },
      update: {
        title: training.title,
        category: training.category,
        description: training.description,
        cover: training.cover,
        modules: training.modules,
        totalLessons: training.totalLessons,
        completedLessons: training.completedLessons,
        department: departmentName(training.department)
          ? { connect: { name: departmentName(training.department)! } }
          : { disconnect: true },
      },
      create: {
        id: training.id,
        title: training.title,
        category: training.category,
        description: training.description,
        cover: training.cover,
        modules: training.modules,
        totalLessons: training.totalLessons,
        completedLessons: training.completedLessons,
        department: departmentName(training.department)
          ? { connect: { name: departmentName(training.department)! } }
          : undefined,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
