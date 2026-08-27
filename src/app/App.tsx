import { useState } from "react";
import {
  Home, Store, Wallet, Tag, User, Bell, Search,
  ChevronRight, ChevronLeft, Star, MapPin,
  BarChart2, Users, Settings, Plus, ArrowUpRight,
  ArrowDownLeft, Check, Download, Printer, Share2,
  RefreshCw, Heart, Coffee, ShoppingBag, Pill, Shirt,
  ChevronDown, Gift, Megaphone, LogOut,
  Edit2, Shield, FileText, HelpCircle, Calendar,
  LayoutDashboard, Layers, Package
} from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from "recharts";

// ── Brand palette ──────────────────────────────────────────────────────────
const G   = "#008D4C";
const GD  = "#006B3A";
const GL  = "#E7F5ED";
const GVL = "#F4FAF6";
const P   = "#6F35B5";
const PD  = "#50218B";
const PL  = "#EEE7F7";
const GOLD = "#F5B800";
const ERR  = "#D64545";
const T1   = "#171717";
const T2   = "#666666";
const BG   = "#F7F8FA";
const BD   = "#E5E7EB";

// ── Static data ────────────────────────────────────────────────────────────
const chartData = [
  { d: "13/05", v: 320 }, { d: "14/05", v: 480 }, { d: "15/05", v: 290 },
  { d: "16/05", v: 610 }, { d: "17/05", v: 420 }, { d: "18/05", v: 780 },
  { d: "19/05", v: 510 }, { d: "20/05", v: 690 }, { d: "21/05", v: 850 },
  { d: "22/05", v: 1250 },
];

const stores = [
  { id: 1, name: "Padaria Real",       cat: "Padaria",      loc: "Centro", rule: "Acumule 1 ponto a cada R$ 1,00",  pts: 850, color: "#92400E", bg: "#FEF3C7" },
  { id: 2, name: "Mercado Bom Preço",  cat: "Supermercado", loc: "Centro", rule: "Acumule 1 ponto a cada R$ 2,00",  pts: 250, color: "#166534", bg: "#DCFCE7" },
  { id: 3, name: "Farmácia Saúde",     cat: "Farmácia",     loc: "Centro", rule: "Acumule 2 pontos a cada R$ 1,00", pts: 100, color: "#1E40AF", bg: "#DBEAFE" },
  { id: 4, name: "Boutique Estilo",    cat: "Moda",         loc: "Centro", rule: "Acumule 1 ponto a cada R$ 1,00",  pts: 50,  color: "#6B21A8", bg: "#F3E8FF" },
  { id: 5, name: "Pet Shop Amigo",     cat: "Pet Shop",     loc: "Centro", rule: "Acumule 1 ponto a cada R$ 2,00",  pts: 0,   color: "#9A3412", bg: "#FFEDD5" },
];

const offers = [
  { id: 1, store: "Padaria Real",       pts: 500, discount: "R$ 10,00", valid: "30/06/2026", bg: "linear-gradient(135deg,#92400E,#B45309)", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=220&fit=crop&auto=format" },
  { id: 2, store: "Mercado Bom Preço",  pts: 300, discount: "R$ 7,00",  valid: "25/06/2026", bg: "linear-gradient(135deg,#166534,#15803D)", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=220&fit=crop&auto=format" },
  { id: 3, store: "Farmácia Saúde",     pts: 400, discount: "R$ 8,00",  valid: "20/06/2026", bg: "linear-gradient(135deg,#1E40AF,#2563EB)", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=220&fit=crop&auto=format" },
];

const history = [
  { id: 1, type: "earn",   store: "Padaria Real",      pts: "+50",  date: "22/05/2026", value: "R$ 50,00",  balance: "1.250 pts" },
  { id: 2, type: "redeem", store: "Mercado Bom Preço", pts: "-300", date: "21/05/2026", value: "Resgate",   balance: "1.200 pts" },
  { id: 3, type: "earn",   store: "Farmácia Saúde",    pts: "+100", date: "20/05/2026", value: "R$ 50,00",  balance: "1.500 pts" },
  { id: 4, type: "earn",   store: "Padaria Real",      pts: "+200", date: "18/05/2026", value: "R$ 200,00", balance: "1.400 pts" },
  { id: 5, type: "redeem", store: "Boutique Estilo",   pts: "-500", date: "15/05/2026", value: "Resgate",   balance: "1.200 pts" },
];

const customers = [
  { id: 1, name: "Leandro Silva",   pts: 1250, last: "22/05/2026", active: true,  purchases: "R$ 2.450,00" },
  { id: 2, name: "Maria Oliveira",  pts: 980,  last: "21/05/2026", active: true,  purchases: "R$ 1.960,00" },
  { id: 3, name: "Carlos Ferreira", pts: 730,  last: "20/05/2026", active: true,  purchases: "R$ 1.460,00" },
  { id: 4, name: "Juliana Costa",   pts: 560,  last: "18/05/2026", active: false, purchases: "R$ 1.120,00" },
  { id: 5, name: "Rafael Lima",     pts: 430,  last: "15/05/2026", active: true,  purchases: "R$ 860,00"   },
];

const merchantOffers = [
  { id: 1, name: "Pão francês",   desc: "Leve 10, pague 8",       valid: "30/06/2026", active: true  },
  { id: 2, name: "Bolo do dia",   desc: "10% de desconto",         valid: "25/06/2026", active: true  },
  { id: 3, name: "Café especial", desc: "Ganhe 1 ponto extra",     valid: "30/06/2026", active: false },
];

type AppMode = "landing" | "consumer" | "merchant";

// ── QR Code SVG (simulated matrix) ────────────────────────────────────────
function QRCodeSVG({ size = 180, color = T1 }: { size?: number; color?: string }) {
  const M = [
    [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0],
    [0,1,0,0,1,0,0,1,0,1,0,1,1,0,1,0,0,1,1,0,1],
    [1,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1],
    [0,0,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,1,0,1,0],
    [1,0,0,1,0,0,1,0,1,0,1,1,1,0,0,1,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1,0,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,0,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,0,1,0,0,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,1,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,1,0,1,1,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,1,1,1,0],
  ];
  const cs = size / M.length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      {M.map((row, r) => row.map((cell, c) => cell ? (
        <rect key={`${r}-${c}`} x={c * cs} y={r * cs} width={cs} height={cs} fill={color} />
      ) : null))}
    </svg>
  );
}

// ── Shared components ──────────────────────────────────────────────────────
function StoreIcon({ name, color, bg, size = 48 }: { name: string; color: string; bg: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.38, fontWeight: 700, color }}>{name[0]}</span>
    </div>
  );
}

function UserAvatar({ name, size = 42 }: { name: string; size?: number }) {
  const palette = [G, P, "#1E40AF", "#B45309", "#9A3412"];
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.4, fontWeight: 700, color: "#fff" }}>{name[0]}</span>
    </div>
  );
}

function StatusBar({ light = true }: { light?: boolean }) {
  const c = light ? T1 : "#fff";
  return (
    <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: c }}>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: c, borderRadius: 1, opacity: i < 3 ? 1 : 0.4 }} />
          ))}
        </div>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 2.5C5.6 2.5 3.4 3.6 1.9 5.3L0.5 3.8C2.4 1.8 5.1 0.5 8 0.5s5.6 1.3 7.5 3.3l-1.4 1.5C12.6 3.6 10.4 2.5 8 2.5z" fill={c} />
          <path d="M8 6.5c-1.2 0-2.3.5-3.1 1.3L3.5 6.4C4.8 5 6.3 4.5 8 4.5s3.2 1 4.5 1.9l-1.4 1.4C10.3 7 9.2 6.5 8 6.5z" fill={c} />
          <circle cx="8" cy="10" r="1.5" fill={c} />
        </svg>
        <div style={{ width: 24, height: 12, border: `1.5px solid ${c}`, borderRadius: 3, padding: "1.5px 2px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "70%", height: "100%", background: c, borderRadius: 1.5 }} />
        </div>
      </div>
    </div>
  );
}

function SegControl({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 10, padding: 3, margin: "0 16px" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, background: active === t.id ? "#fff" : "none", border: "none", fontSize: 13, fontWeight: active === t.id ? 600 : 400, color: active === t.id ? T1 : T2, cursor: "pointer", boxShadow: active === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.18s" }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function BottomNav({ tabs, active, onChange, color }: { tabs: { id: string; label: string; Icon: any }[]; active: string; onChange: (id: string) => void; color: string }) {
  return (
    <div style={{ height: 76, borderTop: `1px solid ${BD}`, display: "flex", background: "#fff", flexShrink: 0 }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, border: "none", background: "none", cursor: "pointer", padding: "8px 0" }}>
            <t.Icon size={22} color={on ? color : "#9CA3AF"} strokeWidth={on ? 2.5 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: on ? 600 : 400, color: on ? color : "#9CA3AF" }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function BackBtn({ onBack, light = true }: { onBack: () => void; light?: boolean }) {
  return (
    <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "50%", background: light ? "#F3F4F6" : "rgba(255,255,255,0.2)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <ChevronLeft size={20} color={light ? T1 : "#fff"} />
    </button>
  );
}

function SwitchToggle({ on, onChange, color = P }: { on: boolean; onChange: () => void; color?: string }) {
  return (
    <button onClick={onChange} style={{ width: 48, height: 28, borderRadius: 14, background: on ? color : "#D1D5DB", border: "none", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
      <div style={{ position: "absolute", width: 22, height: 22, borderRadius: "50%", background: "#fff", top: 3, left: on ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  CONSUMER SCREENS
// ══════════════════════════════════════════════════════════════════════════

function CHome({ go }: { go: (s: string) => void }) {
  const [slide, setSlide] = useState(0);
  const cats = [
    { name: "Alimentação", Icon: Coffee, color: "#92400E", bg: "#FEF3C7" },
    { name: "Bebidas", Icon: ShoppingBag, color: "#1E40AF", bg: "#DBEAFE" },
    { name: "Farmácias", Icon: Pill, color: "#166534", bg: "#DCFCE7" },
    { name: "Moda", Icon: Shirt, color: "#6B21A8", bg: "#F3E8FF" },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: BG }}>
      {/* header */}
      <div style={{ background: "#fff", padding: "0 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: G, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingBag size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: G, letterSpacing: -0.5 }}>cash me</span>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: "50%", background: GVL, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
            <Bell size={20} color={G} />
            <div style={{ position: "absolute", top: 9, right: 9, width: 8, height: 8, background: GOLD, borderRadius: "50%", border: "2px solid #fff" }} />
          </button>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T1, margin: "0 0 4px" }}>Olá, Leandro! 👋</h1>
        <p style={{ fontSize: 13, color: T2, margin: 0, lineHeight: 1.5 }}>Descubra ofertas incríveis e acumule pontos nas melhores lojas da cidade.</p>
      </div>

      {/* points card */}
      <div style={{ margin: "16px", borderRadius: 18, background: `linear-gradient(135deg,${G},${GD})`, padding: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -24, top: -24, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: "0 0 4px" }}>Seus pontos totais</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 38, fontWeight: 700, color: "#fff", lineHeight: 1 }}>1.250</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>pts</span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "4px 0 0" }}>em todas as lojas</p>
          </div>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Star size={24} color={GOLD} fill={GOLD} />
          </div>
        </div>
      </div>

      {/* highlights carousel */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px 10px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: T1, margin: 0 }}>Destaques para você</h3>
          <button onClick={() => go("offers")} style={{ fontSize: 13, color: G, background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Ver todos</button>
        </div>
        <div style={{ paddingLeft: 16, overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 12, transform: `translateX(-${slide * 308}px)`, transition: "transform 0.3s ease" }}>
            {offers.map(o => (
              <div key={o.id} onClick={() => go("offer-detail")} style={{ width: 296, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", cursor: "pointer", flexShrink: 0, background: "#fff" }}>
                <div style={{ height: 130, background: o.bg, position: "relative" }}>
                  <img src={o.img} alt={o.store} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span style={{ background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: T1 }}>{o.store}</span>
                  </div>
                </div>
                <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: T1, margin: "0 0 2px" }}>{o.pts} pts = {o.discount}</p>
                    <p style={{ fontSize: 11, color: T2, margin: 0 }}>Válido até {o.valid}</p>
                  </div>
                  <ChevronRight size={18} color={G} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
          {offers.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 20 : 6, height: 6, borderRadius: 3, background: slide === i ? G : "#D1D5DB", border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s" }} />
          ))}
        </div>
      </div>

      {/* categories */}
      <div style={{ margin: "0 16px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: T1, margin: 0 }}>Categorias</h3>
          <button onClick={() => go("categories")} style={{ fontSize: 13, color: G, background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Ver todas</button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {cats.map(cat => (
            <button key={cat.name} onClick={() => go("stores")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 10px", background: "#fff", borderRadius: 12, border: `1px solid ${BD}`, cursor: "pointer", flex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <cat.Icon size={20} color={cat.color} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, color: T1, textAlign: "center", lineHeight: 1.2 }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CCategories({ back, go }: { back: () => void; go: (s: string) => void }) {
  const cats = [
    { name: "Alimentação", Icon: Coffee, color: "#92400E", bg: "#FEF3C7" },
    { name: "Bebidas", Icon: ShoppingBag, color: "#1E40AF", bg: "#DBEAFE" },
    { name: "Farmácias", Icon: Pill, color: "#166534", bg: "#DCFCE7" },
    { name: "Beleza e Saúde", Icon: Star, color: "#BE185D", bg: "#FCE7F3" },
    { name: "Moda", Icon: Shirt, color: "#6B21A8", bg: "#F3E8FF" },
    { name: "Casa e Decor.", Icon: Home, color: "#B45309", bg: "#FEF9C3" },
    { name: "Serviços", Icon: Settings, color: "#0F766E", bg: "#CCFBF1" },
    { name: "Outros", Icon: Layers, color: "#374151", bg: "#F3F4F6" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Categorias</h2>
        </div>
        <div style={{ margin: "0 16px 12px", background: "#F3F4F6", borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 10 }}>
          <Search size={16} color={T2} />
          <span style={{ fontSize: 14, color: "#9CA3AF" }}>Buscar categorias</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {cats.map(cat => (
            <button key={cat.name} onClick={() => go("stores")} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${BD}`, padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <cat.Icon size={26} color={cat.color} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>{cat.name}</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 14, background: `linear-gradient(135deg,${G},${GD})`, borderRadius: 16, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 2px" }}>Descubra novas lojas</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: 0 }}>na sua cidade!</p>
          </div>
          <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MapPin size={22} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CStores({ back, go }: { back: () => void; go: (s: string) => void }) {
  const [filter, setFilter] = useState("Todas");
  const filters = ["Todas", "Padaria", "Farmácia", "Moda", "Pet Shop"];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Lojas</h2>
        </div>
        <div style={{ margin: "0 16px 10px", background: "#F3F4F6", borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 10 }}>
          <Search size={16} color={T2} />
          <span style={{ fontSize: 14, color: "#9CA3AF" }}>Buscar lojas</span>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", overflowX: "auto" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: 20, background: filter === f ? GL : "#fff", border: `1px solid ${filter === f ? G : BD}`, color: filter === f ? G : T2, fontSize: 13, fontWeight: filter === f ? 600 : 400, cursor: "pointer", flexShrink: 0 }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 16px 16px", background: BG }}>
        {stores.map(s => (
          <div key={s.id} onClick={() => go("store-detail")} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "center", cursor: "pointer", border: `1px solid ${BD}` }}>
            <StoreIcon name={s.name} color={s.color} bg={s.bg} size={52} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: T1, margin: "0 0 3px" }}>{s.name}</p>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: T2 }}>{s.cat}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: BD, display: "inline-block" }} />
                    <MapPin size={10} color={T2} />
                    <span style={{ fontSize: 11, color: T2 }}>{s.loc}</span>
                  </div>
                </div>
                <button style={{ width: 32, height: 32, borderRadius: "50%", background: GVL, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Heart size={15} color={G} />
                </button>
              </div>
              <div style={{ marginTop: 8, background: GVL, borderRadius: 8, padding: "4px 8px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Star size={11} color={GOLD} fill={GOLD} />
                <span style={{ fontSize: 11, color: GD, fontWeight: 500 }}>{s.rule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CStoreDetail({ back, go }: { back: () => void; go: (s: string) => void }) {
  const [tab, setTab] = useState("offers");
  const s = stores[0];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${s.color},#6B2F04)`, padding: "12px 16px 24px", flexShrink: 0 }}>
        <BackBtn onBack={back} light={false} />
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 12 }}>
          <div style={{ width: 58, height: 58, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: s.color }}>P</span>
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{s.name}</h2>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{s.cat}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
              <MapPin size={12} color="rgba(255,255,255,0.8)" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{s.loc}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: "0 16px", marginTop: -18, zIndex: 1, background: "#fff", borderRadius: 14, padding: 16, display: "flex", gap: 0, flexShrink: 0, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
        <div style={{ flex: 1, textAlign: "center", borderRight: `1px solid ${BD}` }}>
          <p style={{ fontSize: 24, fontWeight: 700, color: G, margin: "0 0 2px" }}>{s.pts}</p>
          <p style={{ fontSize: 11, color: T2, margin: 0 }}>Seus pontos</p>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontSize: 24, fontWeight: 700, color: T1, margin: "0 0 2px" }}>1.000</p>
          <p style={{ fontSize: 11, color: T2, margin: 0 }}>Próximo resgate</p>
        </div>
      </div>
      <div style={{ padding: "12px 16px 0", flexShrink: 0, background: BG }}>
        <SegControl tabs={[{id:"offers",label:"Ofertas"},{id:"info",label:"Sobre"},{id:"rules",label:"Pontos"}]} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px 16px", background: BG }}>
        {tab === "offers" && offers.map(o => (
          <div key={o.id} onClick={() => go("offer-detail")} style={{ background: "#fff", borderRadius: 14, marginBottom: 10, overflow: "hidden", cursor: "pointer", border: `1px solid ${BD}` }}>
            <div style={{ height: 80, background: o.bg, position: "relative" }}>
              <img src={o.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
            </div>
            <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{o.pts} pts = {o.discount}</p>
                <p style={{ fontSize: 11, color: T2, margin: 0 }}>Válido até {o.valid}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); go("qr-code"); }} style={{ padding: "8px 14px", background: G, borderRadius: 20, border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Resgatar</button>
            </div>
          </div>
        ))}
        {tab === "info" && (
          <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}` }}>
            <Row Icon={MapPin} title="Endereço" val="Rua das Flores, 123 – Centro" color={G} />
            <div style={{ borderTop: `1px solid ${BD}`, margin: "12px 0" }} />
            <Row Icon={Calendar} title="Horário" val="Seg–Sáb: 6h às 19h" color={G} />
          </div>
        )}
        {tab === "rules" && (
          <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}` }}>
            <div style={{ background: GVL, borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: G, margin: "0 0 4px" }}>Regra de acúmulo</p>
              <p style={{ fontSize: 13, color: T1, margin: 0 }}>{s.rule}</p>
            </div>
            <p style={{ fontSize: 13, color: T2, margin: 0, lineHeight: 1.6 }}>Pontos válidos por 12 meses. Mínimo de R$ 5,00 por compra para acumular pontos.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ Icon, title, val, color }: { Icon: any; title: string; val: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Icon size={18} color={color} />
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{title}</p>
        <p style={{ fontSize: 12, color: T2, margin: 0 }}>{val}</p>
      </div>
    </div>
  );
}

function COffers({ back, go }: { back: () => void; go: (s: string) => void }) {
  const [tab, setTab] = useState("all");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0, paddingBottom: 12 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Ofertas para você</h2>
        </div>
        <SegControl tabs={[{id:"all",label:"Todas"},{id:"mine",label:"Minhas lojas"},{id:"new",label:"Novas"}]} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px 16px", background: BG }}>
        {offers.map(o => (
          <div key={o.id} onClick={() => go("offer-detail")} style={{ borderRadius: 16, overflow: "hidden", marginBottom: 14, boxShadow: "0 4px 14px rgba(0,0,0,0.1)", cursor: "pointer" }}>
            <div style={{ height: 168, background: o.bg, position: "relative" }}>
              <img src={o.img} alt={o.store} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }} />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <span style={{ background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: T1 }}>{o.store}</span>
              </div>
              <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                <p style={{ fontSize: 19, fontWeight: 700, color: "#fff", margin: "0 0 3px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{o.pts} pontos = {o.discount} de desconto</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", margin: 0 }}>Válido até {o.valid}</p>
              </div>
            </div>
            <div style={{ background: "#fff", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <Star size={13} color={GOLD} fill={GOLD} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>Você tem 1.250 pts</span>
              </div>
              <button onClick={e => { e.stopPropagation(); go("qr-code"); }} style={{ padding: "8px 16px", background: G, borderRadius: 20, border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Resgatar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function COfferDetail({ back, go }: { back: () => void; go: (s: string) => void }) {
  const o = offers[0];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Detalhe da oferta</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: BG }}>
        <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div style={{ height: 200, background: o.bg, position: "relative" }}>
            <img src={o.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }} />
            <div style={{ position: "absolute", inset: 0, padding: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 4px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{o.pts} pts = {o.discount}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", margin: 0 }}>Válido até {o.valid}</p>
            </div>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${BD}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: T1, margin: "0 0 12px" }}>Detalhes da promoção</h3>
          {[["Loja", o.store], ["Pontos necessários", `${o.pts} pts`], ["Desconto gerado", o.discount], ["Validade", o.valid]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: T2 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: GVL, borderRadius: 12, padding: 14, marginBottom: 16, border: `1px solid ${GL}`, display: "flex", gap: 8, alignItems: "center" }}>
          <Star size={16} color={GOLD} fill={GOLD} />
          <p style={{ fontSize: 13, color: GD, fontWeight: 600, margin: 0 }}>Você tem 1.250 pts disponíveis</p>
        </div>
        <button onClick={() => go("qr-code")} style={{ width: "100%", padding: "14px", background: G, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Resgatar oferta</button>
      </div>
    </div>
  );
}

function CWallet({ back }: { back: () => void }) {
  const [tab, setTab] = useState("stores");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0, paddingBottom: 8 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Minha carteira</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: BG }}>
        <div style={{ margin: "0 16px 16px", borderRadius: 18, background: `linear-gradient(135deg,${G},${GD})`, padding: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -24, top: -24, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: "0 0 4px" }}>Seus pontos totais</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1 }}>1.250</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>pts</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "4px 0 0" }}>Em todas as lojas</p>
            </div>
            <Star size={24} color={GOLD} fill={GOLD} />
          </div>
        </div>
        <div style={{ padding: "0 16px 12px" }}>
          <SegControl tabs={[{id:"stores",label:"Por loja"},{id:"history",label:"Histórico"}]} active={tab} onChange={setTab} />
        </div>
        <div style={{ padding: "0 16px 16px" }}>
          {tab === "stores" ? (
            <>
              {stores.slice(0, 4).map(s => (
                <div key={s.id} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${BD}` }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                    <StoreIcon name={s.name} color={s.color} bg={s.bg} size={44} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{s.name}</p>
                      <p style={{ fontSize: 12, color: T2, margin: 0 }}>{s.cat}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 20, fontWeight: 700, color: G, margin: 0 }}>{s.pts}</p>
                      <p style={{ fontSize: 11, color: T2, margin: 0 }}>pts</p>
                    </div>
                  </div>
                  <div style={{ background: "#F3F4F6", borderRadius: 4, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${Math.min((s.pts / 1000) * 100, 100)}%`, height: "100%", background: G, borderRadius: 4 }} />
                  </div>
                  <p style={{ fontSize: 11, color: T2, margin: "4px 0 0" }}>{1000 - s.pts > 0 ? `Faltam ${1000 - s.pts} pts para o próximo resgate` : "Pronto para resgatar!"}</p>
                </div>
              ))}
              <div style={{ background: GVL, borderRadius: 12, padding: 14, border: `1px solid ${GL}` }}>
                <p style={{ fontSize: 13, color: GD, margin: 0, lineHeight: 1.5 }}>💡 Cada loja tem suas próprias regras de acúmulo e troca. Consulte a página da loja.</p>
              </div>
            </>
          ) : (
            history.map((h, i) => (
              <div key={h.id} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: h.type === "earn" ? GL : "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {h.type === "earn" ? <ArrowUpRight size={18} color={G} /> : <ArrowDownLeft size={18} color={ERR} />}
                  </div>
                  {i < history.length - 1 && <div style={{ width: 1, flex: 1, background: BD, marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, background: "#fff", borderRadius: 12, padding: "10px 14px", border: `1px solid ${BD}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 2px" }}>{h.store}</p>
                      <p style={{ fontSize: 11, color: T2, margin: "0 0 3px" }}>{h.date} · {h.value}</p>
                      <p style={{ fontSize: 11, color: T2, margin: 0 }}>Saldo: {h.balance}</p>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: h.type === "earn" ? G : ERR }}>{h.pts} pts</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CQRCode({ back }: { back: () => void }) {
  const [mode, setMode] = useState("earn");
  const [done, setDone] = useState(false);
  if (done) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: BG, padding: 32 }}>
      <div style={{ width: 80, height: 80, background: GL, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Check size={40} color={G} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: T1, margin: "0 0 8px", textAlign: "center" }}>Resgate realizado com sucesso!</h2>
      <p style={{ fontSize: 14, color: T2, textAlign: "center", margin: "0 0 24px" }}>Código da operação: #CM20260723-001</p>
      <div style={{ background: "#fff", borderRadius: 16, padding: 20, width: "100%", marginBottom: 24, border: `1px solid ${BD}` }}>
        {[["Loja","Padaria Real"],["Pontos utilizados","-500 pts"],["Desconto gerado","R$ 10,00"]].map(([k,v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: T2 }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: k === "Loja" ? T1 : k.includes("Pontos") ? ERR : G }}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setDone(false)} style={{ width: "100%", padding: "14px", background: G, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Concluir</button>
    </div>
  );
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0, paddingBottom: 12 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Acumular ou Resgatar</h2>
        </div>
        <SegControl tabs={[{id:"earn",label:"Acumular"},{id:"redeem",label:"Resgatar"}]} active={mode} onChange={setMode} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px 16px", background: BG }}>
        <p style={{ fontSize: 14, color: T2, textAlign: "center", margin: "0 0 16px", lineHeight: 1.5 }}>
          {mode === "earn" ? "Apresente este QR Code no caixa para acumular pontos." : "Apresente este QR Code para resgatar sua oferta."}
        </p>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", border: `1px solid ${BD}`, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", marginBottom: 14 }}>
          <QRCodeSVG size={190} color={T1} />
          {mode === "redeem" && (
            <div style={{ marginTop: 16, background: GVL, borderRadius: 10, padding: 12, width: "100%" }}>
              <p style={{ fontSize: 12, color: T2, margin: "0 0 3px" }}>Oferta selecionada</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: G, margin: "0 0 2px" }}>500 pts = R$ 10,00 de desconto</p>
              <p style={{ fontSize: 12, color: T2, margin: 0 }}>Padaria Real · Válido até 30/06/2026</p>
            </div>
          )}
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${BD}`, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <StoreIcon name="Padaria Real" color={stores[0].color} bg={stores[0].bg} size={40} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 2px" }}>Padaria Real</p>
              <p style={{ fontSize: 12, color: G, fontWeight: 600, margin: 0 }}>850 pts disponíveis</p>
            </div>
          </div>
          <button style={{ padding: "8px 12px", background: GVL, borderRadius: 10, border: `1px solid ${GL}`, color: G, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Trocar</button>
        </div>
        {mode === "redeem" && (
          <button onClick={() => setDone(true)} style={{ width: "100%", padding: "14px", background: G, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Confirmar resgate</button>
        )}
      </div>
    </div>
  );
}

function CProfile({ back }: { back: () => void }) {
  const items = [
    { Icon: Edit2, label: "Meus dados" },
    { Icon: Heart, label: "Lojas favoritas" },
    { Icon: BarChart2, label: "Histórico de pontos" },
    { Icon: Bell, label: "Notificações" },
    { Icon: HelpCircle, label: "Central de ajuda" },
    { Icon: Settings, label: "Configurações" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#fff", flexShrink: 0 }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: T1, margin: 0 }}>Meu perfil</h2>
        </div>
        <div style={{ padding: "4px 16px 16px", display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${G},${GD})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>L</span>
          </div>
          <div>
            <p style={{ fontSize: 18, fontWeight: 700, color: T1, margin: "0 0 4px" }}>Leandro Bona</p>
            <p style={{ fontSize: 13, color: T2, margin: 0 }}>leandro.bona@email.com</p>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "12px 16px", background: BG }}>
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: `1px solid ${BD}`, marginBottom: 12 }}>
          {items.map((item, i) => (
            <button key={item.label} style={{ width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", borderBottom: i < items.length - 1 ? `1px solid ${BD}` : "none", cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, background: GVL, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <item.Icon size={18} color={G} />
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: T1, textAlign: "left" }}>{item.label}</span>
              <ChevronRight size={18} color="#9CA3AF" />
            </button>
          ))}
        </div>
        <button style={{ width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: "#FEE2E2", border: "none", borderRadius: 14, cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, background: "#FCA5A5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogOut size={18} color={ERR} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: ERR }}>Sair</span>
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MERCHANT SCREENS
// ══════════════════════════════════════════════════════════════════════════

function MDashboard({ go }: { go: (s: string) => void }) {
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
          ].map(s => (
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
          ].map(a => (
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

function MCampaigns({ go }: { go: (s: string) => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Campanhas</h2>
          <button onClick={() => go("new-campaign")} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Plus size={20} color="#fff" />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        {[
          { name: "Campanha Padrão", period: "Permanente", rule: "1 pt / R$ 1,00", active: true },
          { name: "Aniversário da Padaria", period: "01/07 – 31/07/2026", rule: "2 pts / R$ 1,00", active: false },
          { name: "Promoção de Inverno", period: "01/06 – 30/06/2026", rule: "1 pt / R$ 1,00", active: false },
        ].map(c => (
          <div key={c.name} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: T1, margin: "0 0 3px" }}>{c.name}</p>
                <p style={{ fontSize: 12, color: T2, margin: 0 }}>{c.period}</p>
              </div>
              <span style={{ background: c.active ? GL : "#F3F4F6", color: c.active ? G : T2, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{c.active ? "Ativa" : "Inativa"}</span>
            </div>
            <div style={{ background: PL, borderRadius: 8, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
              <Star size={11} color={P} />
              <span style={{ fontSize: 12, color: P, fontWeight: 500 }}>{c.rule}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => go("scoring-rules")} style={{ flex: 1, padding: "8px", background: PL, borderRadius: 8, border: "none", color: P, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Regras</button>
              <button onClick={() => go("points-conversion")} style={{ flex: 1, padding: "8px", background: PL, borderRadius: 8, border: "none", color: P, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Conversão</button>
              <button style={{ flex: 1, padding: "8px", background: P, borderRadius: 8, border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Editar</button>
            </div>
          </div>
        ))}
        <button onClick={() => go("new-campaign")} style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Plus size={18} color="#fff" /> Nova campanha
        </button>
      </div>
    </div>
  );
}

function MNewCampaign({ back }: { back: () => void }) {
  const [active, setActive] = useState(true);
  const [done, setDone] = useState(false);
  if (done) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, background: "#F8F5FC" }}>
      <div style={{ width: 80, height: 80, background: PL, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Check size={40} color={P} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: T1, textAlign: "center", margin: "0 0 8px" }}>Campanha criada com sucesso!</h2>
      <p style={{ fontSize: 14, color: T2, textAlign: "center", margin: "0 0 32px" }}>Sua campanha já está disponível para os clientes.</p>
      <button onClick={() => { setDone(false); back(); }} style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Concluir</button>
    </div>
  );
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "12px 16px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} light={false} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>Nova campanha</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <FormField label="Nome da campanha" placeholder="Ex.: Aniversário da Padaria" />
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 10 }}>Período da campanha</label>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: T2, margin: "0 0 5px" }}>Data inicial</p>
              <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "10px 12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: T1 }}>01/07/2026</span>
                <Calendar size={15} color={T2} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: T2, margin: "0 0 5px" }}>Data final</p>
              <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "10px 12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: T1 }}>31/07/2026</span>
                <Calendar size={15} color={T2} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 12 }}>Como o cliente acumula pontos?</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <div style={{ flex: 1, background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "10px 12px", textAlign: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: P }}>R$ 1,00</span>
            </div>
            <span style={{ fontSize: 13, color: T2 }}>gastos geram</span>
            <div style={{ flex: 1, background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "10px 12px", textAlign: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: P }}>1 pt</span>
            </div>
          </div>
          <div style={{ background: PL, borderRadius: 8, padding: "8px 12px" }}>
            <p style={{ fontSize: 12, color: PD, margin: 0 }}>A cada R$ 1,00 gasto, o cliente ganha 1 ponto.</p>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${BD}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 2px" }}>Ativar campanha</p>
            <p style={{ fontSize: 12, color: T2, margin: 0 }}>Clientes podem acumular pontos</p>
          </div>
          <SwitchToggle on={active} onChange={() => setActive(!active)} />
        </div>
        <button onClick={() => setDone(true)} style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Criar campanha</button>
      </div>
    </div>
  );
}

function FormField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>{label}</label>
      <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "12px 14px" }}>
        <span style={{ fontSize: 14, color: "#9CA3AF" }}>{placeholder}</span>
      </div>
    </div>
  );
}

function MScoringRules({ back }: { back: () => void }) {
  const [noExpiry, setNoExpiry] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "12px 16px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} light={false} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>Regras de pontuação</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <p style={{ fontSize: 14, color: T2, margin: "0 0 14px" }}>Defina como seus clientes acumulam pontos.</p>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: P, margin: "0 0 4px" }}>A cada R$ 1,00 gasto</p>
              <p style={{ fontSize: 14, color: T1, margin: 0 }}>o cliente ganha <strong>1 ponto</strong></p>
            </div>
            <button style={{ padding: "8px 14px", background: PL, borderRadius: 8, border: "none", color: P, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Editar</button>
          </div>
        </div>
        {[
          { label: "Pontos válidos por", val: "12 meses", sw: false },
          { label: "Pts não expiram durante campanha", val: null, sw: true },
          { label: "Limite de pontos por compra", val: "500 pts", sw: false },
          { label: "Pontuação em aniversários", val: "Dobrada", sw: false },
        ].map(item => (
          <div key={item.label} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <p style={{ fontSize: 14, color: T1, margin: 0, flex: 1 }}>{item.label}</p>
            {item.sw ? (
              <SwitchToggle on={noExpiry} onChange={() => setNoExpiry(!noExpiry)} />
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#F9FAFB", borderRadius: 8, padding: "6px 10px", flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>{item.val}</span>
                <ChevronDown size={13} color={T2} />
              </div>
            )}
          </div>
        ))}
        <button style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>Salvar regras</button>
      </div>
    </div>
  );
}

function MPointsConversion({ back }: { back: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "12px 16px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} light={false} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>Conversão de pontos</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <p style={{ fontSize: 14, color: T2, margin: "0 0 14px" }}>Defina como os pontos são trocados por desconto.</p>
        {[{pts:500,d:"R$ 10,00"},{pts:1000,d:"R$ 25,00"},{pts:2000,d:"R$ 60,00"}].map(o => (
          <div key={o.pts} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}`, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, background: PL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Star size={22} color={P} fill={P} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: T1, margin: "0 0 2px" }}>{o.pts} pontos</p>
              <p style={{ fontSize: 14, color: G, fontWeight: 600, margin: 0 }}>= {o.d} de desconto</p>
            </div>
            <button style={{ width: 34, height: 34, background: "#F3F4F6", borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Edit2 size={15} color={T2} />
            </button>
          </div>
        ))}
        <button style={{ width: "100%", padding: "12px", background: PL, borderRadius: 12, border: `1.5px dashed ${P}`, color: P, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 }}>
          <Plus size={18} color={P} /> Adicionar nova opção
        </button>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}`, marginBottom: 14 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 10px" }}>Regras da conversão</h4>
          {["O cliente escolhe a opção de desconto","O desconto é aplicado ao valor total da compra","Os pontos não são convertidos em dinheiro"].map(r => (
            <div key={r} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
              <Check size={16} color={G} style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: T2, margin: 0 }}>{r}</p>
            </div>
          ))}
        </div>
        <button style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Salvar conversão</button>
      </div>
    </div>
  );
}

function MQRStore() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>QR Code da loja</h2>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <p style={{ fontSize: 14, color: T2, textAlign: "center", margin: "0 0 18px", lineHeight: 1.5 }}>Peça para o cliente escanear no caixa para acumular ou resgatar pontos.</p>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", border: `1px solid ${BD}`, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", marginBottom: 14 }}>
          <QRCodeSVG size={190} color={P} />
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: T1, margin: "0 0 2px" }}>Padaria Real</p>
            <p style={{ fontSize: 13, color: T2, margin: 0 }}>Centro – Padaria</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { Icon: Download, label: "Baixar QR Code", c: G, bg: GL },
            { Icon: Printer, label: "Imprimir QR Code", c: P, bg: PL },
            { Icon: Share2, label: "Compartilhar", c: "#1E40AF", bg: "#DBEAFE" },
            { Icon: RefreshCw, label: "Gerar novo", c: "#B45309", bg: "#FEF3C7" },
          ].map(a => (
            <button key={a.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 10px", border: `1px solid ${BD}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, background: a.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <a.Icon size={20} color={a.c} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: T1, textAlign: "center" }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MCustomers({ go }: { go: (s: string) => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Clientes fidelizados</h2>
      </div>
      <div style={{ margin: "12px 16px", background: "#F3F4F6", borderRadius: 12, display: "flex", alignItems: "center", padding: "10px 14px", gap: 10, flexShrink: 0 }}>
        <Search size={16} color={T2} />
        <span style={{ fontSize: 14, color: "#9CA3AF" }}>Buscar clientes</span>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "0 16px 16px", background: "#F8F5FC" }}>
        {customers.map(c => (
          <div key={c.id} onClick={() => go("customer-detail")} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "center", cursor: "pointer", border: `1px solid ${BD}` }}>
            <UserAvatar name={c.name} size={46} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: 0 }}>{c.name}</p>
                <span style={{ fontSize: 16, fontWeight: 700, color: P }}>{c.pts}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 11, color: T2, margin: 0 }}>Última compra: {c.last}</p>
                <span style={{ fontSize: 10, background: c.active ? GL : "#F3F4F6", color: c.active ? G : T2, borderRadius: 20, padding: "2px 8px", fontWeight: 600 }}>{c.active ? "Ativo" : "Inativo"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MCustomerDetail({ back }: { back: () => void }) {
  const c = customers[0];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "12px 16px 24px", flexShrink: 0 }}>
        <BackBtn onBack={back} light={false} />
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{c.name[0]}</span>
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 5px" }}>{c.name}</h2>
            <span style={{ fontSize: 12, background: "rgba(255,255,255,0.18)", color: "#fff", borderRadius: 20, padding: "3px 10px" }}>Cliente ativo</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[["Total de compras",c.purchases],["Pontos acumulados",`${c.pts} pts`],["Pontos resgatados","750 pts"],["Última compra",c.last]].map(([k,v]) => (
            <div key={k} style={{ background: "#fff", borderRadius: 12, padding: 14, border: `1px solid ${BD}` }}>
              <p style={{ fontSize: 11, color: T2, margin: "0 0 4px" }}>{k}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: T1, margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}` }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: T1, margin: "0 0 12px" }}>Últimas movimentações</h4>
          {history.map(h => (
            <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${BD}` }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: T1, margin: "0 0 2px" }}>{h.store}</p>
                <p style={{ fontSize: 11, color: T2, margin: 0 }}>{h.date} · {h.value}</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: h.type === "earn" ? G : ERR }}>{h.pts} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MVitrine({ go }: { go: (s: string) => void }) {
  const [items, setItems] = useState(merchantOffers.map(o => ({ ...o })));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>Vitrine da loja</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", margin: 0 }}>Mostre suas ofertas para todos os clientes.</p>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        {items.map((o, i) => (
          <div key={o.id} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${BD}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 52, height: 52, background: PL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Tag size={22} color={P} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: T1, margin: 0 }}>{o.name}</p>
                  <SwitchToggle on={o.active} onChange={() => setItems(items.map((x, j) => j === i ? { ...x, active: !x.active } : x))} />
                </div>
                <p style={{ fontSize: 13, color: T2, margin: "0 0 3px" }}>{o.desc}</p>
                <p style={{ fontSize: 12, color: T2, margin: 0 }}>Válido até {o.valid}</p>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => go("new-offer")} style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Plus size={18} color="#fff" /> Nova oferta
        </button>
      </div>
    </div>
  );
}

function MNewOffer({ back }: { back: () => void }) {
  const [active, setActive] = useState(true);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "12px 16px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} light={false} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: 0 }}>Nova oferta</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <FormField label="Nome da oferta" placeholder="Ex.: Pão francês" />
        <FormField label="Descrição" placeholder="Ex.: Leve 10, pague 8" />
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>Tipo de benefício</label>
          <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: T1 }}>Desconto em pontos</span>
            <ChevronDown size={16} color={T2} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}` }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>Pontos</label>
            <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "12px 14px" }}>
              <span style={{ fontSize: 14, color: T1, fontWeight: 600 }}>500 pts</span>
            </div>
          </div>
          <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}` }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>Desconto</label>
            <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "12px 14px" }}>
              <span style={{ fontSize: 14, color: T1, fontWeight: 600 }}>R$ 10,00</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}` }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>Início</label>
            <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "10px 12px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: T1 }}>01/07/2026</span>
              <Calendar size={14} color={T2} />
            </div>
          </div>
          <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 16, border: `1px solid ${BD}` }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>Fim</label>
            <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "10px 12px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: T1 }}>30/07/2026</span>
              <Calendar size={14} color={T2} />
            </div>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${BD}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: 0 }}>Ativar oferta imediatamente</p>
          <SwitchToggle on={active} onChange={() => setActive(!active)} />
        </div>
        <button onClick={back} style={{ width: "100%", padding: "14px", background: P, borderRadius: 12, border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Salvar oferta</button>
      </div>
    </div>
  );
}

function MSettings({ back }: { back: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "8px 16px 18px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onBack={back} light={false} />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>Configurações</h2>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, background: "#F8F5FC" }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${BD}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: T2, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Dados da loja</p>
          {[["Nome","Padaria Real"],["Endereço","Rua das Flores, 123, Centro"],["Categorias","Padaria, Confeitaria"],["Telefone","(44) 99999-9999"],["E-mail","contato@padariareal.com"]].map(([k,v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${BD}` }}>
              <span style={{ fontSize: 13, color: T2 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: T1, maxWidth: "60%", textAlign: "right" }}>{v}</span>
            </div>
          ))}
          <button style={{ width: "100%", padding: "12px", background: P, borderRadius: 10, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>Editar informações da loja</button>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: `1px solid ${BD}`, marginBottom: 12 }}>
          {[
            { Icon: Users, label: "Gerenciar usuários", sub: "3 usuários cadastrados" },
            { Icon: Shield, label: "Segurança", sub: null },
            { Icon: Bell, label: "Notificações", sub: null },
            { Icon: FileText, label: "Termos de uso", sub: null },
            { Icon: HelpCircle, label: "Política de privacidade", sub: null },
          ].map((item, i, arr) => (
            <button key={item.label} style={{ width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", borderBottom: i < arr.length - 1 ? `1px solid ${BD}` : "none", cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, background: "#F8F5FC", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <item.Icon size={18} color={P} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: T1, margin: 0 }}>{item.label}</p>
                {item.sub && <p style={{ fontSize: 12, color: T2, margin: 0 }}>{item.sub}</p>}
              </div>
              <ChevronRight size={18} color="#9CA3AF" />
            </button>
          ))}
        </div>
        <button style={{ width: "100%", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: "#FEE2E2", border: "none", borderRadius: 14, cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, background: "#FCA5A5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogOut size={18} color={ERR} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: ERR }}>Sair</span>
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  APP CONTAINERS
// ══════════════════════════════════════════════════════════════════════════

const cTabs = [
  { id: "home",    label: "Início",  Icon: Home    },
  { id: "stores",  label: "Lojas",   Icon: Store   },
  { id: "wallet",  label: "Carteira",Icon: Wallet  },
  { id: "offers",  label: "Ofertas", Icon: Tag     },
  { id: "profile", label: "Perfil",  Icon: User    },
];

const mTabs = [
  { id: "dashboard",  label: "Dashboard",  Icon: LayoutDashboard },
  { id: "campaigns",  label: "Campanhas",  Icon: Megaphone       },
  { id: "qr",         label: "QR Code",    Icon: Package         },
  { id: "customers",  label: "Clientes",   Icon: Users           },
  { id: "more",       label: "Mais",       Icon: Layers          },
];

function ConsumerApp() {
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState("home");

  function changeTab(t: string) {
    setTab(t);
    setScreen(t);
  }
  function go(s: string) { setScreen(s); }
  function back() { setScreen(tab); }

  const navScreens = new Set(["home","stores","wallet","offers","profile"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ background: "#fff" }}><StatusBar light /></div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: BG }}>
        {screen === "home"         && <CHome go={go} />}
        {screen === "categories"   && <CCategories back={back} go={go} />}
        {screen === "stores"       && <CStores back={back} go={go} />}
        {screen === "store-detail" && <CStoreDetail back={back} go={go} />}
        {screen === "offers"       && <COffers back={back} go={go} />}
        {screen === "offer-detail" && <COfferDetail back={back} go={go} />}
        {screen === "wallet"       && <CWallet back={back} />}
        {screen === "qr-code"      && <CQRCode back={back} />}
        {screen === "profile"      && <CProfile back={back} />}
      </div>
      {navScreens.has(screen) && <BottomNav tabs={cTabs} active={tab} onChange={changeTab} color={G} />}
    </div>
  );
}

function MerchantApp() {
  const [tab, setTab] = useState("dashboard");
  const [screen, setScreen] = useState("dashboard");

  function changeTab(t: string) {
    setTab(t);
    if (t === "qr") setScreen("qr-store");
    else if (t === "more") setScreen("vitrine");
    else setScreen(t);
  }
  function go(s: string) { setScreen(s); }
  function back() {
    if (tab === "qr") setScreen("qr-store");
    else if (tab === "more") setScreen("vitrine");
    else setScreen(tab);
  }

  const navScreens = new Set(["dashboard","campaigns","qr-store","customers","vitrine"]);
  const activeTab = screen === "qr-store" ? "qr" : screen === "vitrine" ? "more" : (navScreens.has(screen) ? screen : tab);
  const purpleHeader = navScreens.has(screen);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ background: purpleHeader ? P : "#F8F5FC" }}><StatusBar light={!purpleHeader} /></div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#F8F5FC" }}>
        {screen === "dashboard"        && <MDashboard go={go} />}
        {screen === "campaigns"        && <MCampaigns go={go} />}
        {screen === "new-campaign"     && <MNewCampaign back={back} />}
        {screen === "scoring-rules"    && <MScoringRules back={back} />}
        {screen === "points-conversion"&& <MPointsConversion back={back} />}
        {screen === "qr-store"         && <MQRStore />}
        {screen === "customers"        && <MCustomers go={go} />}
        {screen === "customer-detail"  && <MCustomerDetail back={back} />}
        {screen === "vitrine"          && <MVitrine go={go} />}
        {screen === "new-offer"        && <MNewOffer back={back} />}
        {screen === "settings"         && <MSettings back={back} />}
      </div>
      {navScreens.has(screen) && <BottomNav tabs={mTabs} active={activeTab} onChange={changeTab} color={P} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  LANDING + MAIN APP
// ══════════════════════════════════════════════════════════════════════════

function Landing({ onSelect }: { onSelect: (m: AppMode) => void }) {
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

export default function App() {
  const [mode, setMode] = useState<AppMode>("landing");

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 20px 80px", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Phone frame */}
      <div style={{ width: 390, height: 844, borderRadius: 50, overflow: "hidden", background: BG, position: "relative", display: "flex", flexDirection: "column", boxShadow: "0 50px 100px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.12), inset 0 0 0 2px rgba(255,255,255,0.06)" }}>
        {/* Dynamic island notch */}
        <div style={{ position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#000", borderRadius: 20, zIndex: 200 }} />
        {/* Screen */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {mode === "landing"  && <><div style={{ background: BG }}><StatusBar light /></div><Landing onSelect={setMode} /></>}
          {mode === "consumer" && <ConsumerApp />}
          {mode === "merchant" && <MerchantApp />}
        </div>
        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 130, height: 5, background: "rgba(0,0,0,0.2)", borderRadius: 3 }} />
      </div>

      {/* Mode switcher outside phone */}
      {mode !== "landing" && (
        <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 1000 }}>
          <button onClick={() => setMode("landing")} style={{ padding: "10px 18px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Início</button>
          <button onClick={() => setMode(mode === "consumer" ? "merchant" : "consumer")} style={{ padding: "10px 18px", background: mode === "consumer" ? "rgba(111,53,181,0.85)" : "rgba(0,141,76,0.85)", backdropFilter: "blur(12px)", border: "none", borderRadius: 20, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {mode === "consumer" ? "🏪 Modo Comerciante" : "👤 Modo Consumidor"}
          </button>
        </div>
      )}
    </div>
  );
}
