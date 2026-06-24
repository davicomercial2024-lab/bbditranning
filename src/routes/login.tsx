import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { type UserRole, saveSession } from "@/lib/auth";
import { loginFn } from "@/lib/api/auth.functions";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Login - BBDI Trainning" },
      { name: "description", content: "Acesse o portal BBDI Trainning." },
    ],
  }),
  component: LoginPage,
});

function getRedirectPath(role: UserRole, redirect?: string) {
  if (role === "admin") {
    return redirect?.startsWith("/admin") ? redirect : "/admin";
  }

  return redirect && !redirect.startsWith("/admin") && redirect !== "/login" ? redirect : "/";
}

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const session = await loginFn({ data: { email, password } });
      saveSession(session);

      const destination = getRedirectPath(session.role as UserRole, redirect);

      if (destination === "/admin") {
        void navigate({ to: "/admin" });
        return;
      }

      if (destination === "/") {
        void navigate({ to: "/" });
        return;
      }

      window.location.assign(destination);
    } catch (err: any) {
      setError(err.message || "E-mail ou senha invalidos.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-foreground">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-border bg-card/70 p-6 shadow-sm">
        <div className="mb-6">
          <BrandLogo className="mx-auto h-auto w-full max-h-44 object-contain" />
          <p className="text-gray-400 text-sm mb-6 text-center">
            Acesse o portal de treinamentos do Grupo BBDI.
          </p>
        </div>

        <label className="block text-sm font-medium" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          required
        />

        <label className="mt-4 block text-sm font-medium" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          required
        />

        {error && <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}
        <p className="mt-4 text-xs text-muted-foreground">Senha padrao de aluno: aluno123.</p>

        <button type="submit" className="mt-6 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Entrar
        </button>
      </form>
    </main>
  );
}
