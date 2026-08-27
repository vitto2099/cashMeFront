export interface Customer {
  id: number;
  name: string;
  pts: number;
  last: string;
  active: boolean;
  purchases: string;
}

export interface MerchantOffer {
  id: number;
  name: string;
  desc: string;
  valid: string;
  active: boolean;
}

export interface Campaign {
  name: string;
  period: string;
  rule: string;
  active: boolean;
}

export interface ChartPoint {
  d: string;
  v: number;
}
