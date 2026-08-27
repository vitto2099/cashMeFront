import { P } from "@/constants/theme";

export interface ChaveAlternadoraProps {
  /** Estado de ligado/desligado */
  ativo: boolean;
  /** Função disparada na alteração de estado */
  aoAlternar: () => void;
  /** Cor do botão quando ativo */
  corDestaque?: string;
}

/**
 * Chave alternadora animada estilo Switch iOS
 */
export function ChaveAlternadora({ ativo, aoAlternar, corDestaque = P }: ChaveAlternadoraProps) {
  return (
    <button
      onClick={aoAlternar}
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        background: ativo ? corDestaque : "#D1D5DB",
        border: "none",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          top: 3,
          left: ativo ? 23 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

// Alias para compatibilidade
export const SwitchToggle = ({
  on,
  onChange,
  color = P,
}: {
  on: boolean;
  onChange: () => void;
  color?: string;
}) => <ChaveAlternadora ativo={on} aoAlternar={onChange} corDestaque={color} />;
