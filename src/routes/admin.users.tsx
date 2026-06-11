import { createFileRoute } from "@tanstack/react-router";
import { Edit2, Plus, Save, Trash2, X } from "lucide-react";
import { type FormEvent, type InputHTMLAttributes, useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { type Student, usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Colaboradores - BBDI" }] }),
  component: AdminUsers,
});

const emptyStudent: Student = {
  id: "",
  name: "",
  email: "",
  department: "",
  progress: 0,
  lastActive: "Nunca acessou",
  trainings: 0,
  completed: 0,
};

function Field({ label, ...rest }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
    </label>
  );
}

function AdminUsers() {
  const { students, departmentNames, saveStudent, deleteStudent } = usePortalData();
  const [draft, setDraft] = useState<Student | null>(null);
  const [error, setError] = useState("");

  function openDraft(student?: Student) {
    setError("");
    setDraft(student ? { ...student } : { ...emptyStudent, department: departmentNames.find((name) => name !== "Todos") ?? "" });
  }

  function handleDeleteStudent(student: Student) {
    deleteStudent(student.id);
    if (draft?.id === student.id) {
      setDraft(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;

    const email = draft.email.trim().toLowerCase();
    const duplicate = students.some((student) => student.id !== draft.id && student.email.trim().toLowerCase() === email);

    if (duplicate) {
      setError("Ja existe um colaborador com este e-mail.");
      return;
    }

    if (!draft.department) {
      setError("Selecione um departamento.");
      return;
    }

    saveStudent({
      ...draft,
      name: draft.name.trim(),
      email,
    });
    setDraft(null);
    setError("");
  }

  function ProgressCell({ student }: { student: Student }) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${student.progress}%` }} />
        </div>
        <span className="text-xs tabular-nums w-10 text-right">{student.progress}%</span>
      </div>
    );
  }

  return (
    <PortalShell
      title="Colaboradores"
      subtitle="Acompanhe e edite os dados de cada aluno."
      actions={
        <button type="button" onClick={() => openDraft()} className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> Novo colaborador
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="hidden overflow-x-auto rounded-xl border border-border bg-card/60 lg:block">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/30">
                <th className="px-5 py-3 font-medium">Colaborador</th>
                <th className="px-5 py-3 font-medium">Departamento</th>
                <th className="px-5 py-3 font-medium">Ultimo acesso</th>
                <th className="px-5 py-3 font-medium">Concluidos</th>
                <th className="px-5 py-3 font-medium w-64">Progresso geral</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-accent/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/15 text-primary grid place-items-center text-sm font-semibold">{student.name.charAt(0)}</div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{student.department}</td>
                  <td className="px-5 py-4 text-muted-foreground">{student.lastActive}</td>
                  <td className="px-5 py-4 tabular-nums">{student.completed}/{student.trainings}</td>
                  <td className="px-5 py-4"><ProgressCell student={student} /></td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button type="button" onClick={() => openDraft(student)} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent">
                        <Edit2 className="h-3.5 w-3.5" /> Editar
                      </button>
                      <button type="button" onClick={() => handleDeleteStudent(student)} className="inline-flex items-center gap-2 rounded-md border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3.5 w-3.5" /> Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && <div className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhum colaborador cadastrado.</div>}
        </div>

        <div className="grid gap-3 lg:hidden">
          {students.map((student) => (
            <div key={student.id} className="rounded-xl border border-border bg-card/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{student.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{student.email}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => openDraft(student)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent" aria-label="Editar colaborador">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => handleDeleteStudent(student)} className="h-8 w-8 grid place-items-center rounded-md text-destructive hover:bg-destructive/10" aria-label="Excluir colaborador">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Departamento</div>
                  <div className="mt-1">{student.department}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Ultimo acesso</div>
                  <div className="mt-1">{student.lastActive}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Concluidos</div>
                  <div className="mt-1">{student.completed}/{student.trainings}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Progresso</div>
                  <div className="mt-1">{student.progress}%</div>
                </div>
              </div>
              <div className="mt-3"><ProgressCell student={student} /></div>
            </div>
          ))}
        </div>

        {draft && (
          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card/60 p-5 h-fit space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold">{draft.id ? "Editar colaborador" : "Novo colaborador"}</h2>
                <p className="text-xs text-muted-foreground">Login: e-mail cadastrado. Senha padrao: aluno123.</p>
              </div>
              <button type="button" onClick={() => setDraft(null)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent" aria-label="Fechar">
                <X className="h-4 w-4" />
              </button>
            </div>

            <Field label="Nome" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />
            <Field label="E-mail" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} required />
            <label className="block">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Departamento</span>
              <select
                value={draft.department}
                onChange={(event) => setDraft({ ...draft, department: event.target.value })}
                className="mt-1.5 w-full rounded-md border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
                required
              >
                <option value="">Selecione</option>
                {departmentNames.filter((name) => name !== "Todos").map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </label>
            {draft.id && (
              <div className="rounded-md border border-border bg-background/40 px-3 py-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Ultimo acesso</div>
                <div className="mt-1 text-sm">{draft.lastActive}</div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-md border border-border bg-background/40 px-3 py-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Treinos</div>
                <div className="mt-1 text-sm">{draft.trainings}</div>
              </div>
              <div className="rounded-md border border-border bg-background/40 px-3 py-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Concluidos</div>
                <div className="mt-1 text-sm">{draft.completed}</div>
              </div>
              <div className="rounded-md border border-border bg-background/40 px-3 py-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Progresso</div>
                <div className="mt-1 text-sm">{draft.progress}%</div>
              </div>
            </div>

            {error && <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}

            <div className="flex flex-col gap-2">
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90">
                <Save className="h-4 w-4" /> Salvar colaborador
              </button>
              {draft.id && (
                <button type="button" onClick={() => handleDeleteStudent(draft)} className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-destructive/40 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" /> Excluir colaborador
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </PortalShell>
  );
}
