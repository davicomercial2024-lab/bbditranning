import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CBA1Jgnc.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./esm-I6x-3bX5.mjs";
import { i as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as objectType, r as stringType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-data-DzS8TpSK.js
var import_jsx_runtime = require_jsx_runtime();
function BrandLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.svg",
		alt: "BBDI Trainning",
		className
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loginFn = createServerFn({ method: "POST" }).validator(objectType({
	email: stringType().email(),
	password: stringType()
})).handler(createSsrRpc("1410941f1858cb37e40d4e06d89f57bbd74c19e08216943094c08119d7d94236"));
var logoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("2e0d99256c909847a98d4f611d1fd1e487b6962fad37b282307519b357797cfc"));
createServerFn({ method: "GET" }).handler(createSsrRpc("142aa38b95b50675586163bba05c611f6901432278cee38d20fb5d8c0f0a43a0"));
createServerFn({ method: "GET" }).handler(createSsrRpc("889618ac28c07b82364ef1828457d3380bbf130e11f7a23dc1946ad4fa4c1f01"));
var getPortalDataFn = createServerFn({ method: "GET" }).handler(createSsrRpc("a50f9e307953ebac7e3123eb7ec0f1c8abad0e916ea43dd8a8e0136c16b5ffc2"));
createServerFn({ method: "GET" }).handler(createSsrRpc("4bf175c12610d4aee26b9dcb2d4a29972ced2db4da28d4d835604a87b7dac607"));
createServerFn({ method: "GET" }).handler(createSsrRpc("cd44e1b4f74f1edcc78717e152da895da34a738b7109f7aab05ebe44ee707f6f"));
var saveDepartmentFn = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().optional(),
	name: stringType()
})).handler(createSsrRpc("e2f233065deb4b094d48153c93bcdf028ea48591f6618210e0a662828cd0cacd"));
var deleteDepartmentFn = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(createSsrRpc("cca70dce1fec605ecf9e55218236801a6da56a2a109868021fa7c19ac6416dd5"));
var saveStudentFn = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().optional(),
	name: stringType(),
	email: stringType().email(),
	departmentName: stringType()
})).handler(createSsrRpc("645973e1ac2df2a32f675e0a1e006bc6c0d5ea09874275a85f9151b7e535cdd6"));
var deleteStudentFn = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(createSsrRpc("44f908faa62562a34925f370aff7add353ebd906fa56bc210853594c6c6307a0"));
var saveTrainingFn = createServerFn({ method: "POST" }).validator(anyType()).handler(createSsrRpc("0a4b3fb92279fa8b7d4c0d14eedf2b006a4a8dbe806db7a84a21e3f818c49ad8"));
var deleteTrainingFn = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(createSsrRpc("9397574ddeaf50b236ed4499fb7f837a6dcd03201ab69ca42c16d875d4779450"));
var markTrainingCompletedFn = createServerFn({ method: "POST" }).validator(objectType({
	studentId: stringType(),
	trainingId: stringType()
})).handler(createSsrRpc("a163e7ae89d6fdb8ff28108af5f53b6f113c3dd9caa85f10cbfd1425fc314304"));
var unmarkTrainingCompletedFn = createServerFn({ method: "POST" }).validator(objectType({
	studentId: stringType(),
	trainingId: stringType()
})).handler(createSsrRpc("de84fabb2884e9abd85898ad4c6c82143571a1048f96893eea259954ab4fde2e"));
var markStudentAccessFn = createServerFn({ method: "POST" }).validator(objectType({ email: stringType().email() })).handler(createSsrRpc("dd424c6c4697747bf08053449477c6eeb9c0fa5a7ca7393a94f6ebf082a79656"));
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
		source: ""
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
		markStudentAccess: (email) => mutMarkAccess.mutate(email)
	};
}
//#endregion
export { loginFn as a, usePortalData as c, emptyTraining as i, emptyLesson as n, logoutFn as o, emptyModule as r, recalculateTraining as s, BrandLogo as t };
