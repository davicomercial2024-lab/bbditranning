export type UserRole = "student" | "admin";

export type AuthSession = {
  email: string;
  role: UserRole;
  name: string;
  studentId?: string;
  department?: string;
};

const STORAGE_KEY = "bbdi-auth-session";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
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
