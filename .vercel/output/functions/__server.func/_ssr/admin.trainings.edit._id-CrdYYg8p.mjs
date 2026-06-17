import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as usePortalData, t as PortalShell } from "./portal-data-T52_kgG4.mjs";
import { t as Route } from "./admin.trainings.edit._id-yRzgsfFR.mjs";
import { t as AdminTrainingForm } from "./admin-training-form-4UXA4oDG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.trainings.edit._id-CrdYYg8p.js
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
