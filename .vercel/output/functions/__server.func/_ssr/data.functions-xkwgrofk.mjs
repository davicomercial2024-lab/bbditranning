import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { n as objectType, r as stringType, t as anyType } from "../_libs/zod.mjs";
import { n as prisma, t as createServerRpc } from "./db.server-D78azA7g.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data.functions-xkwgrofk.js
var getDepartmentsFn_createServerFn_handler = createServerRpc({
	id: "889618ac28c07b82364ef1828457d3380bbf130e11f7a23dc1946ad4fa4c1f01",
	name: "getDepartmentsFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => getDepartmentsFn.__executeServer(opts));
var getDepartmentsFn = createServerFn({ method: "GET" }).handler(getDepartmentsFn_createServerFn_handler, async () => {
	return await prisma.department.findMany({ orderBy: { name: "asc" } });
});
var getPortalDataFn_createServerFn_handler = createServerRpc({
	id: "a50f9e307953ebac7e3123eb7ec0f1c8abad0e916ea43dd8a8e0136c16b5ffc2",
	name: "getPortalDataFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => getPortalDataFn.__executeServer(opts));
var getPortalDataFn = createServerFn({ method: "GET" }).handler(getPortalDataFn_createServerFn_handler, async () => {
	const departments = await prisma.department.findMany({ orderBy: { name: "asc" } });
	const students = await prisma.student.findMany({
		include: {
			progressRecords: true,
			department: true
		},
		orderBy: { name: "asc" }
	});
	const trainings = await prisma.training.findMany({
		include: {
			progressRecords: true,
			department: true
		},
		orderBy: { title: "asc" }
	});
	const progress = {};
	for (const student of students) progress[student.id] = student.progressRecords.map((r) => r.trainingId);
	return {
		departments,
		students,
		trainings,
		progress
	};
});
var getStudentsFn_createServerFn_handler = createServerRpc({
	id: "4bf175c12610d4aee26b9dcb2d4a29972ced2db4da28d4d835604a87b7dac607",
	name: "getStudentsFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => getStudentsFn.__executeServer(opts));
var getStudentsFn = createServerFn({ method: "GET" }).handler(getStudentsFn_createServerFn_handler, async () => {
	return await prisma.student.findMany({
		include: {
			department: true,
			progressRecords: true,
			user: true
		},
		orderBy: { name: "asc" }
	});
});
var getTrainingsFn_createServerFn_handler = createServerRpc({
	id: "cd44e1b4f74f1edcc78717e152da895da34a738b7109f7aab05ebe44ee707f6f",
	name: "getTrainingsFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => getTrainingsFn.__executeServer(opts));
var getTrainingsFn = createServerFn({ method: "GET" }).handler(getTrainingsFn_createServerFn_handler, async () => {
	return await prisma.training.findMany({
		include: {
			department: true,
			progressRecords: true
		},
		orderBy: { title: "asc" }
	});
});
var saveDepartmentFn_createServerFn_handler = createServerRpc({
	id: "e2f233065deb4b094d48153c93bcdf028ea48591f6618210e0a662828cd0cacd",
	name: "saveDepartmentFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => saveDepartmentFn.__executeServer(opts));
var saveDepartmentFn = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().optional(),
	name: stringType()
})).handler(saveDepartmentFn_createServerFn_handler, async ({ data }) => {
	if (data.id && data.id !== "todos") return await prisma.department.update({
		where: { id: data.id },
		data: { name: data.name }
	});
	else return await prisma.department.create({ data: { name: data.name } });
});
var deleteDepartmentFn_createServerFn_handler = createServerRpc({
	id: "cca70dce1fec605ecf9e55218236801a6da56a2a109868021fa7c19ac6416dd5",
	name: "deleteDepartmentFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => deleteDepartmentFn.__executeServer(opts));
var deleteDepartmentFn = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(deleteDepartmentFn_createServerFn_handler, async ({ data }) => {
	await prisma.department.delete({ where: { id: data.id } });
	return { success: true };
});
var saveStudentFn_createServerFn_handler = createServerRpc({
	id: "645973e1ac2df2a32f675e0a1e006bc6c0d5ea09874275a85f9151b7e535cdd6",
	name: "saveStudentFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => saveStudentFn.__executeServer(opts));
var saveStudentFn = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().optional(),
	name: stringType(),
	email: stringType().email(),
	departmentName: stringType()
})).handler(saveStudentFn_createServerFn_handler, async ({ data }) => {
	const { id, name, email, departmentName } = data;
	let departmentId = null;
	if (departmentName && departmentName !== "Todos") {
		let dept = await prisma.department.findUnique({ where: { name: departmentName } });
		if (!dept) dept = await prisma.department.create({ data: { name: departmentName } });
		departmentId = dept.id;
	}
	const hashedPassword = await bcryptjs_default.hash("aluno123", 10);
	if (id) {
		const student = await prisma.student.update({
			where: { id },
			data: {
				name,
				email,
				departmentId
			}
		});
		if (student.userId) await prisma.user.update({
			where: { id: student.userId },
			data: {
				name,
				email
			}
		});
		return student;
	} else {
		const user = await prisma.user.create({ data: {
			email,
			name,
			password: hashedPassword,
			role: "student"
		} });
		return await prisma.student.create({ data: {
			id: user.id,
			name,
			email,
			userId: user.id,
			departmentId
		} });
	}
});
var deleteStudentFn_createServerFn_handler = createServerRpc({
	id: "44f908faa62562a34925f370aff7add353ebd906fa56bc210853594c6c6307a0",
	name: "deleteStudentFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => deleteStudentFn.__executeServer(opts));
var deleteStudentFn = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(deleteStudentFn_createServerFn_handler, async ({ data }) => {
	const student = await prisma.student.findUnique({ where: { id: data.id } });
	if (student && student.userId) await prisma.user.delete({ where: { id: student.userId } });
	return { success: true };
});
var saveTrainingFn_createServerFn_handler = createServerRpc({
	id: "0a4b3fb92279fa8b7d4c0d14eedf2b006a4a8dbe806db7a84a21e3f818c49ad8",
	name: "saveTrainingFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => saveTrainingFn.__executeServer(opts));
var saveTrainingFn = createServerFn({ method: "POST" }).validator(anyType()).handler(saveTrainingFn_createServerFn_handler, async ({ data }) => {
	const training = data;
	let departmentId = null;
	if (training.department && training.department !== "Todos") {
		let dept = await prisma.department.findUnique({ where: { name: training.department } });
		if (!dept) dept = await prisma.department.create({ data: { name: training.department } });
		departmentId = dept.id;
	}
	if (training.id) {
		if (await prisma.training.findUnique({ where: { id: training.id } })) return await prisma.training.update({
			where: { id: training.id },
			data: {
				title: training.title,
				category: training.category,
				description: training.description,
				cover: training.cover,
				departmentId,
				modules: training.modules || [],
				totalLessons: training.totalLessons || 0,
				completedLessons: training.completedLessons || 0
			}
		});
	}
	const newId = "training-" + Date.now().toString(36);
	return await prisma.training.create({ data: {
		id: newId,
		title: training.title,
		category: training.category,
		description: training.description,
		cover: training.cover,
		departmentId,
		modules: training.modules || [],
		totalLessons: training.totalLessons || 0,
		completedLessons: training.completedLessons || 0
	} });
});
var deleteTrainingFn_createServerFn_handler = createServerRpc({
	id: "9397574ddeaf50b236ed4499fb7f837a6dcd03201ab69ca42c16d875d4779450",
	name: "deleteTrainingFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => deleteTrainingFn.__executeServer(opts));
var deleteTrainingFn = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(deleteTrainingFn_createServerFn_handler, async ({ data }) => {
	await prisma.training.delete({ where: { id: data.id } });
	return { success: true };
});
var markTrainingCompletedFn_createServerFn_handler = createServerRpc({
	id: "a163e7ae89d6fdb8ff28108af5f53b6f113c3dd9caa85f10cbfd1425fc314304",
	name: "markTrainingCompletedFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => markTrainingCompletedFn.__executeServer(opts));
var markTrainingCompletedFn = createServerFn({ method: "POST" }).validator(objectType({
	studentId: stringType(),
	trainingId: stringType()
})).handler(markTrainingCompletedFn_createServerFn_handler, async ({ data }) => {
	await prisma.studentTrainingProgress.upsert({
		where: { studentId_trainingId: {
			studentId: data.studentId,
			trainingId: data.trainingId
		} },
		update: {},
		create: {
			studentId: data.studentId,
			trainingId: data.trainingId
		}
	});
	return { success: true };
});
var unmarkTrainingCompletedFn_createServerFn_handler = createServerRpc({
	id: "de84fabb2884e9abd85898ad4c6c82143571a1048f96893eea259954ab4fde2e",
	name: "unmarkTrainingCompletedFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => unmarkTrainingCompletedFn.__executeServer(opts));
var unmarkTrainingCompletedFn = createServerFn({ method: "POST" }).validator(objectType({
	studentId: stringType(),
	trainingId: stringType()
})).handler(unmarkTrainingCompletedFn_createServerFn_handler, async ({ data }) => {
	await prisma.studentTrainingProgress.deleteMany({ where: {
		studentId: data.studentId,
		trainingId: data.trainingId
	} });
	return { success: true };
});
var markStudentAccessFn_createServerFn_handler = createServerRpc({
	id: "dd424c6c4697747bf08053449477c6eeb9c0fa5a7ca7393a94f6ebf082a79656",
	name: "markStudentAccessFn",
	filename: "src/lib/api/data.functions.ts"
}, (opts) => markStudentAccessFn.__executeServer(opts));
var markStudentAccessFn = createServerFn({ method: "POST" }).validator(objectType({ email: stringType().email() })).handler(markStudentAccessFn_createServerFn_handler, async ({ data }) => {
	const formatter = new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
	await prisma.student.updateMany({
		where: { email: data.email },
		data: { lastActive: formatter.format(/* @__PURE__ */ new Date()) }
	});
	return { success: true };
});
//#endregion
export { deleteDepartmentFn_createServerFn_handler, deleteStudentFn_createServerFn_handler, deleteTrainingFn_createServerFn_handler, getDepartmentsFn_createServerFn_handler, getPortalDataFn_createServerFn_handler, getStudentsFn_createServerFn_handler, getTrainingsFn_createServerFn_handler, markStudentAccessFn_createServerFn_handler, markTrainingCompletedFn_createServerFn_handler, saveDepartmentFn_createServerFn_handler, saveStudentFn_createServerFn_handler, saveTrainingFn_createServerFn_handler, unmarkTrainingCompletedFn_createServerFn_handler };
