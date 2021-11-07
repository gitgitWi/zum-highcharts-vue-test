export type VueType = typeof import("vue");

export type UnknownObject = Record<string, unknown>;

export interface UsDummyStock {
  name: string;
  sectors: {
    id: string;
    name: string;
    stocks: {
      name: string;
      sectorId: string;
      marketCap: number;
      detail?: UnknownObject;
    }[];
  }[];
}

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
