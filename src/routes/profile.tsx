import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { getStoredSession } from "@/lib/auth";
import { usePortalData } from "@/lib/portal-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Perfil - BBDI Trainning" }] }),
  component: Profile,
});

function Profile() {
  const session = getStoredSession();
  const { students } = usePortalData();
  const student = students.find((item) => item.email.trim().toLowerCase() === session?.email.trim().toLowerCase());
  const name = student?.name ?? session?.name ?? "Aluno";
  const email = student?.email ?? session?.email ?? "";
  const department = student?.department ?? session?.department ?? "Sem departamento";

  return (
    <PortalShell title="Perfil" subtitle="Suas informacoes de colaborador.">
      <div className="rounded-xl border border-border bg-card/60 p-6 flex items-center gap-5">
        <div className="h-16 w-16 rounded-full bg-primary/15 text-primary grid place-items-center font-display font-bold text-2xl">{name.charAt(0)}</div>
        <div>
          <div className="font-display font-semibold text-lg">{name}</div>
          <div className="text-sm text-muted-foreground">{email} - {department}</div>
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {[
          ["Departamento", department],
          ["Ultimo acesso", student?.lastActive ?? "Hoje"],
          ["Treinamentos concluidos", `${student?.completed ?? 0}/${student?.trainings ?? 0}`],
          ["Progresso geral", `${student?.progress ?? 0}%`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-card/60 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="mt-1 text-sm">{v}</div>
          </div>
        ))}
      </div>
    </PortalShell>
  );
}
