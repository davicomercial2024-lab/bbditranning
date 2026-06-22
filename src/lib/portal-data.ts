import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStoredSession, type SessionData } from "./auth";
import { useState, useEffect } from "react";
import { 
  getPortalDataFn, 
  saveStudentFn, 
  deleteStudentFn, 
  saveDepartmentFn, 
  deleteDepartmentFn, 
  saveTrainingFn, 
  deleteTrainingFn,
  markTrainingCompletedFn,
  unmarkTrainingCompletedFn,
  markStudentAccessFn,
  reorderTrainingsFn,
  uploadPdfFn,
  saveAdminEvaluationFn
} from "./api/data.functions";

export type Student = {
  id: string;
  name: string;
  email: string;
  department: string;
  progress: number;
  lastActive: string;
  trainings: number;
  completed: number;
};

export type Department = {
  id: string;
  name: string;
};

export type LessonType = "video" | "pdf" | "article" | "link" | "text" | "quiz" | "practice";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  source: string;
  completed?: boolean;
  questions?: QuizQuestion[];
  quizQuestionsToDisplay?: number;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Training = {
  id: string;
  title: string;
  category: string;
  department?: string | null;
  description: string;
  cover: string;
  totalLessons: number;
  completedLessons: number;
  order?: number;
  minTimeMinutes?: number;
  modules: Module[];
};

export const coverOptions = [
  "from-emerald-500/40 to-teal-700/30",
  "from-sky-500/40 to-indigo-700/30",
  "from-amber-500/40 to-orange-700/30",
  "from-violet-500/40 to-fuchsia-700/30",
  "from-rose-500/40 to-red-700/30",
  "from-cyan-500/40 to-blue-700/30",
];

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
  return { id: createId(`aula-${index}`, "lesson"), title: "", type: "video", duration: "", source: "", questions: [], quizQuestionsToDisplay: 3 };
}

export function emptyModule(index: number): Module {
  return { id: createId(`modulo-${index}`, "module"), title: `Modulo ${index}`, lessons: [emptyLesson(1)] };
}

export function emptyTraining(): Training {
  return {
    id: "", title: "", category: "", department: "Todos", description: "", cover: coverOptions[0],
    minTimeMinutes: 0,
    totalLessons: 0, completedLessons: 0, modules: [emptyModule(1)],
  };
}

function normalizeDepartment(value?: string | null) {
  return value?.trim() || "Todos";
}

function isTrainingVisibleForStudent(training: Training, student?: Student | null) {
  if (!student) return false;
  const trainingDepartment = normalizeDepartment(training.department);
  return trainingDepartment === "Todos" || trainingDepartment.toLowerCase() === student.department.trim().toLowerCase();
}

export function usePortalData() {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    queryKey: ["portal-data"],
    queryFn: () => getPortalDataFn(),
  });

  const { departments, students: rawStudents, trainings: rawTrainings, progress, feedbacks, adminEvaluations } = data;

  const departmentNames = [...new Set(["Todos", ...departments.map(d => d.name)])].sort((a, b) => {
    if (a === "Todos") return -1;
    if (b === "Todos") return 1;
    return a.localeCompare(b);
  });

  const trainings: Training[] = rawTrainings.map(t => ({
    ...t,
    department: t.department?.name || "Todos",
    modules: (t.modules as any) || [],
  }));

  const students: Student[] = rawStudents.map(s => {
    const studentObj: Student = {
      id: s.id,
      name: s.name,
      email: s.email,
      department: s.department?.name || "Todos",
      progress: s.progress,
      lastActive: s.lastActive,
      trainings: s.trainings,
      completed: s.completed,
    };
    
    // Recalculate metrics based on visible trainings
    const visibleTrainings = trainings.filter(t => isTrainingVisibleForStudent(t, studentObj));
    const completedIds = new Set(progress[s.id] ?? []);
    const completed = visibleTrainings.filter(t => completedIds.has(t.id)).length;
    const total = visibleTrainings.length;
    
    studentObj.trainings = total;
    studentObj.completed = completed;
    studentObj.progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return studentObj;
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["portal-data"] });

  const mutSaveDepartment = useMutation({ mutationFn: (d: any) => saveDepartmentFn({ data: d }), onSuccess: invalidate });
  const mutDeleteDepartment = useMutation({ mutationFn: (id: string) => deleteDepartmentFn({ data: { id } }), onSuccess: invalidate });
  const mutSaveStudent = useMutation({ mutationFn: (s: any) => saveStudentFn({ data: s }), onSuccess: invalidate });
  const mutDeleteStudent = useMutation({ mutationFn: (id: string) => deleteStudentFn({ data: { id } }), onSuccess: invalidate });
  const mutSaveTraining = useMutation({ mutationFn: (t: any) => saveTrainingFn({ data: t }), onSuccess: invalidate });
  const mutDeleteTraining = useMutation({ mutationFn: (id: string) => deleteTrainingFn({ data: { id } }), onSuccess: invalidate });
  const mutMarkTraining = useMutation({ mutationFn: (d: any) => markTrainingCompletedFn({ data: d }), onSuccess: invalidate });
  const mutUnmarkTraining = useMutation({ mutationFn: (d: any) => unmarkTrainingCompletedFn({ data: d }), onSuccess: invalidate });
  const mutMarkAccess = useMutation({ mutationFn: (email: string) => markStudentAccessFn({ data: { email } }), onSuccess: invalidate });
  const mutReorderTrainings = useMutation({ mutationFn: (updates: { id: string, order: number }[]) => reorderTrainingsFn({ data: { updates } }), onSuccess: invalidate });
  const mutUploadPdf = useMutation({ mutationFn: (d: { name: string, base64: string }) => uploadPdfFn({ data: d }) });
  const mutSaveAdminEvaluation = useMutation({ mutationFn: (d: any) => saveAdminEvaluationFn({ data: d }), onSuccess: invalidate });

  return {
    trainings,
    students,
    progress,
    feedbacks,
    adminEvaluations,
    departments,
    coverOptions,
    departmentNames,
    getTraining: (id: string) => trainings.find((t) => t.id === id) ?? null,
    getStudentByEmail: (email?: string | null) => {
      const normalizedEmail = email?.trim().toLowerCase();
      if (!normalizedEmail) return null;
      return students.find((s) => s.email.trim().toLowerCase() === normalizedEmail) ?? null;
    },
    getVisibleTrainingsForStudent: (email?: string | null) => {
      const normalizedEmail = email?.trim().toLowerCase();
      const student = normalizedEmail ? students.find((item) => item.email.trim().toLowerCase() === normalizedEmail) : null;
      return trainings.filter((training) => isTrainingVisibleForStudent(training, student));
    },
    isTrainingCompletedByStudent: (studentId: string | undefined, trainingId: string) => {
      if (!studentId) return false;
      return (progress[studentId] ?? []).includes(trainingId);
    },
    saveTraining: (training: Training) => mutSaveTraining.mutate(training),
    deleteTraining: (id: string) => mutDeleteTraining.mutate(id),
    saveStudent: (student: Student) => mutSaveStudent.mutate({ ...student, departmentName: student.department }),
    deleteStudent: (id: string) => mutDeleteStudent.mutate(id),
    saveDepartment: (department: Department) => mutSaveDepartment.mutate(department),
    deleteDepartment: (id: string) => mutDeleteDepartment.mutate(id),
    markTrainingCompleted: (studentId: string | undefined, trainingId: string, rating?: number, feedback?: string) => studentId && mutMarkTraining.mutate({ studentId, trainingId, rating, feedback }),
    unmarkTrainingCompleted: (studentId: string | undefined, trainingId: string) => studentId && mutUnmarkTraining.mutate({ studentId, trainingId }),
    saveAdminEvaluation: (data: { studentId: string; trainingId: string; lessonId: string; rating: number; comments?: string }) => mutSaveAdminEvaluation.mutate(data),
    markStudentAccess: (email: string) => mutMarkAccess.mutate(email),
    reorderTrainings: (updates: { id: string, order: number }[]) => mutReorderTrainings.mutate(updates),
    uploadPdfAsync: (name: string, base64: string) => mutUploadPdf.mutateAsync({ name, base64 }),
  };
}

export function useLessonProgress(studentId?: string | null) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (studentId) {
      const stored = localStorage.getItem(`lesson_progress_${studentId}`);
      if (stored) {
        try {
          setCompletedLessons(new Set(JSON.parse(stored)));
        } catch {}
      }
    }
  }, [studentId]);

  const markLessonCompleted = (lessonId: string) => {
    if (!studentId) return;
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.add(lessonId);
      localStorage.setItem(`lesson_progress_${studentId}`, JSON.stringify([...next]));
      return next;
    });
  };

  const isLessonCompleted = (lessonId: string) => completedLessons.has(lessonId);

  return { isLessonCompleted, markLessonCompleted };
}

export function useTrainingTimer(trainingId: string | undefined, minTimeMinutes?: number) {
  const session = getStoredSession();
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [isTimeMet, setIsTimeMet] = useState(false);

  useEffect(() => {
    if (!trainingId || !session?.id || minTimeMinutes === undefined || minTimeMinutes <= 0) {
      setIsTimeMet(true);
      return;
    }

    const key = `timer-${session.id}-${trainingId}`;
    let startTime = localStorage.getItem(key);
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem(key, startTime);
    }

    const start = parseInt(startTime, 10);

    const checkTime = () => {
      const now = Date.now();
      const elapsed = (now - start) / 1000 / 60;
      setElapsedMinutes(Math.floor(elapsed));
      if (elapsed >= minTimeMinutes) {
        setIsTimeMet(true);
      } else {
        setIsTimeMet(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [trainingId, session?.id, minTimeMinutes]);

  const remainingMinutes = minTimeMinutes ? Math.max(0, minTimeMinutes - elapsedMinutes) : 0;

  return { isTimeMet, remainingMinutes };
}
