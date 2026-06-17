import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as usePortalData, t as PortalShell } from "./portal-data-Cxlz1458.mjs";
import { t as Route } from "./admin.trainings.edit._id-CHS62cbt.mjs";
import { t as AdminTrainingForm } from "./admin-training-form-lRQLHyxA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.trainings.edit._id-DsS-c_pg.js
var import_jsx_runtime = require_jsx_runtime();
function EditTraining() {
	const { id } = Route.useParams();
	const { getTraining } = usePortalData();
	const training = getTraining(id);
	if (!training) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Treinamento nao encontrado",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Esse treinamento nao existe ou foi removido."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
		title: "Editar treinamento",
		subtitle: training.title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTrainingForm, { training })
	});
}
//#endregion
export { EditTraining as component };
