interface StoreIconProps {
  name: string;
  color: string;
  bg: string;
  size?: number;
}

export function StoreIcon({ name, color, bg, size = 48 }: StoreIconProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.38, fontWeight: 700, color }}>{name[0]}</span>
    </div>
  );
}
