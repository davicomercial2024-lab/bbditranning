import { createFileRoute } from "@tanstack/react-router";
import { AdminTrainingForm } from "@/components/admin-training-form";
import { PortalShell } from "@/components/portal-shell";

export const Route = createFileRoute("/admin/trainings/new")({
  head: () => ({ meta: [{ title: "Novo treinamento - BBDI" }] }),
  component: NewTraining,
});

function NewTraining() {
  return (
    <PortalShell title="Novo treinamento" subtitle="Cadastre conteudos organizados em modulos e aulas.">
      <AdminTrainingForm />
    </PortalShell>
  );
}
