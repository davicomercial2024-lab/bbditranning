import { createFileRoute } from "@tanstack/react-router";
import { Edit2, Plus, Save, Trash2, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { type Department, usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/admin/departments")({
  head: () => ({ meta: [{ title: "Departamentos - BBDI" }] }),
  component: AdminDepartments,
});

function AdminDepartments() {
  const { departments, trainings, students, saveDepartment, deleteDepartment } = usePortalData();
  const [draft, setDraft] = useState<Department | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;

    const name = draft.name.trim();
    const duplicate = departments.some((department) => department.id !== draft.id && department.name.trim().toLowerCase() === name.toLowerCase());

    if (!name) {
      setError("Informe o nome do departamento.");
      return;
    }

    if (duplicate) {
      setError("Ja existe um departamento com esse nome.");
      return;
    }

    saveDepartment({ ...draft, name });
    setDraft(null);
    setError("");
  }

  function canDelete(department: Department) {
    if (department.name === "Todos") return false;
    const usedByStudents = students.some((student) => student.department === department.name);
    const usedByTrainings = trainings.some((training) => (training.department ?? "Todos") === department.name);
    return !usedByStudents && !usedByTrainings;
  }

  return (
    <PortalShell
      title="Departamentos"
      subtitle="Cadastre os departamentos usados para atribuir treinamentos."
      actions={
        <button
          type="button"
          onClick={() => setDraft({ id: "", name: "" })}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Novo departamento
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {departments.map((department) => {
            const trainingCount = trainings.filter((training) => (training.department ?? "Todos") === department.name).length;
            const studentCount = students.filter((student) => student.department === department.name).length;
            const deletable = canDelete(department);
            const editable = department.name !== "Todos";

            return (
              <div key={department.id} className="rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-semibold truncate">{department.name}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{studentCount} colaboradores - {trainingCount} treinamentos</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={!editable}
                      onClick={() => setDraft(department)}
                      className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Editar departamento"
                      title={editable ? "Editar departamento" : "Departamento global"}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={!deletable}
                      onClick={() => deleteDepartment(department.id)}
                      className="h-8 w-8 grid place-items-center rounded-md text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Excluir departamento"
                      title={deletable ? "Excluir departamento" : "Departamento em uso"}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {draft && (
          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card/60 p-5 h-fit space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold">{draft.id ? "Editar departamento" : "Novo departamento"}</h2>
                <p className="text-xs text-muted-foreground">Esse nome aparece no cadastro de colaboradores e treinamentos.</p>
              </div>
              <button type="button" onClick={() => setDraft(null)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent" aria-label="Fechar">
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Nome</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
                autoFocus
              />
            </label>

            {error && <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90">
              <Save className="h-4 w-4" /> Salvar departamento
            </button>
          </form>
        )}
      </div>
    </PortalShell>
  );
}
