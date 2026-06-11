import { createFileRoute } from "@tanstack/react-router";
import { AdminTrainingForm } from "@/components/admin-training-form";
import { PortalShell } from "@/components/portal-shell";
import { usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/admin/trainings/edit/$id")({
  head: () => ({ meta: [{ title: "Editar treinamento - BBDI" }] }),
  component: EditTraining,
});

function EditTraining() {
  const { id } = Route.useParams();
  const { getTraining } = usePortalData();
  const training = getTraining(id);

  if (!training) {
    return (
      <PortalShell title="Treinamento nao encontrado">
        <p className="text-sm text-muted-foreground">Esse treinamento nao existe ou foi removido.</p>
      </PortalShell>
    );
  }

  return (
    <PortalShell title="Editar treinamento" subtitle={training.title}>
      <AdminTrainingForm training={training} />
    </PortalShell>
  );
}
