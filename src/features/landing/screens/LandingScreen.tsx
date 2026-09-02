import { ShoppingBag, User, Store, ChevronRight } from "lucide-react";
import { G, GD, P, PD, T1, T2, BG } from "@/constants/theme";
import type { AppMode } from "@/types/navigation";

interface LandingScreenProps {
  onSelect: (m: AppMode) => void;
}

export function LandingScreen({ onSelect }: LandingScreenProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between p-6 sm:p-12 bg-gradient-to-br from-[#F7F8FA] via-[#E7F5ED]/40 to-[#EEE7F7]/40 relative overflow-y-auto">
      <div className="my-auto flex flex-col items-center justify-center max-w-lg w-full text-center py-8">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
          style={{ background: `linear-gradient(135deg,${G},${GD})`, boxShadow: `0 12px 30px rgba(0,141,76,0.35)` }}
        >
          <ShoppingBag size={44} color="#fff" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">cash me</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
          Plataforma de fidelidade para estabelecimentos locais
        </p>

        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Como você quer entrar?</p>

        <div className="w-full space-y-4 max-w-md">
          <button
            onClick={() => onSelect("consumer")}
            className="w-full p-4 sm:p-5 rounded-2xl border-none flex items-center gap-4 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
            style={{ background: `linear-gradient(135deg,${G},${GD})`, boxShadow: `0 8px 24px rgba(0,141,76,0.25)` }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <User size={26} color="#fff" />
            </div>
            <div className="text-left flex-1">
              <p className="text-base sm:text-lg font-bold text-white mb-0.5">Sou consumidor</p>
              <p className="text-xs sm:text-sm text-white/80">Acumule e resgate pontos</p>
            </div>
            <ChevronRight size={22} color="rgba(255,255,255,0.8)" className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onSelect("merchant")}
            className="w-full p-4 sm:p-5 rounded-2xl border-none flex items-center gap-4 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
            style={{ background: `linear-gradient(135deg,${P},${PD})`, boxShadow: `0 8px 24px rgba(111,53,181,0.25)` }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Store size={26} color="#fff" />
            </div>
            <div className="text-left flex-1">
              <p className="text-base sm:text-lg font-bold text-white mb-0.5">Sou comerciante</p>
              <p className="text-xs sm:text-sm text-white/80">Gerencie campanhas e clientes</p>
            </div>
            <ChevronRight size={22} color="rgba(255,255,255,0.8)" className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center py-2">Cash Me © 2026 · v1.0.0</p>
    </div>
  );
}
