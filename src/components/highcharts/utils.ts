import { TreemapSector } from "@/components/highcharts/types";
import { blueColorMap } from "@/components/highcharts/constants";

const { random, floor, ceil } = Math;

export const getStockColor = (gains: number): string => {
  const parseGains =
    gains > 3 ? 3 : gains < -3 ? -3 : gains >= 0 ? floor(gains) : ceil(gains);
  return blueColorMap.get(parseGains) as string;
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

export const getRelativeSize = (pointSize: number, ratio = 0.2): number => {
  return floor(ratio * pointSize);
};

export const getLogoHtml = (logoSrc: string, pointSize: number): string => {
  const size = getRelativeSize(pointSize, 0.2);

  return `
  <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${size}px; 
      height: ${size}px; 
      background-color: white;
      border-radius: 50px;
    ">
    <img 
    src="${logoSrc}" 
    loading="lazy" 
    style="
      width: 100%; 
      object-fit: cover;
      border-radius: 50px;
      " 
    />
  </div>
  `;
};

export const getStockNameHtml = (
  stockName: string,
  pointSize: number
): string => {
  const fontSize = getRelativeSize(pointSize, 0.07);
  return `
    <span 
      style="
        height: max-content;
        line-height: ${fontSize}px;
        font-weight: 900;
        font-size: ${fontSize}px;
    ">
      ${stockName}
    </span>`;
};

export const getStockGainHtml = (gains: number, pointSize: number): string => {
  return `
  <span 
    style="
      height: max-content; 
      line-height: 1; 
      font-size: ${getRelativeSize(pointSize, 0.05)}px;
  ">
  ${gains.toFixed(2)}%
  </span>
  `;
};
