# AgroClima

Plataforma web responsiva para comparação e consolidação de previsões meteorológicas, desenvolvida como projeto acadêmico da disciplina **Projeto Integrador em Computação VI** da **Univesp**.

O AgroClima consulta duas fontes meteorológicas, compara suas previsões e apresenta as divergências de forma simples, com foco no apoio ao planejamento de pequenos produtores e da agricultura familiar.

## Contexto

Aplicativos de previsão do tempo podem apresentar resultados diferentes para a mesma localização, pois utilizam fontes, modelos meteorológicos e horários de atualização distintos. Essa divergência pode dificultar a tomada de decisões de pessoas que dependem das condições climáticas para planejar atividades como plantio, irrigação, aplicação de defensivos e colheita.

O AgroClima busca reduzir essa dificuldade ao reunir previsões de duas APIs meteorológicas em uma única interface. A aplicação não pretende substituir serviços meteorológicos oficiais nem produzir uma previsão científica própria. Seu papel é facilitar a comparação entre fontes e apresentar um valor consolidado para cada variável analisada.

## Objetivo

Desenvolver uma aplicação web que:

- consulte mais de uma fonte meteorológica;
- normalize dados que possuem formatos diferentes;
- compare as previsões para a mesma localização e data;
- calcule indicadores simples de consolidação e divergência;
- apresente os resultados em uma interface acessível e responsiva;
- mantenha um histórico básico das consultas realizadas;
- possa ser instalada no celular como uma PWA.

## Funcionalidades previstas

- Busca de localização por cidade.
- Uso opcional da geolocalização do dispositivo.
- Consulta à Open-Meteo.
- Consulta à WeatherAPI.com.
- Comparação dos três dias disponíveis nas duas fontes.
- Exibição de:
  - temperatura mínima;
  - temperatura máxima;
  - umidade;
  - precipitação;
  - probabilidade de chuva;
  - velocidade máxima do vento.
- Cálculo de média consolidada.
- Cálculo de diferença absoluta.
- Cálculo de divergência percentual.
- Classificação da concordância entre as fontes.
- Gráficos comparativos.
- Histórico simples de consultas.
- Layout responsivo para desktop e dispositivos móveis.
- Instalação como Progressive Web App.

## Como funciona

```text
Usuário seleciona uma localização
                |
                v
      Route Handler do Next.js
         /                 \
        v                   v
  Open-Meteo         WeatherAPI.com
        \                   /
         \                 /
          v               v
          Normalização dos dados
                    |
                    v
           Comparação e cálculos
                    |
            +-------+-------+
            |               |
            v               v
        Interface        Supabase
                         Histórico
```

As APIs externas são consultadas pelo servidor da aplicação. Dessa forma, chaves privadas não são expostas no navegador e as regras de comparação ficam centralizadas.

## Cálculos comparativos

Para cada variável disponível nas duas fontes, o sistema calcula:

### Valor consolidado

```text
consolidado = (fonte A + fonte B) / 2
```

### Diferença absoluta

```text
diferença = |fonte A - fonte B|
```

### Divergência percentual simétrica

```text
divergência = diferença / ((|fonte A| + |fonte B|) / 2) * 100
```

A divergência é convertida em um indicador de concordância:

- até 10%: alta concordância;
- acima de 10% até 25%: média concordância;
- acima de 25%: baixa concordância.

Essas faixas são parâmetros internos do protótipo e não representam uma classificação meteorológica oficial. Concordância entre duas fontes também não significa que a previsão está correta. Para avaliar acurácia, seria necessário comparar as previsões armazenadas com dados observados posteriormente.

## Tecnologias

### Aplicação

- **Node.js 24.19** como ambiente de execução.
- **TypeScript** como linguagem principal.
- **Next.js** com App Router para frontend e rotas de servidor.
- **React** para construção da interface.
- **Tailwind CSS** para estilização responsiva.
- **shadcn/ui** para componentes de interface.
- **Lucide React** para ícones.
- **Recharts** para gráficos comparativos.
- **Zod** para validação de entradas e respostas.

### Dados e integrações

- **Open-Meteo** como primeira fonte meteorológica.
- **WeatherAPI.com** como segunda fonte meteorológica.
- **Supabase** para persistência do histórico de consultas.

### Qualidade e publicação

- **Vitest** para testes das regras de cálculo.
- **PWA** para instalação pelo navegador em dispositivos móveis.
- **Vercel** para deploy da aplicação web.
- **GitHub** para versionamento e colaboração.

## Arquitetura

O projeto utiliza um único repositório e uma única aplicação Next.js.

O frontend e a lógica de servidor permanecem no mesmo projeto, mas possuem responsabilidades separadas:

- componentes React cuidam da apresentação;
- Route Handlers consultam as APIs externas;
- providers convertem cada resposta para um contrato comum;
- funções puras realizam os cálculos comparativos;
- Supabase armazena os snapshots meteorológicos;
- a interface recebe somente dados normalizados.

A especificação técnica completa está disponível em [`PROJECT.md`](./PROJECT.md).

## Estrutura planejada

```text
agroclima/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── historico/
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   │   ├── supabase/
│   │   └── weather/
│   ├── schemas/
│   └── types/
├── supabase/
│   └── schema.sql
├── tests/
├── .env.example
├── PROJECT.md
└── README.md
```

## Pré-requisitos

- Node.js 24.19 ou versão compatível definida no projeto.
- npm.
- Conta gratuita na WeatherAPI.com.
- Projeto gratuito no Supabase.

A Open-Meteo não exige chave de API.

## Início rápido

Depois que o projeto Next.js estiver criado:

```bash
npm install
cp .env.example .env.local
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

## Variáveis de ambiente

Criar um arquivo `.env.local` na raiz do projeto:

```env
WEATHER_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_NAME=AgroClima
```

Nunca versionar o arquivo `.env.local` ou expor chaves privadas com o prefixo `NEXT_PUBLIC_`.

## Scripts

Os scripts finais serão definidos durante a preparação do projeto. A estrutura esperada é:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Escopo do MVP

O MVP será considerado concluído quando:

- as duas APIs forem consultadas;
- os dados forem normalizados e comparados;
- os três dias comuns forem exibidos;
- os cálculos tiverem testes unitários;
- a interface funcionar em desktop e celular;
- uma consulta puder ser salva e visualizada no histórico;
- a aplicação estiver publicada na Vercel;
- a PWA puder ser adicionada à tela inicial.

## Fora do escopo

Para manter o projeto compatível com o prazo acadêmico, não fazem parte do MVP:

- login e cadastro de usuários;
- aplicativo nativo;
- publicação em lojas de aplicativos;
- notificações push;
- integração com Telegram;
- inteligência artificial ou machine learning;
- modelo meteorológico próprio;
- painel administrativo;
- pagamentos;
- microserviços;
- mais de duas APIs meteorológicas.

## Limitações

- A média consolidada é um indicador simples, não uma nova previsão meteorológica científica.
- As APIs podem usar modelos e horários de atualização diferentes.
- A comparação fica limitada ao período disponível nas duas fontes.
- O projeto depende da disponibilidade de serviços externos.
- O sistema não substitui alertas meteorológicos oficiais nem orientação técnica agronômica.

## Desenvolvimento assistido por GitHub Copilot

O arquivo [`PROJECT.md`](./PROJECT.md) contém o escopo, a arquitetura, os contratos, as fases e os critérios de aceite do desenvolvimento.

Para fornecer instruções permanentes ao GitHub Copilot, o repositório também poderá conter:

```text
.github/copilot-instructions.md
```

Esse arquivo deve resumir as regras que o Copilot precisa seguir em todas as tarefas, enquanto `PROJECT.md` permanece como a especificação completa do produto.

Prompt sugerido para iniciar:

```text
Leia PROJECT.md e implemente somente a Fase 1. Preserve a arquitetura e o escopo definidos. Execute lint e build antes de concluir e não avance para outra fase.
```

## Status

Projeto em fase inicial de desenvolvimento.

## Equipe

Projeto desenvolvido pelos integrantes do grupo de Projeto Integrador em Computação VI da Univesp.

## Licença

A licença do código ainda será definida pelo grupo antes da publicação final.

## Fontes de dados

Dados meteorológicos fornecidos por Open-Meteo e WeatherAPI.com.