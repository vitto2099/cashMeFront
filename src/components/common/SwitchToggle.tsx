import { P } from "@/constants/theme";

interface SwitchToggleProps {
  on: boolean;
  onChange: () => void;
  color?: string;
}

export function SwitchToggle({ on, onChange, color = P }: SwitchToggleProps) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        background: on ? color : "#D1D5DB",
        border: "none",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          top: 3,
          left: on ? 23 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}
