import { useState } from "react";
import { ShoppingBag, Bell, Star, ChevronRight, Coffee, Pill, Shirt } from "lucide-react";
import { G, GD, GVL, GOLD, T1, T2, BG, BD } from "@/constants/theme";
import { offers } from "@/data/mocks";
import type { ConsumerScreen } from "@/types/navigation";

interface HomeScreenProps {
  go: (s: ConsumerScreen) => void;
}

export function HomeScreen({ go }: HomeScreenProps) {
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
            {offers.map((o) => (
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
          {cats.map((cat) => (
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
