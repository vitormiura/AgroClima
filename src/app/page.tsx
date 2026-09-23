import {
  ArrowRight,
  CloudSun,
  MapPin,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = [
  {
    title: "Duas fontes em paralelo",
    description:
      "Open-Meteo e WeatherAPI.com entram no mesmo fluxo, sem expor chaves no frontend.",
    icon: CloudSun,
  },
  {
    title: "Consolidação explicável",
    description:
      "Média, divergência e concordância ficam em funções puras e fáceis de testar.",
    icon: ShieldCheck,
  },
  {
    title: "Base pronta para histórico",
    description:
      "A estrutura já prevê persistência no Supabase e evolução gradual do MVP.",
    icon: Radar,
  },
] as const;

const metrics = [
  { label: "Fontes", value: "2" },
  { label: "Dias comparados", value: "3" },
  { label: "Status", value: "Bootstrap" },
] as const;

const nextSteps = [
  "Conectar busca por cidade e geolocalização.",
  "Normalizar os retornos das duas APIs.",
  "Exibir comparação diária com concordância.",
] as const;

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/60 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
              AgroClima
            </p>
            <p className="text-sm text-slate-600">
              Comparação simples de previsões meteorológicas.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Fase 1 ativa
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 shadow-sm shadow-sky-100">
              <MapPin className="h-4 w-4" />
              Base inicial com shadcn/ui, Tailwind e App Router
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Compare previsões do tempo com uma leitura direta e sem ruído.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              O AgroClima nasce pronto para reunir Open-Meteo e WeatherAPI.com,
              alinhar três dias de previsão e mostrar a diferença entre as fontes
              em uma interface pensada para celular primeiro.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="shadow-lg shadow-slate-950/10">
                <MapPin className="h-4 w-4" />
                Buscar cidade
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#base">
                  Ver base do projeto
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-400/25 via-cyan-300/15 to-emerald-300/20 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-200/75">
                    Resumo do protótipo
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Comparação explicável em um único painel
                  </h2>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sky-200">
                  <CloudSun className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white/10 p-2 text-sky-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-semibold leading-5 text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                id="base"
                className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-200">
                    <Radar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      Próxima entrega técnica
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Conectar localização, consultar os providers e retornar a
                      previsão já normalizada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 pb-8 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-3xl border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                0{index + 1}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
