import type { AppMode } from "@/types/navigation";

interface DevModeSwitcherProps {
  mode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

/**
 * Componente temporário de desenvolvimento para alternar entre as telas.
 * Pode ser removido deletando a pasta src/components/dev.
 */
export function DevModeSwitcher({ mode, onSelectMode }: DevModeSwitcherProps) {
  if (mode === "landing") return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-2.5 z-50">
      <button
        onClick={() => onSelectMode("landing")}
        className="px-4 py-2.5 bg-gray-900/85 hover:bg-gray-900 text-white backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-xl active:scale-95 flex items-center gap-1.5"
      >
        ← Início
      </button>
      <button
        onClick={() => onSelectMode(mode === "consumer" ? "merchant" : "consumer")}
        className={`px-4 py-2.5 backdrop-blur-md border-none rounded-full text-white text-xs font-semibold cursor-pointer transition-all shadow-xl active:scale-95 ${
          mode === "consumer"
            ? "bg-[#6F35B5]/90 hover:bg-[#6F35B5]"
            : "bg-[#008D4C]/90 hover:bg-[#008D4C]"
        }`}
      >
        {mode === "consumer" ? "🏪 Modo Comerciante" : "👤 Modo Consumidor"}
      </button>
    </div>
  );
}
