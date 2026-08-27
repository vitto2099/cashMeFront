import { T1, T2 } from "@/constants/theme";

export interface OpcaoAba {
  id: string;
  label: string;
}

export interface ControleSegmentadoProps {
  abas: OpcaoAba[];
  abaAtiva: string;
  aoMudar: (id: string) => void;
}

/**
 * Controle segmentado de abas (Segmented Control / Tabs)
 */
export function ControleSegmentado({ abas, abaAtiva, aoMudar }: ControleSegmentadoProps) {
  return (
    <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 10, padding: 3, margin: "0 16px" }}>
      {abas.map((aba) => (
        <button
          key={aba.id}
          onClick={() => aoMudar(aba.id)}
          style={{
            flex: 1,
            padding: "8px 0",
            borderRadius: 8,
            background: abaAtiva === aba.id ? "#fff" : "none",
            border: "none",
            fontSize: 13,
            fontWeight: abaAtiva === aba.id ? 600 : 400,
            color: abaAtiva === aba.id ? T1 : T2,
            cursor: "pointer",
            boxShadow: abaAtiva === aba.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.18s",
          }}
        >
          {aba.label}
        </button>
      ))}
    </div>
  );
}

// Alias para compatibilidade
export const SegControl = ({
  tabs,
  active,
  onChange,
}: {
  tabs: OpcaoAba[];
  active: string;
  onChange: (id: string) => void;
}) => <ControleSegmentado abas={tabs} abaAtiva={active} aoMudar={onChange} />;
