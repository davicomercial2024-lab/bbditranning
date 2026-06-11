import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../db.server";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Fetch all departments
export const getDepartmentsFn = createServerFn({ method: "GET" }).handler(async () => {
  return await prisma.department.findMany({ orderBy: { name: "asc" } });
});

// Fetch ALL data for the portal at once (to replace mock snapshot easily)
export const getPortalDataFn = createServerFn({ method: "GET" }).handler(async () => {
  const departments = await prisma.department.findMany({ orderBy: { name: "asc" } });
  const students = await prisma.student.findMany({
    include: { progressRecords: true, department: true },
    orderBy: { name: "asc" }
  });
  const trainings = await prisma.training.findMany({
    include: { progressRecords: true, department: true },
    orderBy: { title: "asc" }
  });

  // Map progress records into the expected format Record<studentId, string[]>
  const progress: Record<string, string[]> = {};
  for (const student of students) {
    progress[student.id] = student.progressRecords.map(r => r.trainingId);
  }

  return { departments, students, trainings, progress };
});

// Fetch all students (with their departments)
export const getStudentsFn = createServerFn({ method: "GET" }).handler(async () => {
  return await prisma.student.findMany({
    include: { department: true, progressRecords: true, user: true },
    orderBy: { name: "asc" },
  });
});

// Fetch all trainings
export const getTrainingsFn = createServerFn({ method: "GET" }).handler(async () => {
  return await prisma.training.findMany({
    include: { department: true, progressRecords: true },
    orderBy: { title: "asc" },
  });
});

// Create or Update Department
export const saveDepartmentFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().optional(), name: z.string() }))
  .handler(async ({ data }) => {
    if (data.id && data.id !== "todos") {
      return await prisma.department.update({
        where: { id: data.id },
        data: { name: data.name },
      });
    } else {
      return await prisma.department.create({
        data: { name: data.name },
      });
    }
  });

export const deleteDepartmentFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await prisma.department.delete({ where: { id: data.id } });
    return { success: true };
  });

// Create or Update Student
export const saveStudentFn = createServerFn({ method: "POST" })
  .validator(z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    departmentName: z.string(),
  }))
  .handler(async ({ data }) => {
    const { id, name, email, departmentName } = data;
    
    let departmentId = null;
    if (departmentName && departmentName !== "Todos") {
      let dept = await prisma.department.findUnique({ where: { name: departmentName } });
      if (!dept) {
         dept = await prisma.department.create({ data: { name: departmentName } });
      }
      departmentId = dept.id;
    }

    const hashedPassword = await bcrypt.hash("aluno123", 10);

    if (id) {
      // Update existing
      const student = await prisma.student.update({
        where: { id },
        data: { name, email, departmentId },
      });
      if (student.userId) {
        await prisma.user.update({
          where: { id: student.userId },
          data: { name, email },
        });
      }
      return student;
    } else {
      // Create new user and student
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: "student",
        }
      });

      return await prisma.student.create({
        data: {
          id: user.id, // Or generate new
          name,
          email,
          userId: user.id,
          departmentId,
        }
      });
    }
  });

export const deleteStudentFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const student = await prisma.student.findUnique({ where: { id: data.id } });
    if (student && student.userId) {
      await prisma.user.delete({ where: { id: student.userId } });
    }
    return { success: true };
  });

export const saveTrainingFn = createServerFn({ method: "POST" })
  .validator(z.any())
  .handler(async ({ data }) => {
    const training = data as any;
    let departmentId = null;
    if (training.department && training.department !== "Todos") {
      let dept = await prisma.department.findUnique({ where: { name: training.department } });
      if (!dept) {
        dept = await prisma.department.create({ data: { name: training.department } });
      }
      departmentId = dept.id;
    }

    if (training.id) {
      const existing = await prisma.training.findUnique({ where: { id: training.id } });
      if (existing) {
        return await prisma.training.update({
          where: { id: training.id },
          data: {
            title: training.title,
            category: training.category,
            description: training.description,
            cover: training.cover,
            departmentId,
            modules: training.modules || [],
            totalLessons: training.totalLessons || 0,
            completedLessons: training.completedLessons || 0,
          }
        });
      }
    }

    const newId = "training-" + Date.now().toString(36);
    return await prisma.training.create({
      data: {
        id: newId,
        title: training.title,
        category: training.category,
        description: training.description,
        cover: training.cover,
        departmentId,
        modules: training.modules || [],
        totalLessons: training.totalLessons || 0,
        completedLessons: training.completedLessons || 0,
      }
    });
  });

export const deleteTrainingFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await prisma.training.delete({ where: { id: data.id } });
    return { success: true };
  });

export const markTrainingCompletedFn = createServerFn({ method: "POST" })
  .validator(z.object({ studentId: z.string(), trainingId: z.string() }))
  .handler(async ({ data }) => {
    await prisma.studentTrainingProgress.upsert({
      where: { studentId_trainingId: { studentId: data.studentId, trainingId: data.trainingId } },
      update: {},
      create: { studentId: data.studentId, trainingId: data.trainingId }
    });
    return { success: true };
  });

export const unmarkTrainingCompletedFn = createServerFn({ method: "POST" })
  .validator(z.object({ studentId: z.string(), trainingId: z.string() }))
  .handler(async ({ data }) => {
    await prisma.studentTrainingProgress.deleteMany({
      where: { studentId: data.studentId, trainingId: data.trainingId }
    });
    return { success: true };
  });

export const markStudentAccessFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email() }))
  .handler(async ({ data }) => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
    await prisma.student.updateMany({
      where: { email: data.email },
      data: { lastActive: formatter.format(new Date()) }
    });
    return { success: true };
  });
