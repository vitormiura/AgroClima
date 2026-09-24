# AgroClima

Plataforma web responsiva para comparacao e consolidacao de previsoes meteorologicas, desenvolvida como projeto academico da disciplina Projeto Integrador em Computacao VI da Univesp.

O AgroClima consulta duas fontes meteorologicas, compara suas previsoes e apresenta as divergencias de forma simples, com foco no apoio ao planejamento de pequenos produtores e da agricultura familiar.

## Visao geral

O projeto foi iniciado com a base tecnica definida em [PROJECT.md](./PROJECT.md). A aplicacao ja possui o bootstrap inicial, com Next.js, TypeScript, Tailwind CSS, App Router e uma base inicial de shadcn/ui.

## Estado atual

- Fase 1 concluida no workspace root.
- `npm run lint` passa.
- `npm run build` passa.
- A estrutura usa `src/`.
- A base inicial de shadcn/ui ja esta preparada.
- O historico de progresso portatil fica em [`.memory/progress.md`](./.memory/progress.md).

## Como executar

Antes de usar npm nesta maquina Windows, ative o Node no PowerShell:

```powershell
$env:PATH = "C:\Users\BRMOU319899\tools\node;$env:PATH"
Set-Alias npm npm.cmd
Set-Alias npx npx.cmd
```

Depois execute:

```bash
npm install
npm run dev
```

A aplicacao fica disponivel em:

```text
http://localhost:3000
```

## Variaveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
WEATHER_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_NAME=AgroClima
```

Nunca versionar `.env.local` e nunca expor segredos com o prefixo `NEXT_PUBLIC_`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Escopo do MVP

O MVP sera considerado concluido quando:

- as duas APIs forem consultadas;
- os dados forem normalizados e comparados;
- os tres dias comuns forem exibidos;
- os calculos tiverem testes unitarios;
- a interface funcionar em desktop e celular;
- uma consulta puder ser salva e visualizada no historico;
- a aplicacao estiver publicada na Vercel;
- a PWA puder ser adicionada a tela inicial.

## Fora do escopo

Nao fazem parte do MVP:

- login e cadastro de usuarios;
- aplicativo nativo;
- publicacao em lojas de aplicativos;
- notificacoes push;
- integracao com Telegram;
- inteligencia artificial ou machine learning;
- modelo meteorologico proprio;
- painel administrativo;
- pagamentos;
- microservicos;
- mais de duas APIs meteorologicas.

## Limitacoes

- A media consolidada e um indicador simples, nao uma nova previsao meteorologica cientifica.
- As APIs podem usar modelos e horarios de atualizacao diferentes.
- A comparacao fica limitada ao periodo disponivel nas duas fontes.
- O projeto depende da disponibilidade de servicos externos.
- O sistema nao substitui alertas meteorologicos oficiais nem orientacao tecnica agronomica.

## Continuacao do trabalho

Se voce continuar este projeto em outra maquina, leia primeiro [PROJECT.md](./PROJECT.md) e depois [`.memory/progress.md`](./.memory/progress.md). Esse arquivo resume o estado atual, o ambiente e os proximos passos.