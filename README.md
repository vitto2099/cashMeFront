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
O app estará acessível em: `http://localhost:5173/`

---

## 📋 Status e Visão Geral do Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ESTRATÉGIA DE LANÇAMENTO                        │
├───────────────────────────────────┬────────────────────────────────────┤
│ 🟢 FASE ATUAL: MVP DO COMERCIANTE │ ⚪ FASE FUTURA: APP DO CONSUMIDOR  │
│    • Em validação & refinamento   │    • Status: BACKLOG (Não iniciado)│
│    • Foco operacional de negócio  │    • Sem prioridade de execução    │
│    • Desimpedido de dependências  │    • Inicia pós-validação do MVP   │
└───────────────────────────────────┴────────────────────────────────────┘
```

> [!NOTE]
> O backlog detalhado com os 14 épicos futuros do aplicativo do consumidor está documentado em:
> 👉 [PLANEJAMENTO_CONSUMIDOR.md](file:///c:/Users/vck98/OneDrive/Área%20de%20Trabalho/Estagio/CashMeFront/PLANEJAMENTO_CONSUMIDOR.md)

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