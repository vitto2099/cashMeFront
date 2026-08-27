# 🛍️ Cash Me — Plataforma de Fidelidade & Cashback

Plataforma de fidelidade e cashback para comércios locais, conectando consumidores que buscam economia e recompensas a comerciantes que desejam engajar e fidelizar sua base de clientes.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js**: v18+ (recomendado v20+)
- **npm** ou **pnpm**

### Instalação e Execução
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Gerar build de produção
npm run build
```
O aplicativo estará acessível em: `http://localhost:5173/`

---

## 📁 Estrutura de Pastas e Arquitetura

O projeto adota uma **Arquitetura Modular por Funcionalidades (*Feature-Based Architecture*)**, dividida em domínios de negócio claros e reutilizáveis:

```
src/
├── app/
│   ├── App.tsx                     # Ponto de entrada leve (orquestrador do frame mobile)
│   └── components/
│       ├── figma/                  # Utilitários de assets (ImageWithFallback)
│       └── ui/                     # Design System (Button, Card, Modal, Tabs, etc.)
│
├── constants/
│   └── theme.ts                    # Paleta de cores oficial da marca (G, P, GOLD, etc.)
│
├── types/                          # Contratos e Tipagens TypeScript
│   ├── consumer.ts                 # Modelos: Loja, Oferta, Transacao, Categoria
│   ├── merchant.ts                 # Modelos: Cliente, OfertaComerciante, Campanha, PontoGrafico
│   └── navigation.ts               # Modos de aplicativo e identificadores de telas
│
├── data/
│   └── mocks/                      # Dados simulados e centralizados
│       ├── stores.ts               # Lojas parceiras cadastradas
│       ├── offers.ts               # Cupons e recompensas do consumidor
│       ├── customers.ts            # Base de clientes do comerciante
│       ├── history.ts              # Extrato de pontos e transações
│       ├── chartData.ts            # Métricas e dados do gráfico de desempenho
│       ├── merchantOffers.ts       # Vitrine de ofertas do comerciante
│       └── index.ts                # Exportação unificada dos dados
│
├── components/
│   └── common/                     # Componentes comuns compartilhados
│       ├── BotaoVoltar.tsx         # Botão de retorno circular
│       ├── BarraNavegacao.tsx      # Barra inferior de navegação móvel (BottomNav)
│       ├── BarraStatus.tsx         # Barra superior estilo celular (Hora, Bateria, Wi-Fi)
│       ├── ControleSegmentado.tsx  # Abas com efeito segmentado (Tabs)
│       ├── IconeLoja.tsx           # Ícone com inicial estilizada da loja
│       ├── AvatarUsuario.tsx       # Avatar circular com inicial do usuário
│       ├── ChaveAlternadora.tsx    # Chave liga/desliga animada (Switch)
│       ├── CampoFormulario.tsx     # Campo de formulário para protótipos
│       ├── LinhaInformacao.tsx     # Linha com ícone, título e valor
│       ├── QRCodeVetorial.tsx      # Renderizador SVG de matriz de QR Code
│       └── index.ts
│
├── features/                       # Módulos por Domínio de Negócio
│   ├── landing/                    # Tela de boas-vindas e seleção de perfil
│   │   └── screens/LandingScreen.tsx
│   │
│   ├── consumer/                   # Módulo do Consumidor
│   │   ├── screens/                # Home, Categorias, Lojas, Ofertas, Carteira, QR Code, Perfil
│   │   └── ConsumerApp.tsx         # Orquestrador de telas do consumidor
│   │
│   └── merchant/                   # Módulo do Comerciante (MVP)
│       ├── screens/                # Dashboard, Campanhas, Regras, Clientes, Vitrine, Configurações
│       └── MerchantApp.tsx         # Orquestrador de telas do comerciante
│
└── styles/
    ├── fonts.css                   # Fontes tipográficas
    ├── globals.css                 # Estilos globais
    ├── tailwind.css                # Diretivas Tailwind CSS v4
    └── theme.css                   # Variáveis e tokens de tema
```

---

## 📋 Documentação e Planejamento

> [!NOTE]
> - 📄 **Backlog de Épicos do Consumidor:** 👉 [PLANEJAMENTO_CONSUMIDOR.md](file:///c:/Users/vck98/OneDrive/Área%20de%20Trabalho/Estagio/CashMeFront/PLANEJAMENTO_CONSUMIDOR.md)
> - 📄 **Plano de Otimização & Refatoração:** 👉 [PLANO_DE_OTIMIZACAO.md](file:///c:/Users/vck98/OneDrive/Área%20de%20Trabalho/Estagio/CashMeFront/PLANO_DE_OTIMIZACAO.md)

---

## 🏪 Módulos do MVP do Comerciante (Fase Atual)

- **Dashboard:** Visão geral de desempenho com gráfico interativo de faturamento e fluxo de pontuação.
- **Gestão de Campanhas:** Criação e ativação de campanhas promocionais de bônus de pontos.
- **Regras de Pontuação & Conversão:** Definição de taxas de acúmulo (R$ para pontos) e conversão em desconto.
- **QR Code do Estabelecimento:** QR Code para leitura no balcão e identificação da loja.
- **Base de Clientes:** Listagem e histórico de compras dos consumidores fidelizados.
- **Vitrine & Recompensas:** Cadastro e controle de cupons e vantagens oferecidas.

---

## 🛠️ Stack Tecnológica

- **Frontend:** [React 18](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) + Shadcn UI / Radix UI
- **Gráficos & Visualização:** [Recharts](https://recharts.org/)
- **Ícones:** [lucide-react](https://lucide.dev/)
- **Animações & Feedback:** `motion`, `canvas-confetti`, `sonner`