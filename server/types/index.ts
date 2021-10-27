export type UnknownObject = Record<string, unknown>;

export interface ZumDomesticStock {
  price: {
    detail: {
      id: string;
      name: string;
      currentPrice: number;
      priceChange: number;
      rateOfChange: number;
      marketCap: number;
    };
  };
  additionalInfo: {
    industry: {
      id: number;
      name: string;
    };
  };
}
