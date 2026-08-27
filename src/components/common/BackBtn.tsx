import { ChevronLeft } from "lucide-react";
import { T1 } from "@/constants/theme";

interface BackBtnProps {
  onBack: () => void;
  light?: boolean;
}

export function BackBtn({ onBack, light = true }: BackBtnProps) {
  return (
    <button
      onClick={onBack}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: light ? "#F3F4F6" : "rgba(255,255,255,0.2)",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <ChevronLeft size={20} color={light ? T1 : "#fff"} />
    </button>
  );
}
