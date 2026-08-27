import { ShoppingBag, ChevronDown, Users, Star, Gift, Megaphone } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { P, PD, PL, G, GL, T1, T2, BD } from "@/constants/theme";
import { chartData } from "@/data/mocks";
import type { MerchantScreen } from "@/types/navigation";

interface DashboardScreenProps {
  go: (s: MerchantScreen) => void;
}

export function DashboardScreen({ go }: DashboardScreenProps) {
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "4px 16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: "rgba(255,255,255,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingBag size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>cash me</span>
          </div>
          <button style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 20, padding: "6px 12px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>Padaria Real</span>
            <ChevronDown size={13} color="#fff" />
          </button>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "4px 0 2px" }}>Dashboard</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0 }}>Resumo do dia · 23/07/2026</p>
      </div>
      <div style={{ background: "#F8F5FC", padding: "0 16px" }}>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: -10, marginBottom: 14 }}>
          {[
            { label: "Vendas", val: "R$ 1.850", sfx: ",00", trend: null },
            { label: "Pts gerados", val: "1.250", sfx: " pts", trend: null },
            { label: "Clientes fidel.", val: "243", sfx: "", trend: "+10%" },
            { label: "Resgates", val: "320", sfx: " pts", trend: "+12%" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${BD}` }}>
              <p style={{ fontSize: 11, color: T2, margin: "0 0 4px" }}>{s.label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: T1, margin: "0 0 4px" }}>{s.val}<span style={{ fontSize: 12, fontWeight: 500 }}>{s.sfx}</span></p>
              {s.trend && <span style={{ fontSize: 11, background: "#DCFCE7", color: "#166534", borderRadius: 6, padding: "2px 6px", fontWeight: 600 }}>{s.trend}</span>}
            </div>
          ))}
        </div>
        {/* Chart */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px 10px 10px", border: `1px solid ${BD}`, marginBottom: 14 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 10px", paddingLeft: 6 }}>Evolução de pontos gerados</h3>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="agrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={P} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={P} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: T2 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: T2 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${BD}` }} />
              <Area type="monotone" dataKey="v" stroke={P} strokeWidth={2.5} fill="url(#agrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Activity */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, border: `1px solid ${BD}`, marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 14px" }}>Atividades recentes</h3>
          {[
            { Icon: Users, label: "Novo cliente cadastrado", sub: "Rafael Lima · agora há pouco", c: "#1E40AF", bg: "#DBEAFE" },
            { Icon: Star, label: "Pontos acumulados", sub: "Leandro Silva · +50 pts", c: G, bg: GL },
            { Icon: Gift, label: "Oferta resgatada", sub: "Maria Oliveira · -300 pts", c: "#B45309", bg: "#FEF3C7" },
            { Icon: Megaphone, label: "Campanha criada", sub: "Aniversário da Padaria · ativa", c: P, bg: PL },
          ].map((a) => (
            <div key={a.label} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, background: a.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <a.Icon size={19} color={a.c} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 1px" }}>{a.label}</p>
                <p style={{ fontSize: 12, color: T2, margin: 0 }}>{a.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
