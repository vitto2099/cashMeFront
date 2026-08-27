export interface IconeLojaProps {
  /** Nome do estabelecimento para extração da inicial */
  nome: string;
  /** Cor da letra */
  cor: string;
  /** Cor de fundo */
  fundo: string;
  /** Tamanho em pixels (padrão: 48) */
  tamanho?: number;
}

/**
 * Ícone estilizado para visualização de lojas parceiras
 */
export function IconeLoja({ nome, cor, fundo, tamanho = 48 }: IconeLojaProps) {
  return (
    <div
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: tamanho * 0.25,
        background: fundo,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: tamanho * 0.38, fontWeight: 700, color: cor }}>{nome[0]}</span>
    </div>
  );
}

// Alias para compatibilidade
export const StoreIcon = ({
  name,
  color,
  bg,
  size = 48,
}: {
  name: string;
  color: string;
  bg: string;
  size?: number;
}) => <IconeLoja nome={name} cor={color} fundo={bg} tamanho={size} />;
