import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CompararClient } from "@/components/comparacao/comparar-client";

export const metadata: Metadata = {
  title: "Comparar previsões",
  description: "Compare as previsões da Open-Meteo e da WeatherAPI.com para os próximos três dias.",
};

export default function CompararPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-500">AgroClima</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Comparar previsões
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-slate-600 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" /> Início
          </Link>
        </header>

        <CompararClient />

        <section className="mt-10 rounded-3xl border border-slate-200/80 bg-white/80 p-5 text-sm leading-6 text-slate-600">
          <h2 className="font-semibold text-slate-900">Como ler o indicador de concordância</h2>
          <p className="mt-2">
            Para cada variável, o AgroClima calcula a média entre as fontes (valor consolidado) e a
            divergência percentual entre elas. Até 10% de divergência, a concordância é alta; acima de 10% até
            25%, média; acima de 25%, baixa. Essas faixas são parâmetros do protótipo, e não uma
            classificação meteorológica oficial. Concordância alta não garante que a previsão vai se
            confirmar, e o AgroClima não substitui alertas oficiais nem orientação agronômica.
          </p>
        </section>

        <footer className="mt-6 pb-6 text-xs text-slate-500">
          Dados meteorológicos:{" "}
          <a className="underline" href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo
          </a>{" "}
          (CC BY 4.0) e{" "}
          <a className="underline" href="https://www.weatherapi.com/" target="_blank" rel="noreferrer">
            Powered by WeatherAPI.com
          </a>
          . Busca de cidades: Open-Meteo Geocoding (GeoNames).
        </footer>
      </div>
    </main>
  );
}
