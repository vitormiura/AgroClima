# AgroClima

Plataforma web responsiva para comparaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o e consolidaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de previsÃƒÆ’Ã‚Âµes meteorolÃƒÆ’Ã‚Â³gicas, desenvolvida como projeto acadÃƒÆ’Ã‚Âªmico da disciplina **Projeto Integrador em ComputaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o VI** da **Univesp**.

O AgroClima consulta duas fontes meteorolÃƒÆ’Ã‚Â³gicas, compara suas previsÃƒÆ’Ã‚Âµes e apresenta as divergÃƒÆ’Ã‚Âªncias de forma simples, com foco no apoio ao planejamento de pequenos produtores e da agricultura familiar.

## Contexto

Aplicativos de previsÃƒÆ’Ã‚Â£o do tempo podem apresentar resultados diferentes para a mesma localizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o, pois utilizam fontes, modelos meteorolÃƒÆ’Ã‚Â³gicos e horÃƒÆ’Ã‚Â¡rios de atualizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o distintos. Essa divergÃƒÆ’Ã‚Âªncia pode dificultar a tomada de decisÃƒÆ’Ã‚Âµes de pessoas que dependem das condiÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes climÃƒÆ’Ã‚Â¡ticas para planejar atividades como plantio, irrigaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o, aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de defensivos e colheita.

O AgroClima busca reduzir essa dificuldade ao reunir previsÃƒÆ’Ã‚Âµes de duas APIs meteorolÃƒÆ’Ã‚Â³gicas em uma ÃƒÆ’Ã‚Âºnica interface. A aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o nÃƒÆ’Ã‚Â£o pretende substituir serviÃƒÆ’Ã‚Â§os meteorolÃƒÆ’Ã‚Â³gicos oficiais nem produzir uma previsÃƒÆ’Ã‚Â£o cientÃƒÆ’Ã‚Â­fica prÃƒÆ’Ã‚Â³pria. Seu papel ÃƒÆ’Ã‚Â© facilitar a comparaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o entre fontes e apresentar um valor consolidado para cada variÃƒÆ’Ã‚Â¡vel analisada.

## Objetivo

Desenvolver uma aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o web que:

- consulte mais de uma fonte meteorolÃƒÆ’Ã‚Â³gica;
- normalize dados que possuem formatos diferentes;
- compare as previsÃƒÆ’Ã‚Âµes para a mesma localizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o e data;
- calcule indicadores simples de consolidaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o e divergÃƒÆ’Ã‚Âªncia;
- apresente os resultados em uma interface acessÃƒÆ’Ã‚Â­vel e responsiva;
- mantenha um histÃƒÆ’Ã‚Â³rico bÃƒÆ’Ã‚Â¡sico das consultas realizadas;
- possa ser instalada no celular como uma PWA.

## Funcionalidades previstas

- Busca de localizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o por cidade.
- Uso opcional da geolocalizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o do dispositivo.
- Consulta ÃƒÆ’Ã‚Â  Open-Meteo.
- Consulta ÃƒÆ’Ã‚Â  WeatherAPI.com.
- ComparaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o dos trÃƒÆ’Ã‚Âªs dias disponÃƒÆ’Ã‚Â­veis nas duas fontes.
- ExibiÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de:
  - temperatura mÃƒÆ’Ã‚Â­nima;
  - temperatura mÃƒÆ’Ã‚Â¡xima;
  - umidade;
  - precipitaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o;
  - probabilidade de chuva;
  - velocidade mÃƒÆ’Ã‚Â¡xima do vento.
- CÃƒÆ’Ã‚Â¡lculo de mÃƒÆ’Ã‚Â©dia consolidada.
- CÃƒÆ’Ã‚Â¡lculo de diferenÃƒÆ’Ã‚Â§a absoluta.
- CÃƒÆ’Ã‚Â¡lculo de divergÃƒÆ’Ã‚Âªncia percentual.
- ClassificaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o da concordÃƒÆ’Ã‚Â¢ncia entre as fontes.
- GrÃƒÆ’Ã‚Â¡ficos comparativos.
- HistÃƒÆ’Ã‚Â³rico simples de consultas.
- Layout responsivo para desktop e dispositivos mÃƒÆ’Ã‚Â³veis.
- InstalaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o como Progressive Web App.

## Como funciona

```text
UsuÃƒÆ’Ã‚Â¡rio seleciona uma localizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o
                |
                v
      Route Handler do Next.js
         /                 \
        v                   v
  Open-Meteo         WeatherAPI.com
        \                   /
         \                 /
          v               v
          NormalizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o dos dados
                    |
                    v
           ComparaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o e cÃƒÆ’Ã‚Â¡lculos
                    |
            +-------+-------+
            |               |
            v               v
        Interface        Supabase
                         HistÃƒÆ’Ã‚Â³rico
```

As APIs externas sÃƒÆ’Ã‚Â£o consultadas pelo servidor da aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o. Dessa forma, chaves privadas nÃƒÆ’Ã‚Â£o sÃƒÆ’Ã‚Â£o expostas no navegador e as regras de comparaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o ficam centralizadas.

## CÃƒÆ’Ã‚Â¡lculos comparativos

Para cada variÃƒÆ’Ã‚Â¡vel disponÃƒÆ’Ã‚Â­vel nas duas fontes, o sistema calcula:

### Valor consolidado

```text
consolidado = (fonte A + fonte B) / 2
```

### DiferenÃƒÆ’Ã‚Â§a absoluta

```text
diferenÃƒÆ’Ã‚Â§a = |fonte A - fonte B|
```

### DivergÃƒÆ’Ã‚Âªncia percentual simÃƒÆ’Ã‚Â©trica

```text
divergÃƒÆ’Ã‚Âªncia = diferenÃƒÆ’Ã‚Â§a / ((|fonte A| + |fonte B|) / 2) * 100
```

A divergÃƒÆ’Ã‚Âªncia ÃƒÆ’Ã‚Â© convertida em um indicador de concordÃƒÆ’Ã‚Â¢ncia:

- atÃƒÆ’Ã‚Â© 10%: alta concordÃƒÆ’Ã‚Â¢ncia;
- acima de 10% atÃƒÆ’Ã‚Â© 25%: mÃƒÆ’Ã‚Â©dia concordÃƒÆ’Ã‚Â¢ncia;
- acima de 25%: baixa concordÃƒÆ’Ã‚Â¢ncia.

Essas faixas sÃƒÆ’Ã‚Â£o parÃƒÆ’Ã‚Â¢metros internos do protÃƒÆ’Ã‚Â³tipo e nÃƒÆ’Ã‚Â£o representam uma classificaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o meteorolÃƒÆ’Ã‚Â³gica oficial. ConcordÃƒÆ’Ã‚Â¢ncia entre duas fontes tambÃƒÆ’Ã‚Â©m nÃƒÆ’Ã‚Â£o significa que a previsÃƒÆ’Ã‚Â£o estÃƒÆ’Ã‚Â¡ correta. Para avaliar acurÃƒÆ’Ã‚Â¡cia, seria necessÃƒÆ’Ã‚Â¡rio comparar as previsÃƒÆ’Ã‚Âµes armazenadas com dados observados posteriormente.

## Tecnologias

### AplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o

- **Node.js 24.19** como ambiente de execuÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o.
- **TypeScript** como linguagem principal.
- **Next.js** com App Router para frontend e rotas de servidor.
- **React** para construÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o da interface.
- **Tailwind CSS** para estilizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o responsiva.
- **shadcn/ui** para componentes de interface.
- **Lucide React** para ÃƒÆ’Ã‚Â­cones.
- **Recharts** para grÃƒÆ’Ã‚Â¡ficos comparativos.
- **Zod** para validaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de entradas e respostas.

### Dados e integraÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes

- **Open-Meteo** como primeira fonte meteorolÃƒÆ’Ã‚Â³gica.
- **WeatherAPI.com** como segunda fonte meteorolÃƒÆ’Ã‚Â³gica.
- **Supabase** para persistÃƒÆ’Ã‚Âªncia do histÃƒÆ’Ã‚Â³rico de consultas.

### Qualidade e publicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o

- **Vitest** para testes das regras de cÃƒÆ’Ã‚Â¡lculo.
- **PWA** para instalaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o pelo navegador em dispositivos mÃƒÆ’Ã‚Â³veis.
- **Vercel** para deploy da aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o web.
- **GitHub** para versionamento e colaboraÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o.

## Arquitetura

O projeto utiliza um ÃƒÆ’Ã‚Âºnico repositÃƒÆ’Ã‚Â³rio e uma ÃƒÆ’Ã‚Âºnica aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o Next.js.

O frontend e a lÃƒÆ’Ã‚Â³gica de servidor permanecem no mesmo projeto, mas possuem responsabilidades separadas:

- componentes React cuidam da apresentaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o;
- Route Handlers consultam as APIs externas;
- providers convertem cada resposta para um contrato comum;
- funÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes puras realizam os cÃƒÆ’Ã‚Â¡lculos comparativos;
- Supabase armazena os snapshots meteorolÃƒÆ’Ã‚Â³gicos;
- a interface recebe somente dados normalizados.

A especificaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o tÃƒÆ’Ã‚Â©cnica completa estÃƒÆ’Ã‚Â¡ disponÃƒÆ’Ã‚Â­vel em [`PROJECT.md`](./PROJECT.md).

## Estrutura planejada

```text
agroclima/
ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ public/
ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ src/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ app/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ api/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ historico/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ layout.tsx
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ manifest.ts
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬ÂÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ page.tsx
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ components/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ lib/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ supabase/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬ÂÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ weather/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ schemas/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬ÂÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ types/
ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ supabase/
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬Å¡   ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬ÂÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ schema.sql
ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ tests/
ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ .env.example
ÃƒÂ¢Ã¢â‚¬ÂÃ…â€œÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ PROJECT.md
ÃƒÂ¢Ã¢â‚¬ÂÃ¢â‚¬ÂÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ README.md
```

## PrÃƒÆ’Ã‚Â©-requisitos

- Node.js 24.19 ou versÃƒÆ’Ã‚Â£o compatÃƒÆ’Ã‚Â­vel definida no projeto.
- npm.
- Conta gratuita na WeatherAPI.com.
- Projeto gratuito no Supabase.

A Open-Meteo nÃƒÆ’Ã‚Â£o exige chave de API.

## InÃƒÆ’Ã‚Â­cio rÃƒÆ’Ã‚Â¡pido

Depois que o projeto Next.js estiver criado:

```bash
npm install
cp .env.example .env.local
npm run dev
```

A aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o estarÃƒÆ’Ã‚Â¡ disponÃƒÆ’Ã‚Â­vel em:

```text
http://localhost:3000
```

## VariÃƒÆ’Ã‚Â¡veis de ambiente

Criar um arquivo `.env.local` na raiz do projeto:

```env
WEATHER_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_NAME=AgroClima
```

Nunca versionar o arquivo `.env.local` ou expor chaves privadas com o prefixo `NEXT_PUBLIC_`.

## Scripts

Os scripts finais serÃƒÆ’Ã‚Â£o definidos durante a preparaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o do projeto. A estrutura esperada ÃƒÆ’Ã‚Â©:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Escopo do MVP

O MVP serÃƒÆ’Ã‚Â¡ considerado concluÃƒÆ’Ã‚Â­do quando:

- as duas APIs forem consultadas;
- os dados forem normalizados e comparados;
- os trÃƒÆ’Ã‚Âªs dias comuns forem exibidos;
- os cÃƒÆ’Ã‚Â¡lculos tiverem testes unitÃƒÆ’Ã‚Â¡rios;
- a interface funcionar em desktop e celular;
- uma consulta puder ser salva e visualizada no histÃƒÆ’Ã‚Â³rico;
- a aplicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o estiver publicada na Vercel;
- a PWA puder ser adicionada ÃƒÆ’Ã‚Â  tela inicial.

## Fora do escopo

Para manter o projeto compatÃƒÆ’Ã‚Â­vel com o prazo acadÃƒÆ’Ã‚Âªmico, nÃƒÆ’Ã‚Â£o fazem parte do MVP:

- login e cadastro de usuÃƒÆ’Ã‚Â¡rios;
- aplicativo nativo;
- publicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o em lojas de aplicativos;
- notificaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes push;
- integraÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o com Telegram;
- inteligÃƒÆ’Ã‚Âªncia artificial ou machine learning;
- modelo meteorolÃƒÆ’Ã‚Â³gico prÃƒÆ’Ã‚Â³prio;
- painel administrativo;
- pagamentos;
- microserviÃƒÆ’Ã‚Â§os;
- mais de duas APIs meteorolÃƒÆ’Ã‚Â³gicas.

## LimitaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes

- A mÃƒÆ’Ã‚Â©dia consolidada ÃƒÆ’Ã‚Â© um indicador simples, nÃƒÆ’Ã‚Â£o uma nova previsÃƒÆ’Ã‚Â£o meteorolÃƒÆ’Ã‚Â³gica cientÃƒÆ’Ã‚Â­fica.
- As APIs podem usar modelos e horÃƒÆ’Ã‚Â¡rios de atualizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o diferentes.
- A comparaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o fica limitada ao perÃƒÆ’Ã‚Â­odo disponÃƒÆ’Ã‚Â­vel nas duas fontes.
- O projeto depende da disponibilidade de serviÃƒÆ’Ã‚Â§os externos.
- O sistema nÃƒÆ’Ã‚Â£o substitui alertas meteorolÃƒÆ’Ã‚Â³gicos oficiais nem orientaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o tÃƒÆ’Ã‚Â©cnica agronÃƒÆ’Ã‚Â´mica.

## Desenvolvimento assistido por GitHub Copilot

O arquivo [`PROJECT.md`](./PROJECT.md) contÃƒÆ’Ã‚Â©m o escopo, a arquitetura, os contratos, as fases e os critÃƒÆ’Ã‚Â©rios de aceite do desenvolvimento.

Para fornecer instruÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes permanentes ao GitHub Copilot, o repositÃƒÆ’Ã‚Â³rio tambÃƒÆ’Ã‚Â©m poderÃƒÆ’Ã‚Â¡ conter:

```text
.github/copilot-instructions.md
```

Esse arquivo deve resumir as regras que o Copilot precisa seguir em todas as tarefas, enquanto `PROJECT.md` permanece como a especificaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o completa do produto.

Prompt sugerido para iniciar:

```text
Leia PROJECT.md e implemente somente a Fase 1. Preserve a arquitetura e o escopo definidos. Execute lint e build antes de concluir e nÃƒÆ’Ã‚Â£o avance para outra fase.
```

## Status

Projeto em fase inicial de desenvolvimento.

## Equipe

Projeto desenvolvido pelos integrantes do grupo de Projeto Integrador em ComputaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o VI da Univesp.

## LicenÃƒÆ’Ã‚Â§a

A licenÃƒÆ’Ã‚Â§a do cÃƒÆ’Ã‚Â³digo ainda serÃƒÆ’Ã‚Â¡ definida pelo grupo antes da publicaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o final.

## Fontes de dados

Dados meteorolÃƒÆ’Ã‚Â³gicos fornecidos por Open-Meteo e WeatherAPI.com.

## Current State

- Phase 1 bootstrap is complete in the workspace root.
- `npm run lint` passes.
- `npm run build` passes.
- `src/` is the active codebase layout.
- shadcn/ui was started from the bootstrap phase.
- The portable progress file is [`.memory/progress.md`](./.memory/progress.md).

## Continuity

If you continue this project on another machine, read [PROJECT.md](./PROJECT.md) first and then [`.memory/progress.md`](./.memory/progress.md). That file summarizes the current state, environment notes, and next steps.