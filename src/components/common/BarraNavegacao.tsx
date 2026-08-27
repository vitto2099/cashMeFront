import type { ComponentType } from "react";
import { BD } from "@/constants/theme";

export interface ItemAbaNavegacao {
  id: string;
  label: string;
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

export interface BarraNavegacaoProps {
  abas: ItemAbaNavegacao[];
  abaAtiva: string;
  aoMudarAba: (id: string) => void;
  corDestaque: string;
}

/**
 * Barra inferior de navegação móvel (Bottom Navigation Bar)
 */
export function BarraNavegacao({ abas, abaAtiva, aoMudarAba, corDestaque }: BarraNavegacaoProps) {
  return (
    <nav style={{ height: 76, borderTop: `1px solid ${BD}`, display: "flex", background: "#fff", flexShrink: 0 }}>
      {abas.map((aba) => {
        const ativo = aba.id === abaAtiva;
        return (
          <button
            key={aba.id}
            onClick={() => aoMudarAba(aba.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "8px 0",
            }}
          >
            <aba.Icon size={22} color={ativo ? corDestaque : "#9CA3AF"} strokeWidth={ativo ? 2.5 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: ativo ? 600 : 400, color: ativo ? corDestaque : "#9CA3AF" }}>
              {aba.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// Alias para compatibilidade
export const BottomNav = ({
  tabs,
  active,
  onChange,
  color,
}: {
  tabs: ItemAbaNavegacao[];
  active: string;
  onChange: (id: string) => void;
  color: string;
}) => <BarraNavegacao abas={tabs} abaAtiva={active} aoMudarAba={onChange} corDestaque={color} />;

export type NavTabItem = ItemAbaNavegacao;
