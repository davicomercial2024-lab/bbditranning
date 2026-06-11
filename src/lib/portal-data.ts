import { useSyncExternalStore } from "react";
import { students as initialStudents, trainings as initialTrainings, type Lesson, type Module, type Training } from "@/lib/mock-data";

export type Student = (typeof initialStudents)[number];

const TRAININGS_KEY = "bbdi-trainings";
const STUDENTS_KEY = "bbdi-students";
const PROGRESS_KEY = "bbdi-student-progress";
const DEPARTMENTS_KEY = "bbdi-departments";

export type Department = {
  id: string;
  name: string;
};

const initialDepartments: Department[] = [
  { id: "todos", name: "Todos" },
  { id: "comercial", name: "Comercial" },
  { id: "rh", name: "RH" },
  { id: "marketplace", name: "Marketplace" },
  { id: "marketing", name: "Marketing" },
  { id: "operacoes", name: "Operacoes" },
  { id: "atendimento", name: "Atendimento" },
  { id: "ti", name: "TI" },
  { id: "financeiro", name: "Financeiro" },
];

const coverOptions = [
  "from-emerald-500/40 to-teal-700/30",
  "from-sky-500/40 to-indigo-700/30",
  "from-amber-500/40 to-orange-700/30",
  "from-violet-500/40 to-fuchsia-700/30",
  "from-rose-500/40 to-red-700/30",
  "from-cyan-500/40 to-blue-700/30",
];

type PortalSnapshot = {
  trainings: Training[];
  students: Student[];
  progress: Record<string, string[]>;
  departments: Department[];
};

const listeners = new Set<() => void>();

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return clone(fallback);

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : clone(fallback);
  } catch {
    window.localStorage.removeItem(key);
    return clone(fallback);
  }
}

function writeStored<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function readSnapshot(): PortalSnapshot {
  const trainings = readStored(TRAININGS_KEY, initialTrainings);
  const progress = readStored<Record<string, string[]>>(PROGRESS_KEY, {});
  const storedDepartments = readStored(DEPARTMENTS_KEY, initialDepartments);
  const existingDepartments = new Set(storedDepartments.map((department) => department.name.trim().toLowerCase()));
  const missingDepartments = initialStudents
    .map((student) => student.department)
    .filter((department) => {
      const normalized = department.trim().toLowerCase();
      if (!normalized || existingDepartments.has(normalized)) return false;
      existingDepartments.add(normalized);
      return true;
    })
    .map((department) => ({ id: createId(department, "department"), name: department }));
  const departments = [...storedDepartments, ...missingDepartments];
  const students = syncStudentMetrics(readStored(STUDENTS_KEY, initialStudents), trainings, progress);

  return {
    trainings,
    students,
    progress,
    departments,
  };
}

let snapshot: PortalSnapshot = readSnapshot();

function emit(next: PortalSnapshot) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    emit(readSnapshot());
  }
  return () => listeners.delete(listener);
}

function getSnapshot(): PortalSnapshot {
  return snapshot;
}

function getServerSnapshot(): PortalSnapshot {
  return {
    trainings: clone(initialTrainings),
    students: clone(initialStudents),
    progress: {},
    departments: clone(initialDepartments),
  };
}

function normalizeDepartment(value?: string) {
  return value?.trim() || "Todos";
}

function isTrainingVisibleForStudent(training: Training, student?: Student | null) {
  if (!student) return false;
  const trainingDepartment = normalizeDepartment(training.department);
  return trainingDepartment === "Todos" || trainingDepartment.toLowerCase() === student.department.trim().toLowerCase();
}

function calculateStudentMetrics(student: Student, trainings: Training[], progress: Record<string, string[]>): Student {
  const visibleTrainings = trainings.filter((training) => isTrainingVisibleForStudent(training, student));
  const completedIds = new Set(progress[student.id] ?? []);
  const completed = visibleTrainings.filter((training) => completedIds.has(training.id)).length;
  const total = visibleTrainings.length;

  return {
    ...student,
    trainings: total,
    completed,
    progress: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

function syncStudentMetrics(students: Student[], trainings: Training[], progress: Record<string, string[]>) {
  return students.map((student) => calculateStudentMetrics(student, trainings, progress));
}

export function createId(value: string, fallback: string) {
  const base = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${base || fallback}-${Date.now().toString(36)}`;
}

export function recalculateTraining(training: Training): Training {
  const totalLessons = training.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = training.modules.reduce(
    (sum, module) => sum + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  );

  return {
    ...training,
    totalLessons,
    completedLessons,
  };
}

export function emptyLesson(index: number): Lesson {
  return {
    id: createId(`aula-${index}`, "lesson"),
    title: "",
    type: "video",
    duration: "",
    source: "",
  };
}

export function emptyModule(index: number): Module {
  return {
    id: createId(`modulo-${index}`, "module"),
    title: `Modulo ${index}`,
    lessons: [emptyLesson(1)],
  };
}

export function emptyTraining(): Training {
  return {
    id: "",
    title: "",
    category: "",
    department: "Todos",
    description: "",
    cover: coverOptions[0],
    totalLessons: 0,
    completedLessons: 0,
    modules: [emptyModule(1)],
  };
}

export function usePortalData() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setTrainings(trainings: Training[]) {
    writeStored(TRAININGS_KEY, trainings);
    const students = syncStudentMetrics(snapshot.students, trainings, snapshot.progress);
    writeStored(STUDENTS_KEY, students);
    emit({ ...snapshot, trainings, students });
  }

  function setStudents(students: Student[]) {
    const synced = syncStudentMetrics(students, snapshot.trainings, snapshot.progress);
    writeStored(STUDENTS_KEY, synced);
    emit({ ...snapshot, students: synced });
  }

  function setProgress(progress: Record<string, string[]>) {
    writeStored(PROGRESS_KEY, progress);
    const students = syncStudentMetrics(snapshot.students, snapshot.trainings, progress);
    writeStored(STUDENTS_KEY, students);
    emit({ ...snapshot, progress, students });
  }

  function setDepartments(departments: Department[]) {
    const unique = departments.filter(
      (department, index, list) =>
        department.name.trim() &&
        list.findIndex((item) => item.name.trim().toLowerCase() === department.name.trim().toLowerCase()) === index,
    );
    writeStored(DEPARTMENTS_KEY, unique);
    emit({ ...snapshot, departments: unique });
  }

  return {
    trainings: data.trainings,
    students: data.students,
    progress: data.progress,
    departments: data.departments,
    coverOptions,
    departmentNames: data.departments.map((department) => department.name).sort((a, b) => a.localeCompare(b)),
    getTraining: (id: string) => data.trainings.find((training) => training.id === id) ?? null,
    getStudentByEmail: (email?: string | null) => {
      const normalizedEmail = email?.trim().toLowerCase();
      if (!normalizedEmail) return null;
      return data.students.find((student) => student.email.trim().toLowerCase() === normalizedEmail) ?? null;
    },
    getVisibleTrainingsForStudent: (email?: string | null) => {
      const normalizedEmail = email?.trim().toLowerCase();
      const student = normalizedEmail
        ? data.students.find((item) => item.email.trim().toLowerCase() === normalizedEmail)
        : null;
      return data.trainings.filter((training) => isTrainingVisibleForStudent(training, student));
    },
    isTrainingCompletedByStudent: (studentId: string | undefined, trainingId: string) => {
      if (!studentId) return false;
      return (data.progress[studentId] ?? []).includes(trainingId);
    },
    saveTraining: (training: Training) => {
      const normalized = recalculateTraining({
        ...training,
        id: training.id || createId(training.title, "training"),
        department: normalizeDepartment(training.department),
        cover: training.cover || coverOptions[0],
      });
      const exists = snapshot.trainings.some((item) => item.id === normalized.id);
      const next = exists
        ? snapshot.trainings.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...snapshot.trainings];

      setTrainings(next);
      return normalized;
    },
    deleteTraining: (id: string) => {
      setTrainings(snapshot.trainings.filter((training) => training.id !== id));
    },
    saveStudent: (student: Student) => {
      const normalized = {
        ...student,
        id: student.id || createId(student.name, "student"),
        progress: Math.min(100, Math.max(0, Number(student.progress) || 0)),
        trainings: Math.max(0, Number(student.trainings) || 0),
        completed: Math.max(0, Number(student.completed) || 0),
      };
      const exists = snapshot.students.some((item) => item.id === normalized.id);
      const next = exists
        ? snapshot.students.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...snapshot.students];

      setStudents(next);
      return normalized;
    },
    deleteStudent: (id: string) => {
      const nextProgress = { ...snapshot.progress };
      delete nextProgress[id];
      writeStored(PROGRESS_KEY, nextProgress);
      const students = snapshot.students.filter((student) => student.id !== id);
      writeStored(STUDENTS_KEY, students);
      emit({ ...snapshot, students, progress: nextProgress });
    },
    saveDepartment: (department: Department) => {
      if (department.id === "todos" && department.name.trim() !== "Todos") {
        return { id: "todos", name: "Todos" };
      }

      const previous = snapshot.departments.find((item) => item.id === department.id);
      const normalized: Department = {
        id: department.id || createId(department.name, "department"),
        name: department.name.trim(),
      };
      const exists = snapshot.departments.some((item) => item.id === normalized.id);
      const next = exists
        ? snapshot.departments.map((item) => (item.id === normalized.id ? normalized : item))
        : [...snapshot.departments, normalized];

      setDepartments(next);

      if (previous && previous.name !== normalized.name) {
        const trainings = snapshot.trainings.map((training) =>
          (training.department ?? "Todos") === previous.name ? { ...training, department: normalized.name } : training,
        );
        const students = snapshot.students.map((student) =>
          student.department === previous.name ? { ...student, department: normalized.name } : student,
        );
        writeStored(TRAININGS_KEY, trainings);
        const syncedStudents = syncStudentMetrics(students, trainings, snapshot.progress);
        writeStored(STUDENTS_KEY, syncedStudents);
        emit({ ...snapshot, departments: next, trainings, students: syncedStudents });
      }

      return normalized;
    },
    deleteDepartment: (id: string) => {
      const department = snapshot.departments.find((item) => item.id === id);
      if (!department || department.name === "Todos") return;
      const usedByStudents = snapshot.students.some((student) => student.department === department.name);
      const usedByTrainings = snapshot.trainings.some((training) => (training.department ?? "Todos") === department.name);
      if (usedByStudents || usedByTrainings) return;
      setDepartments(snapshot.departments.filter((item) => item.id !== id));
    },
    markTrainingCompleted: (studentId: string | undefined, trainingId: string) => {
      if (!studentId) return;
      const current = snapshot.progress[studentId] ?? [];
      if (current.includes(trainingId)) return;
      setProgress({
        ...snapshot.progress,
        [studentId]: [...current, trainingId],
      });
    },
    unmarkTrainingCompleted: (studentId: string | undefined, trainingId: string) => {
      if (!studentId) return;
      setProgress({
        ...snapshot.progress,
        [studentId]: (snapshot.progress[studentId] ?? []).filter((id) => id !== trainingId),
      });
    },
    markStudentAccess: (email: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const formatter = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const next = snapshot.students.map((student) =>
        student.email.trim().toLowerCase() === normalizedEmail
          ? { ...student, lastActive: formatter.format(new Date()) }
          : student,
      );

      setStudents(next);
    },
  };
}
