import { T1, T2 } from "@/constants/theme";

interface TabItem {
  id: string;
  label: string;
}

interface SegControlProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
}

export function SegControl({ tabs, active, onChange }: SegControlProps) {
  return (
    <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 10, padding: 3, margin: "0 16px" }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1,
            padding: "8px 0",
            borderRadius: 8,
            background: active === t.id ? "#fff" : "none",
            border: "none",
            fontSize: 13,
            fontWeight: active === t.id ? 600 : 400,
            color: active === t.id ? T1 : T2,
            cursor: "pointer",
            boxShadow: active === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.18s",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
