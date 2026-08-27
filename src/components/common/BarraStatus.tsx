import { T1 } from "@/constants/theme";

export interface BarraStatusProps {
  /** Modo claro (texto escuro) ou escuro (texto branco) */
  claro?: boolean;
}

/**
 * Barra superior de status do celular (Hora, Sinal de Rede, Wi-Fi e Bateria)
 */
export function BarraStatus({ claro = true }: BarraStatusProps) {
  const cor = claro ? T1 : "#fff";
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 600, color: cor }}>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          {[3, 5, 7, 9].map((altura, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: altura,
                background: cor,
                borderRadius: 1,
                opacity: i < 3 ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path
            d="M8 2.5C5.6 2.5 3.4 3.6 1.9 5.3L0.5 3.8C2.4 1.8 5.1 0.5 8 0.5s5.6 1.3 7.5 3.3l-1.4 1.5C12.6 3.6 10.4 2.5 8 2.5z"
            fill={cor}
          />
          <path
            d="M8 6.5c-1.2 0-2.3.5-3.1 1.3L3.5 6.4C4.8 5 6.3 4.5 8 4.5s3.2 1 4.5 1.9l-1.4 1.4C10.3 7 9.2 6.5 8 6.5z"
            fill={cor}
          />
          <circle cx="8" cy="10" r="1.5" fill={cor} />
        </svg>
        <div
          style={{
            width: 24,
            height: 12,
            border: `1.5px solid ${cor}`,
            borderRadius: 3,
            padding: "1.5px 2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "70%", height: "100%", background: cor, borderRadius: 1.5 }} />
        </div>
      </div>
    </div>
  );
}

// Alias para compatibilidade
export const StatusBar = ({ light = true }: { light?: boolean }) => <BarraStatus claro={light} />;
