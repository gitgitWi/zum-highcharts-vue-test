import { UsDummyStock } from "@/types/common";
import { randomInt } from "d3";

export interface D3Root {
  name: string;
  value?: number;
  marketCap?: number;
  children?: D3Root[];
}

export const getRootData = (data: UsDummyStock): D3Root => {
  return {
    name: data.name,
    children: data.sectors.map(({ name, stocks }) => ({
      name,
      children: stocks.map(({ name, marketCap }) => ({
        name,
        value: marketCap,
        marketCap,
        gains: randomInt(-5, 5)(),
      })),
    })),
  };
};
