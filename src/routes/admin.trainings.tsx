import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/admin/trainings")({
  head: () => ({ meta: [{ title: "Gerenciar treinamentos - BBDI" }] }),
  component: AdminTrainings,
});

function AdminTrainings() {
  const { trainings, deleteTraining, reorderTrainings } = usePortalData();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/admin/trainings" && pathname !== "/admin/trainings/") {
    return <Outlet />;
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const items = [...trainings];
    const temp = items[index - 1];
    items[index - 1] = items[index];
    items[index] = temp;
    reorderTrainings(items.map((t, i) => ({ id: t.id, order: i })));
  }

  function moveDown(index: number) {
    if (index === trainings.length - 1) return;
    const items = [...trainings];
    const temp = items[index + 1];
    items[index + 1] = items[index];
    items[index] = temp;
    reorderTrainings(items.map((t, i) => ({ id: t.id, order: i })));
  }

  return (
    <PortalShell
      title="Treinamentos"
      subtitle="Crie, edite e organize os treinamentos do portal."
      actions={
        <Link to="/admin/trainings/new" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> Novo treinamento
        </Link>
      }
    >
      <div className="rounded-xl border border-border bg-card/60 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/30">
              <th className="px-5 py-3 font-medium">Treinamento</th>
              <th className="px-5 py-3 font-medium">Categoria</th>
              <th className="px-5 py-3 font-medium">Departamento</th>
              <th className="px-5 py-3 font-medium text-right">Modulos</th>
              <th className="px-5 py-3 font-medium text-right">Aulas</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {trainings.map((training, index) => (
              <tr key={training.id} className="hover:bg-accent/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-md bg-gradient-to-br ${training.cover} shrink-0`} />
                    <div>
                      <div className="font-medium">{training.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{training.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{training.category}</td>
                <td className="px-5 py-4 text-muted-foreground">{training.department ?? "Todos"}</td>
                <td className="px-5 py-4 text-right tabular-nums">{training.modules.length}</td>
                <td className="px-5 py-4 text-right tabular-nums">{training.totalLessons}</td>
                <td className="px-5 py-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button type="button" onClick={() => moveUp(index)} disabled={index === 0} className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent disabled:opacity-30" aria-label="Mover para cima">
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={() => moveDown(index)} disabled={index === trainings.length - 1} className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent disabled:opacity-30" aria-label="Mover para baixo">
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <Link to="/admin/trainings/edit/$id" params={{ id: training.id }} className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent" aria-label="Editar">
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <button type="button" onClick={() => deleteTraining(training.id)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent text-destructive" aria-label="Remover">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trainings.length === 0 && <div className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhum treinamento cadastrado.</div>}
      </div>
    </PortalShell>
  );
}
