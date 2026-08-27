export type AppMode = "landing" | "consumer" | "merchant";

export type ConsumerScreen =
  | "home"
  | "categories"
  | "stores"
  | "store-detail"
  | "offers"
  | "offer-detail"
  | "wallet"
  | "qr-code"
  | "profile";

export type MerchantScreen =
  | "dashboard"
  | "campaigns"
  | "new-campaign"
  | "scoring-rules"
  | "points-conversion"
  | "qr-store"
  | "customers"
  | "customer-detail"
  | "vitrine"
  | "new-offer"
  | "settings";
