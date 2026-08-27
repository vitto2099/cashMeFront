import type { ComponentType } from "react";
import { T1, T2 } from "@/constants/theme";

interface RowProps {
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  val: string;
  color: string;
}

export function Row({ Icon, title, val, color }: RowProps) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Icon size={18} color={color} />
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{title}</p>
        <p style={{ fontSize: 12, color: T2, margin: 0 }}>{val}</p>
      </div>
    </div>
  );
}
