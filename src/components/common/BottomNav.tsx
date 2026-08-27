import type { ComponentType } from "react";
import { BD } from "@/constants/theme";

export interface NavTabItem {
  id: string;
  label: string;
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

interface BottomNavProps {
  tabs: NavTabItem[];
  active: string;
  onChange: (id: string) => void;
  color: string;
}

export function BottomNav({ tabs, active, onChange, color }: BottomNavProps) {
  return (
    <div style={{ height: 76, borderTop: `1px solid ${BD}`, display: "flex", background: "#fff", flexShrink: 0 }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "8px 0",
            }}
          >
            <t.Icon size={22} color={on ? color : "#9CA3AF"} strokeWidth={on ? 2.5 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: on ? 600 : 400, color: on ? color : "#9CA3AF" }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
