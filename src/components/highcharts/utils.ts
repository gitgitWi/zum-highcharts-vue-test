import { TreemapSector } from "@/components/highcharts/types";
import { colorMap } from "@/components/highcharts/constants";

const { random, floor, ceil } = Math;

export const getStockColor = (gains: number): string => {
  const parseGains =
    gains > 3 ? 3 : gains < -3 ? -3 : gains >= 0 ? floor(gains) : ceil(gains);
  return colorMap.get(parseGains) as string;
};

/**
 * @todo TreemapChart 컴포넌트 내부 메서드 추출
 * API 데이터를 treemap chart에 맞게 정제
 * @returns 섹터별 데이터 배열로 분리
 */

export const refineSectorData = (
  sectors: TreemapSector[]
): [string, unknown[]][] =>
  sectors.map(({ name: sectorName, stocks }, sectorId) => [
    sectorName,
    stocks.map(({ name: stockName, marketCap }, stockId) => {
      const gains = random() * 5 * (random() < 0.5 ? -1 : 1);

      return {
        parent: `${sectorId}-${stockId}`,
        name: stockName,
        value: marketCap,
        color: getStockColor(gains),
        gains,
      };
    }),
  ]);
