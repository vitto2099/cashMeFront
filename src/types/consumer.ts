import type { ComponentType } from "react";

export interface Store {
  id: number;
  name: string;
  cat: string;
  loc: string;
  rule: string;
  pts: number;
  color: string;
  bg: string;
}

export interface Offer {
  id: number;
  store: string;
  pts: number;
  discount: string;
  valid: string;
  bg: string;
  img: string;
}

export interface Transaction {
  id: number;
  type: "earn" | "redeem";
  store: string;
  pts: string;
  date: string;
  value: string;
  balance: string;
}

export interface CategoryItem {
  name: string;
  Icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color: string;
  bg: string;
}
