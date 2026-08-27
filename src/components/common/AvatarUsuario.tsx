import { G, P } from "@/constants/theme";

export interface AvatarUsuarioProps {
  /** Nome do usuário para exibição da inicial */
  nome: string;
  /** Tamanho em pixels (padrão: 42) */
  tamanho?: number;
}

/**
 * Avatar circular de usuário com paleta de cores dinâmica
 */
export function AvatarUsuario({ nome, tamanho = 42 }: AvatarUsuarioProps) {
  const paleta = [G, P, "#1E40AF", "#B45309", "#9A3412"];
  const fundo = paleta[nome.charCodeAt(0) % paleta.length];
  return (
    <div
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: "50%",
        background: fundo,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: tamanho * 0.4, fontWeight: 700, color: "#fff" }}>{nome[0]}</span>
    </div>
  );
}

// Alias para compatibilidade
export const UserAvatar = ({ name, size = 42 }: { name: string; size?: number }) => (
  <AvatarUsuario nome={name} tamanho={size} />
);
