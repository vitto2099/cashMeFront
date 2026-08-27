import { ShoppingBag, User, Store, ChevronRight } from "lucide-react";
import { G, GD, P, PD, T1, T2, BG } from "@/constants/theme";
import type { AppMode } from "@/types/navigation";

interface LandingScreenProps {
  onSelect: (m: AppMode) => void;
}

export function LandingScreen({ onSelect }: LandingScreenProps) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24, background: BG }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 80, height: 80, background: `linear-gradient(135deg,${G},${GD})`, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: `0 10px 28px rgba(0,141,76,0.35)` }}>
          <ShoppingBag size={40} color="#fff" />
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: T1, margin: "0 0 6px", letterSpacing: -1.5 }}>cash me</h1>
        <p style={{ fontSize: 15, color: T2, margin: "0 0 48px", textAlign: "center", lineHeight: 1.5 }}>Plataforma de fidelidade para<br />estabelecimentos locais</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: T2, textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 18px" }}>Como você quer entrar?</p>
        <button onClick={() => onSelect("consumer")} style={{ width: "100%", padding: "18px 20px", background: `linear-gradient(135deg,${G},${GD})`, borderRadius: 18, border: "none", marginBottom: 12, display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: `0 6px 20px rgba(0,141,76,0.28)` }}>
          <div style={{ width: 50, height: 50, background: "rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={24} color="#fff" />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>Sou consumidor</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>Acumule e resgate pontos</p>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.7)" style={{ marginLeft: "auto" }} />
        </button>
        <button onClick={() => onSelect("merchant")} style={{ width: "100%", padding: "18px 20px", background: `linear-gradient(135deg,${P},${PD})`, borderRadius: 18, border: "none", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: `0 6px 20px rgba(111,53,181,0.28)` }}>
          <div style={{ width: 50, height: 50, background: "rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Store size={24} color="#fff" />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>Sou comerciante</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>Gerencie campanhas e clientes</p>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.7)" style={{ marginLeft: "auto" }} />
        </button>
      </div>
      <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0 }}>Cash Me © 2026 · v1.0.0</p>
    </div>
  );
}
