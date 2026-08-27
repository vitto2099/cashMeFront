import { ChevronLeft } from "lucide-react";
import { T1 } from "@/constants/theme";

export interface BotaoVoltarProps {
  /** Função de callback chamada ao clicar no botão */
  aoVoltar: () => void;
  /** Define se o estilo visual é claro ou translúcido/escuro */
  claro?: boolean;
}

/**
 * Botão circular de retorno para o topo de telas
 */
export function BotaoVoltar({ aoVoltar, claro = true }: BotaoVoltarProps) {
  return (
    <button
      onClick={aoVoltar}
      aria-label="Voltar"
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: claro ? "#F3F4F6" : "rgba(255,255,255,0.2)",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <ChevronLeft size={20} color={claro ? T1 : "#fff"} />
    </button>
  );
}

// Alias para compatibilidade
export const BackBtn = ({ onBack, light = true }: { onBack: () => void; light?: boolean }) => (
  <BotaoVoltar aoVoltar={onBack} claro={light} />
);
