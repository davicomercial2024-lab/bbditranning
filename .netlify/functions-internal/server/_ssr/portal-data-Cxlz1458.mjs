import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate, i as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { a as require_react, i as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as stringType, i as objectType, n as arrayType, r as numberType, t as anyType } from "../_libs/zod.mjs";
import { i as getSessionFn, n as clearSession, r as createSsrRpc, s as logoutFn, t as BrandLogo } from "./auth.functions-BzDK34tH.mjs";
import { A as BookOpen, P as Activity, b as FileChartColumnIncreasing, f as LogOut, g as GraduationCap, k as Building2, m as LayoutDashboard, n as Users, r as User, s as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-data-Cxlz1458.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var studentNav = [
	{
		to: "/",
		label: "Visão geral",
		icon: LayoutDashboard
	},
	{
		to: "/trainings",
		label: "Treinamentos",
		icon: GraduationCap
	},
	{
		to: "/progress",
		label: "Meu progresso",
		icon: Activity
	},
	{
		to: "/profile",
		label: "Perfil",
		icon: User
	}
];
var adminNav = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/admin/trainings",
		label: "Treinamentos",
		icon: BookOpen
	},
	{
		to: "/admin/users",
		label: "Colaboradores",
		icon: Users
	},
	{
		to: "/admin/departments",
		label: "Departamentos",
		icon: Building2
	},
	{
		to: "/admin/reports",
		label: "Relatórios",
		icon: FileChartColumnIncreasing
	}
];
function PortalShell({ children, title, subtitle, actions, fullWidth }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const isAdmin = pathname.startsWith("/admin");
	const expectedRole = isAdmin ? "admin" : "student";
	const nav = isAdmin ? adminNav : studentNav;
	const [session, setSession] = (0, import_react.useState)(null);
	const [checkedAuth, setCheckedAuth] = (0, import_react.useState)(false);
	const isAuthorized = (0, import_react.useMemo)(() => session?.role === expectedRole, [expectedRole, session?.role]);
	(0, import_react.useEffect)(() => {
		getSessionFn().then((storedSession) => {
			if (!storedSession || storedSession.role !== expectedRole) {
				logoutFn().then(() => {
					clearSession();
					navigate({
						to: "/login",
						search: { redirect: pathname }
					});
				});
				return;
			}
			setSession(storedSession);
			setCheckedAuth(true);
		});
	}, [
		expectedRole,
		navigate,
		pathname
	]);
	async function handleLogout() {
		await logoutFn();
		clearSession();
		navigate({ to: "/login" });
	}
	if (!checkedAuth || !isAuthorized || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: "Verificando acesso..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-6 pt-7 pb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "block w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-auto w-full max-h-32 object-contain" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground/70",
						children: isAdmin ? "ADMINISTRAÇÃO" : "PORTAL DO ALUNO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-3 space-y-1",
						children: nav.map((item) => {
							const active = pathname === item.to || item.to !== "/" && item.to !== "/admin" && pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${active ? "bg-accent text-foreground font-medium" : "text-sidebar-foreground/70 hover:text-foreground hover:bg-accent/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), item.label]
							}, item.to);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto px-4 pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-sidebar-border/70 p-3 text-xs text-muted-foreground",
						children: ["Logado como ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-medium",
							children: session.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "flex w-full items-center justify-center gap-2 rounded-md border border-sidebar-border bg-secondary/40 px-3 py-2 text-xs hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "Sair"]
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 min-w-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mx-auto ${fullWidth ? "w-[95%] max-w-none" : "max-w-6xl"} px-6 md:px-10 py-10`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-6 mb-8 pb-6 border-b border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl md:text-4xl font-display font-semibold",
								children: title
							}),
							subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: subtitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-0.5 w-12 bg-primary rounded-full" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "bg-transparent outline-none w-40 placeholder:text-muted-foreground/60",
								placeholder: "Buscar..."
							})]
						}), actions]
					})]
				}), children]
			})
		})]
	});
}
function StatCard({ label, value, color, icon: Icon }) {
	const map = {
		amber: {
			ring: "stat-glow-amber",
			text: "text-[var(--amber)]",
			bg: "bg-[var(--amber)]/10"
		},
		info: {
			ring: "stat-glow-info",
			text: "text-[var(--info)]",
			bg: "bg-[var(--info)]/10"
		},
		success: {
			ring: "stat-glow-success",
			text: "text-[var(--success)]",
			bg: "bg-[var(--success)]/10"
		},
		violet: {
			ring: "stat-glow-violet",
			text: "text-[var(--violet)]",
			bg: "bg-[var(--violet)]/10"
		}
	}[color];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-w-0 rounded-xl bg-card/60 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 ${map.ring}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `h-10 w-10 grid place-items-center rounded-lg ${map.bg}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${map.text}` })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground break-words",
					children: label
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `w-full min-w-0 break-words text-2xl font-display font-bold leading-tight sm:w-auto sm:max-w-[55%] sm:text-right sm:text-3xl ${map.text}`,
				children: value
			})
		]
	});
}
createServerFn({ method: "GET" }).handler(createSsrRpc("889618ac28c07b82364ef1828457d3380bbf130e11f7a23dc1946ad4fa4c1f01"));
var getPortalDataFn = createServerFn({ method: "GET" }).handler(createSsrRpc("a50f9e307953ebac7e3123eb7ec0f1c8abad0e916ea43dd8a8e0136c16b5ffc2"));
createServerFn({ method: "GET" }).handler(createSsrRpc("4bf175c12610d4aee26b9dcb2d4a29972ced2db4da28d4d835604a87b7dac607"));
createServerFn({ method: "GET" }).handler(createSsrRpc("cd44e1b4f74f1edcc78717e152da895da34a738b7109f7aab05ebe44ee707f6f"));
var saveDepartmentFn = createServerFn({ method: "POST" }).inputValidator(objectType({
	id: stringType().optional(),
	name: stringType()
})).handler(createSsrRpc("e2f233065deb4b094d48153c93bcdf028ea48591f6618210e0a662828cd0cacd"));
var deleteDepartmentFn = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(createSsrRpc("cca70dce1fec605ecf9e55218236801a6da56a2a109868021fa7c19ac6416dd5"));
var saveStudentFn = createServerFn({ method: "POST" }).inputValidator(objectType({
	id: stringType().optional(),
	name: stringType(),
	email: stringType().email(),
	departmentName: stringType()
})).handler(createSsrRpc("645973e1ac2df2a32f675e0a1e006bc6c0d5ea09874275a85f9151b7e535cdd6"));
var deleteStudentFn = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(createSsrRpc("44f908faa62562a34925f370aff7add353ebd906fa56bc210853594c6c6307a0"));
var saveTrainingFn = createServerFn({ method: "POST" }).inputValidator(anyType()).handler(createSsrRpc("0a4b3fb92279fa8b7d4c0d14eedf2b006a4a8dbe806db7a84a21e3f818c49ad8"));
var deleteTrainingFn = createServerFn({ method: "POST" }).inputValidator(objectType({ id: stringType() })).handler(createSsrRpc("9397574ddeaf50b236ed4499fb7f837a6dcd03201ab69ca42c16d875d4779450"));
var reorderTrainingsFn = createServerFn({ method: "POST" }).inputValidator(objectType({ updates: arrayType(objectType({
	id: stringType(),
	order: numberType()
})) })).handler(createSsrRpc("fa48b45acf5702eb014194c7771e42b7adcd4b0d5ce603cf6cddd7317de2c994"));
var markTrainingCompletedFn = createServerFn({ method: "POST" }).inputValidator(objectType({
	studentId: stringType(),
	trainingId: stringType()
})).handler(createSsrRpc("a163e7ae89d6fdb8ff28108af5f53b6f113c3dd9caa85f10cbfd1425fc314304"));
var unmarkTrainingCompletedFn = createServerFn({ method: "POST" }).inputValidator(objectType({
	studentId: stringType(),
	trainingId: stringType()
})).handler(createSsrRpc("de84fabb2884e9abd85898ad4c6c82143571a1048f96893eea259954ab4fde2e"));
var markStudentAccessFn = createServerFn({ method: "POST" }).inputValidator(objectType({ email: stringType().email() })).handler(createSsrRpc("dd424c6c4697747bf08053449477c6eeb9c0fa5a7ca7393a94f6ebf082a79656"));
var uploadPdfFn = createServerFn({ method: "POST" }).inputValidator(objectType({
	name: stringType(),
	base64: stringType()
})).handler(createSsrRpc("a55caba351c92492fd36e1d72f95f08dfc19fe8dceb86e5dd17385692b6ee820"));
var coverOptions = [
	"from-emerald-500/40 to-teal-700/30",
	"from-sky-500/40 to-indigo-700/30",
	"from-amber-500/40 to-orange-700/30",
	"from-violet-500/40 to-fuchsia-700/30",
	"from-rose-500/40 to-red-700/30",
	"from-cyan-500/40 to-blue-700/30"
];
function createId(value, fallback) {
	return `${value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || fallback}-${Date.now().toString(36)}`;
}
function recalculateTraining(training) {
	const totalLessons = training.modules.reduce((sum, module) => sum + module.lessons.length, 0);
	const completedLessons = training.modules.reduce((sum, module) => sum + module.lessons.filter((lesson) => lesson.completed).length, 0);
	return {
		...training,
		totalLessons,
		completedLessons
	};
}
function emptyLesson(index) {
	return {
		id: createId(`aula-${index}`, "lesson"),
		title: "",
		type: "video",
		duration: "",
		source: "",
		questions: []
	};
}
function emptyModule(index) {
	return {
		id: createId(`modulo-${index}`, "module"),
		title: `Modulo ${index}`,
		lessons: [emptyLesson(1)]
	};
}
function emptyTraining() {
	return {
		id: "",
		title: "",
		category: "",
		department: "Todos",
		description: "",
		cover: coverOptions[0],
		totalLessons: 0,
		completedLessons: 0,
		modules: [emptyModule(1)]
	};
}
function normalizeDepartment(value) {
	return value?.trim() || "Todos";
}
function isTrainingVisibleForStudent(training, student) {
	if (!student) return false;
	const trainingDepartment = normalizeDepartment(training.department);
	return trainingDepartment === "Todos" || trainingDepartment.toLowerCase() === student.department.trim().toLowerCase();
}
function usePortalData() {
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery({
		queryKey: ["portal-data"],
		queryFn: () => getPortalDataFn()
	});
	const { departments, students: rawStudents, trainings: rawTrainings, progress } = data;
	const departmentNames = [...new Set(["Todos", ...departments.map((d) => d.name)])].sort((a, b) => {
		if (a === "Todos") return -1;
		if (b === "Todos") return 1;
		return a.localeCompare(b);
	});
	const trainings = rawTrainings.map((t) => ({
		...t,
		department: t.department?.name || "Todos",
		modules: t.modules || []
	}));
	const students = rawStudents.map((s) => {
		const studentObj = {
			id: s.id,
			name: s.name,
			email: s.email,
			department: s.department?.name || "Todos",
			progress: s.progress,
			lastActive: s.lastActive,
			trainings: s.trainings,
			completed: s.completed
		};
		const visibleTrainings = trainings.filter((t) => isTrainingVisibleForStudent(t, studentObj));
		const completedIds = new Set(progress[s.id] ?? []);
		const completed = visibleTrainings.filter((t) => completedIds.has(t.id)).length;
		const total = visibleTrainings.length;
		studentObj.trainings = total;
		studentObj.completed = completed;
		studentObj.progress = total > 0 ? Math.round(completed / total * 100) : 0;
		return studentObj;
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["portal-data"] });
	const mutSaveDepartment = useMutation({
		mutationFn: (d) => saveDepartmentFn({ data: d }),
		onSuccess: invalidate
	});
	const mutDeleteDepartment = useMutation({
		mutationFn: (id) => deleteDepartmentFn({ data: { id } }),
		onSuccess: invalidate
	});
	const mutSaveStudent = useMutation({
		mutationFn: (s) => saveStudentFn({ data: s }),
		onSuccess: invalidate
	});
	const mutDeleteStudent = useMutation({
		mutationFn: (id) => deleteStudentFn({ data: { id } }),
		onSuccess: invalidate
	});
	const mutSaveTraining = useMutation({
		mutationFn: (t) => saveTrainingFn({ data: t }),
		onSuccess: invalidate
	});
	const mutDeleteTraining = useMutation({
		mutationFn: (id) => deleteTrainingFn({ data: { id } }),
		onSuccess: invalidate
	});
	const mutMarkTraining = useMutation({
		mutationFn: (d) => markTrainingCompletedFn({ data: d }),
		onSuccess: invalidate
	});
	const mutUnmarkTraining = useMutation({
		mutationFn: (d) => unmarkTrainingCompletedFn({ data: d }),
		onSuccess: invalidate
	});
	const mutMarkAccess = useMutation({
		mutationFn: (email) => markStudentAccessFn({ data: { email } }),
		onSuccess: invalidate
	});
	const mutReorderTrainings = useMutation({
		mutationFn: (updates) => reorderTrainingsFn({ data: { updates } }),
		onSuccess: invalidate
	});
	const mutUploadPdf = useMutation({ mutationFn: (d) => uploadPdfFn({ data: d }) });
	return {
		trainings,
		students,
		progress,
		departments,
		coverOptions,
		departmentNames,
		getTraining: (id) => trainings.find((t) => t.id === id) ?? null,
		getStudentByEmail: (email) => {
			const normalizedEmail = email?.trim().toLowerCase();
			if (!normalizedEmail) return null;
			return students.find((s) => s.email.trim().toLowerCase() === normalizedEmail) ?? null;
		},
		getVisibleTrainingsForStudent: (email) => {
			const normalizedEmail = email?.trim().toLowerCase();
			const student = normalizedEmail ? students.find((item) => item.email.trim().toLowerCase() === normalizedEmail) : null;
			return trainings.filter((training) => isTrainingVisibleForStudent(training, student));
		},
		isTrainingCompletedByStudent: (studentId, trainingId) => {
			if (!studentId) return false;
			return (progress[studentId] ?? []).includes(trainingId);
		},
		saveTraining: (training) => mutSaveTraining.mutate(training),
		deleteTraining: (id) => mutDeleteTraining.mutate(id),
		saveStudent: (student) => mutSaveStudent.mutate({
			...student,
			departmentName: student.department
		}),
		deleteStudent: (id) => mutDeleteStudent.mutate(id),
		saveDepartment: (department) => mutSaveDepartment.mutate(department),
		deleteDepartment: (id) => mutDeleteDepartment.mutate(id),
		markTrainingCompleted: (studentId, trainingId) => studentId && mutMarkTraining.mutate({
			studentId,
			trainingId
		}),
		unmarkTrainingCompleted: (studentId, trainingId) => studentId && mutUnmarkTraining.mutate({
			studentId,
			trainingId
		}),
		markStudentAccess: (email) => mutMarkAccess.mutate(email),
		reorderTrainings: (updates) => mutReorderTrainings.mutate(updates),
		uploadPdfAsync: (name, base64) => mutUploadPdf.mutateAsync({
			name,
			base64
		})
	};
}
function useLessonProgress(studentId) {
	const [completedLessons, setCompletedLessons] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		if (studentId) {
			const stored = localStorage.getItem(`lesson_progress_${studentId}`);
			if (stored) try {
				setCompletedLessons(new Set(JSON.parse(stored)));
			} catch {}
		}
	}, [studentId]);
	const markLessonCompleted = (lessonId) => {
		if (!studentId) return;
		setCompletedLessons((prev) => {
			const next = new Set(prev);
			next.add(lessonId);
			localStorage.setItem(`lesson_progress_${studentId}`, JSON.stringify([...next]));
			return next;
		});
	};
	const isLessonCompleted = (lessonId) => completedLessons.has(lessonId);
	return {
		isLessonCompleted,
		markLessonCompleted
	};
}
//#endregion
export { emptyTraining as a, usePortalData as c, emptyModule as i, StatCard as n, recalculateTraining as o, emptyLesson as r, useLessonProgress as s, PortalShell as t };
