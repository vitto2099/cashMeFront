import type { ComponentType } from "react";
import { T1, T2 } from "@/constants/theme";

export interface LinhaInformacaoProps {
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  titulo: string;
  valor: string;
  corIcone: string;
}

/**
 * Linha de exibição de dados com ícone, título e valor
 */
export function LinhaInformacao({ Icon, titulo, valor, corIcone }: LinhaInformacaoProps) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Icon size={18} color={corIcone} />
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{titulo}</p>
        <p style={{ fontSize: 12, color: T2, margin: 0 }}>{valor}</p>
      </div>
    </div>
  );
}

// Alias para compatibilidade
export const Row = ({
  Icon,
  title,
  val,
  color,
}: {
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  val: string;
  color: string;
}) => <LinhaInformacao Icon={Icon} titulo={title} valor={val} corIcone={color} />;
