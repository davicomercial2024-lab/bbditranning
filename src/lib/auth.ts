import { students as initialStudents } from "@/lib/mock-data";

export type UserRole = "student" | "admin";

export type AuthSession = {
  email: string;
  role: UserRole;
  name: string;
  studentId?: string;
  department?: string;
};

const STORAGE_KEY = "bbdi-auth-session";
const STUDENTS_KEY = "bbdi-students";
const STUDENT_PASSWORD = "aluno123";

const adminUser: AuthSession & { password: string } = {
  email: "admin@bbdi.com.br",
  password: "BPT#0020a",
  role: "admin",
  name: "Admin BBDI",
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getRegisteredStudents() {
  if (!canUseStorage()) return initialStudents;

  try {
    const raw = window.localStorage.getItem(STUDENTS_KEY);
    return raw ? (JSON.parse(raw) as typeof initialStudents) : initialStudents;
  } catch {
    return initialStudents;
  }
}

export function authenticate(email: string, password: string): AuthSession | null {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === adminUser.email && password === adminUser.password) {
    return {
      email: adminUser.email,
      role: adminUser.role,
      name: adminUser.name,
    };
  }

  if (password !== STUDENT_PASSWORD) {
    return null;
  }

  const student = getRegisteredStudents().find((item) => item.email.trim().toLowerCase() === normalizedEmail);
  if (!student) return null;

  return {
    email: student.email,
    role: "student",
    name: student.name,
    studentId: student.id,
    department: student.department,
  };
}

export function saveSession(session: AuthSession) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getStoredSession(): AuthSession | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as Partial<AuthSession>;
    if (
      typeof session.email === "string" &&
      typeof session.name === "string" &&
      (session.role === "student" || session.role === "admin")
    ) {
      return {
        email: session.email,
        name: session.name,
        role: session.role,
        studentId: typeof session.studentId === "string" ? session.studentId : undefined,
        department: typeof session.department === "string" ? session.department : undefined,
      };
    }
  } catch {
    clearSession();
  }

  return null;
}

export function clearSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
