import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as usePortalData } from "./portal-data-DzS8TpSK.mjs";
import { t as PortalShell } from "./portal-shell-n0aby6Gi.mjs";
import { t as Route } from "./admin.trainings.edit._id-k2ZEaxze.mjs";
import { t as AdminTrainingForm } from "./admin-training-form-Blw0juAv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.trainings.edit._id-BrZ9SOW_.js
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
