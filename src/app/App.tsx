import { useState } from "react";
import { BG } from "@/constants/theme";
import { StatusBar } from "@/components/common";
import { LandingScreen } from "@/features/landing";
import { ConsumerApp } from "@/features/consumer";
import { MerchantApp } from "@/features/merchant";
import type { AppMode } from "@/types/navigation";

export default function App() {
  const [mode, setMode] = useState<AppMode>("landing");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 20px 80px",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 50,
          overflow: "hidden",
          background: BG,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "0 50px 100px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.12), inset 0 0 0 2px rgba(255,255,255,0.06)",
        }}
      >
        {/* Dynamic island notch */}
        <div
          style={{
            position: "absolute",
            top: 13,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 34,
            background: "#000",
            borderRadius: 20,
            zIndex: 200,
          }}
        />

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {mode === "landing" && (
            <>
              <div style={{ background: BG }}>
                <StatusBar light />
              </div>
              <LandingScreen onSelect={setMode} />
            </>
          )}
          {mode === "consumer" && <ConsumerApp />}
          {mode === "merchant" && <MerchantApp />}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 130,
            height: 5,
            background: "rgba(0,0,0,0.2)",
            borderRadius: 3,
          }}
        />
      </div>

      {/* Mode switcher floating bar */}
      {mode !== "landing" && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setMode("landing")}
            style={{
              padding: "10px 18px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 20,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ← Início
          </button>
          <button
            onClick={() => setMode(mode === "consumer" ? "merchant" : "consumer")}
            style={{
              padding: "10px 18px",
              background: mode === "consumer" ? "rgba(111,53,181,0.85)" : "rgba(0,141,76,0.85)",
              backdropFilter: "blur(12px)",
              border: "none",
              borderRadius: 20,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {mode === "consumer" ? "🏪 Modo Comerciante" : "👤 Modo Consumidor"}
          </button>
        </div>
      )}
    </div>
  );
}
