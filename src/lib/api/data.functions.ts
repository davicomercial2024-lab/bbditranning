import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../db.server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Fetch all departments
export const getDepartmentsFn = createServerFn({ method: "GET" }).handler(async () => {
  return await prisma.department.findMany({ orderBy: { name: "asc" } });
});

// Fetch ALL data for the portal at once (to replace mock snapshot easily)
export const getPortalDataFn = createServerFn({ method: "GET" }).handler(async () => {
  console.log("-> getPortalDataFn start");
  const departments = await prisma.department.findMany({ orderBy: { name: "asc" } });
  console.log("-> got departments");
  const students = await prisma.student.findMany({
    include: { progressRecords: true, department: true },
    orderBy: { name: "asc" }
  });
  console.log("-> got students");
  const trainings = await prisma.training.findMany({
    include: { progressRecords: true, department: true },
    orderBy: { order: "asc" }
  });
  console.log("-> got trainings");

  // Map progress records into the expected format Record<studentId, string[]>
  const progress: Record<string, string[]> = {};
  const feedbacks: { studentId: string; trainingId: string; rating: number; feedback: string }[] = [];
  for (const student of students) {
    progress[student.id] = student.progressRecords.map(r => r.trainingId);
    student.progressRecords.forEach(r => {
      if (r.rating) {
        feedbacks.push({
          studentId: student.id,
          trainingId: r.trainingId,
          rating: r.rating,
          feedback: r.feedback || "",
        });
      }
    });
  }

  let adminEvaluations = [];
  try {
    if ((prisma as any).adminLessonEvaluation) {
      adminEvaluations = await (prisma as any).adminLessonEvaluation.findMany({
        orderBy: { createdAt: "desc" }
      });
    } else {
      adminEvaluations = await prisma.$queryRaw`SELECT * FROM "AdminLessonEvaluation" ORDER BY createdAt DESC`;
    }
  } catch (e) {
    console.log("Could not fetch adminEvaluations:", e);
  }

  return { departments, students, trainings, progress, feedbacks, adminEvaluations };
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
    orderBy: { order: "asc" },
  });
});

// Create or Update Department
export const saveDepartmentFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().optional(), name: z.string() }))
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
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await prisma.department.delete({ where: { id: data.id } });
    return { success: true };
  });

// Create or Update Student
export const saveStudentFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
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
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const student = await prisma.student.findUnique({ where: { id: data.id } });
    if (student && student.userId) {
      await prisma.user.delete({ where: { id: student.userId } });
    }
    return { success: true };
  });

export const saveTrainingFn = createServerFn({ method: "POST" })
  .inputValidator(z.any())
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
            minTimeMinutes: training.minTimeMinutes || 0,
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
        minTimeMinutes: training.minTimeMinutes || 0,
      }
    });
  });

export const deleteTrainingFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await prisma.training.delete({ where: { id: data.id } });
    return { success: true };
  });

export const reorderTrainingsFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    updates: z.array(z.object({ id: z.string(), order: z.number() }))
  }))
  .handler(async ({ data }) => {
    for (const update of data.updates) {
      await prisma.training.update({
        where: { id: update.id },
        data: { order: update.order }
      });
    }
    return { success: true };
  });

export const markTrainingCompletedFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ studentId: z.string(), trainingId: z.string(), rating: z.number().optional(), feedback: z.string().optional() }))
  .handler(async ({ data }) => {
    await prisma.studentTrainingProgress.upsert({
      where: { studentId_trainingId: { studentId: data.studentId, trainingId: data.trainingId } },
      update: { rating: data.rating, feedback: data.feedback },
      create: { studentId: data.studentId, trainingId: data.trainingId, rating: data.rating, feedback: data.feedback }
    });
    return { success: true };
  });

export const unmarkTrainingCompletedFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ studentId: z.string(), trainingId: z.string() }))
  .handler(async ({ data }) => {
    await prisma.studentTrainingProgress.deleteMany({
      where: { studentId: data.studentId, trainingId: data.trainingId }
    });
    return { success: true };
  });

export const markStudentAccessFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email() }))
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

export const uploadPdfFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string(), base64: z.string() }))
  .handler(async ({ data }) => {
    const buffer = Buffer.from(data.base64, "base64");
    const safeName = data.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(filePath, buffer);
    return { url: `/uploads/${uniqueName}` };
  });

export const saveAdminEvaluationFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    studentId: z.string(),
    trainingId: z.string(),
    lessonId: z.string(),
    rating: z.number().min(1).max(5),
    comments: z.string().optional(),
  }))
  .handler(async ({ data }) => {
    try {
      if ((prisma as any).adminLessonEvaluation) {
        await (prisma as any).adminLessonEvaluation.upsert({
          where: { studentId_trainingId_lessonId: { studentId: data.studentId, trainingId: data.trainingId, lessonId: data.lessonId } },
          update: { rating: data.rating, comments: data.comments },
          create: { studentId: data.studentId, trainingId: data.trainingId, lessonId: data.lessonId, rating: data.rating, comments: data.comments },
        });
      } else {
        // Fallback for when Prisma client hasn't hot reloaded
        const existing: any = await prisma.$queryRaw`SELECT id FROM "AdminLessonEvaluation" WHERE studentId = ${data.studentId} AND trainingId = ${data.trainingId} AND lessonId = ${data.lessonId}`;
        if (existing && existing.length > 0) {
          await prisma.$executeRaw`UPDATE "AdminLessonEvaluation" SET rating = ${data.rating}, comments = ${data.comments} WHERE id = ${existing[0].id}`;
        } else {
          const id = crypto.randomUUID();
          await prisma.$executeRaw`INSERT INTO "AdminLessonEvaluation" (id, studentId, trainingId, lessonId, rating, comments, createdAt) VALUES (${id}, ${data.studentId}, ${data.trainingId}, ${data.lessonId}, ${data.rating}, ${data.comments}, CURRENT_TIMESTAMP)`;
        }
      }
    } catch (e) {
      console.log("Could not save admin evaluation", e);
    }
    return { success: true };
  });
