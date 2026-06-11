import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { prisma } from "../db.server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const SESSION_COOKIE = "bbdi-session";

export type AuthSession = {
  id: string;
  email: string;
  name: string;
  role: string;
  studentId?: string;
  department?: string;
};

export const loginFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email(), password: z.string() }))
  .handler(async ({ data }) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { student: true },
    });

    if (!user) {
      throw new Error("E-mail ou senha invalidos.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("E-mail ou senha invalidos.");
    }

    const session: AuthSession = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      studentId: user.student?.id,
      department: user.student?.departmentId || undefined, // Note: We need department names, not IDs, or map them.
    };

    if (user.student && user.student.departmentId) {
       const dept = await prisma.department.findUnique({ where: { id: user.student.departmentId } });
       session.department = dept?.name;
    }

    if (user.role === "student") {
      const formatter = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
      });
      await prisma.student.updateMany({
        where: { email },
        data: { lastActive: formatter.format(new Date()) }
      });
    }

    setCookie(SESSION_COOKIE, JSON.stringify(session), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return session;
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(SESSION_COOKIE);
  return { success: true };
});

export const getSessionFn = createServerFn({ method: "GET" }).handler(async () => {
  const cookie = getCookie(SESSION_COOKIE);
  if (!cookie) return null;
  try {
    return JSON.parse(cookie) as AuthSession;
  } catch {
    return null;
  }
});
