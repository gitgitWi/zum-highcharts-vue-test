export type VueType = typeof import("vue");

export type UnknownObject = Record<string, unknown>;

export interface KrDummyStock {
  category: string;
  stockCode: string;
  stockName: string;
  logo: string;
  currentPrice: number;
  marketCap: number;
  priceChange: number;
  rateOfChange: number;
  sectorCode: string;
  sectorName: string;
}
