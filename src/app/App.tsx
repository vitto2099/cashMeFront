import { useState } from "react";
import { LandingScreen } from "@/features/landing";
import { ConsumerApp } from "@/features/consumer";
import { MerchantApp } from "@/features/merchant";
import { DevModeSwitcher } from "@/components/dev";
import type { AppMode } from "@/types/navigation";

export default function App() {
  const [mode, setMode] = useState<AppMode>("landing");

  return (
    <div className="min-h-screen w-full bg-[#F7F8FA] flex flex-col font-sans relative overflow-x-hidden">
      {/* Main App Content - Full Screen */}
      <main className="flex-1 w-full flex flex-col min-h-screen">
        {mode === "landing" && <LandingScreen onSelect={setMode} />}
        {mode === "consumer" && <ConsumerApp />}
        {mode === "merchant" && <MerchantApp />}
      </main>

      {/* Botões flutuantes de desenvolvimento (podem ser removidos apagando a pasta src/components/dev) */}
      <DevModeSwitcher mode={mode} onSelectMode={setMode} />
    </div>
  );
}

