import { colorMap } from "@/components/highcharts/constants";

const { floor, ceil } = Math;

export const getStockColor = (gains: number): string => {
  const parseGains =
    gains > 3 ? 3 : gains < -3 ? -3 : gains >= 0 ? floor(gains) : ceil(gains);
  console.log({ gains, parseGains });
  return colorMap.get(parseGains) as string;
};
