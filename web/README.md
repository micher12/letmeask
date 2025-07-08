# NLW Agents - Frontend

Este projeto é o frontend do NLW Agents, desenvolvido durante um evento da Rocketseat. Ele é responsável por toda a interface visual e experiência do usuário, consumindo a API do backend para exibir e manipular dados em tempo real.

## Principais bibliotecas utilizadas

- **React**: Estrutura principal para construção de interfaces reativas e componentizadas.
- **Vite**: Ferramenta de build e servidor de desenvolvimento rápido.
- **React Router DOM**: Gerenciamento de rotas SPA.
- **@tanstack/react-query**: Gerenciamento de cache e requisições assíncronas.
- **TailwindCSS**: Utilitário para estilização rápida e responsiva.
- **Lucide React**: Biblioteca de ícones SVG.
- **Radix UI**: Componentes acessíveis e reutilizáveis.
- **Class Variance Authority, clsx, tailwind-merge**: Utilitários para manipulação de classes CSS.

## Estrutura de Pastas

- **src/pages/**: Páginas principais da aplicação (`create-room.tsx`, `room.tsx`).
- **src/components/**: Componentes reutilizáveis, incluindo componentes de UI em `ui/` (ex: `button.tsx`).
- **src/lib/**: Funções utilitárias (ex: `utils.ts`).
- **src/app.tsx**: Componente raiz da aplicação.
- **src/main.tsx**: Ponto de entrada da aplicação.
- **src/index.css**: Estilos globais.

## Padrões de Projeto

- Componentização e reutilização de UI.
- Separação clara entre páginas, componentes e utilitários.
- Estilização com TailwindCSS para agilidade e consistência visual.
- Consumo de API via React Query para melhor experiência e performance.

## Setup

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173` (ou porta configurada pelo Vite).

---