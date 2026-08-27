import { G, P } from "@/constants/theme";

interface UserAvatarProps {
  name: string;
  size?: number;
}

export function UserAvatar({ name, size = 42 }: UserAvatarProps) {
  const palette = [G, P, "#1E40AF", "#B45309", "#9A3412"];
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.4, fontWeight: 700, color: "#fff" }}>{name[0]}</span>
    </div>
  );
}
