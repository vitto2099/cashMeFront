import { useState } from "react";
import { Home, Store, Wallet, Tag, User } from "lucide-react";
import { G, BG } from "@/constants/theme";
import { StatusBar, BottomNav, type NavTabItem } from "@/components/common";
import type { ConsumerScreen } from "@/types/navigation";
import {
  HomeScreen,
  CategoriesScreen,
  StoresScreen,
  StoreDetailScreen,
  OffersScreen,
  OfferDetailScreen,
  WalletScreen,
  QRCodeScreen,
  ProfileScreen,
} from "./screens";

const cTabs: NavTabItem[] = [
  { id: "home", label: "Início", Icon: Home },
  { id: "stores", label: "Lojas", Icon: Store },
  { id: "wallet", label: "Carteira", Icon: Wallet },
  { id: "offers", label: "Ofertas", Icon: Tag },
  { id: "profile", label: "Perfil", Icon: User },
];

export function ConsumerApp() {
  const [tab, setTab] = useState<string>("home");
  const [screen, setScreen] = useState<ConsumerScreen>("home");

  function changeTab(t: string) {
    setTab(t);
    setScreen(t as ConsumerScreen);
  }

  function go(s: ConsumerScreen) {
    setScreen(s);
  }

  function back() {
    setScreen(tab as ConsumerScreen);
  }

  const navScreens = new Set<ConsumerScreen>(["home", "stores", "wallet", "offers", "profile"]);

  return (
    <div className="w-full h-screen flex flex-col bg-[#F7F8FA] overflow-hidden">
      <div className="flex-1 flex flex-col w-full overflow-hidden bg-[#F7F8FA]">
        {screen === "home" && <HomeScreen go={go} />}
        {screen === "categories" && <CategoriesScreen back={back} go={go} />}
        {screen === "stores" && <StoresScreen back={back} go={go} />}
        {screen === "store-detail" && <StoreDetailScreen back={back} go={go} />}
        {screen === "offers" && <OffersScreen back={back} go={go} />}
        {screen === "offer-detail" && <OfferDetailScreen back={back} go={go} />}
        {screen === "wallet" && <WalletScreen back={back} />}
        {screen === "qr-code" && <QRCodeScreen back={back} />}
        {screen === "profile" && <ProfileScreen back={back} />}
      </div>
      {navScreens.has(screen) && (
        <div className="w-full bg-white border-t border-gray-200 shrink-0">
          <div className="max-w-7xl mx-auto">
            <BottomNav tabs={cTabs} active={tab} onChange={changeTab} color={G} />
          </div>
        </div>
      )}
    </div>
  );
}
