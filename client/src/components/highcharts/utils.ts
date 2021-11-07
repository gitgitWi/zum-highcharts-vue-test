import { TreemapStock } from "@/components/highcharts/types";
import { widthLevelToFontSizeArray } from "@/components/highcharts/constants";
import { KrDummyStock, UnknownObject } from "@/types";
import { getColorMap, getStockColor } from "@/utils/colors";
import { krBlueColorMap } from "@/constants";

const { random, floor, ceil } = Math;

/**
 * 각 종목 영역 사이즈에 맞는 폰트 사이즈 탐색
 * - 최대 2천여개 종목에 대해 작업 수행하기 때문에
 * - 조금이라도 더 빠르게 탐색할 수 있도록 이진탐색 활용
 * @param width 종목 영역 width
 * @returns 폰트 사이즈
 */
export const getFontSize = (width: number): number => {
  let front = 0;
  let rear = widthLevelToFontSizeArray.length;

  while (front <= rear) {
    const mid = floor((front + rear) * 0.5);
    const [levelSize] = widthLevelToFontSizeArray[mid];

    width >= levelSize ? (rear = mid - 1) : (front = mid + 1);
  }

  return widthLevelToFontSizeArray[front][1];
};

export const getStockNameHtml = (
  stockName: string,
  pointSize: number
): string => {
  const fontSize = getFontSize(pointSize);
  if (fontSize === 0) return ``;
  return `
    <span 
      style="
        height: max-content;
        line-height: 1;
        font-weight: 900;
        font-size: ${fontSize}px;
    ">
      ${stockName}
    </span>`;
};

export const getStockGainHtml = (gains: number, pointSize: number): string => {
  const fontSize = getFontSize(pointSize);

  if (fontSize <= 10) return ``;
  return `
  <span 
    style="
      height: max-content; 
      line-height: 1; 
      font-size: ${fontSize - 2}px;
  ">
  ${gains.toFixed(2)}%
  </span>
  `;
};

const _usDummyRefiner = (sectors: UnknownObject[], dataKey = `US-Green`) => {
  const points: UnknownObject[] = [];
  const getColorByMap = getStockColor(getColorMap(dataKey));
  sectors?.forEach(({ name: sectorName, stocks }, sectorId) => {
    const value = (stocks as TreemapStock[]).reduce(
      (acc, { name: stockName, marketCap }, stockId) => {
        /** @todo API에서 받아오는 것으로 수정 필요 */
        const gains = random() * 5 * (random() < 0.5 ? -1 : +1);

        points.push({
          id: `${sectorId}_${stockId}`,
          name: stockName,
          value: +marketCap,
          parent: `${sectorId}`,
          color: getColorByMap(gains),
          gains,
        });
        return (acc += marketCap);
      },
      0
    );

    points.push({
      id: `${sectorId}`,
      value,
      name: sectorName,
    });
  });
  return points;
};

const _krDummyRefiner = (stocks: KrDummyStock[]): UnknownObject[] => {
  const points: UnknownObject[] = [];
  const sectors = new Map<string, { id: string; name: string; value?: number }>(
    []
  );
  const getColorByMap = getStockColor(krBlueColorMap);

  stocks.forEach(
    ({
      stockCode,
      stockName,
      rateOfChange,
      marketCap,
      priceChange,
      sectorCode,
      sectorName,
    }) => {
      if (!sectors.has(sectorCode))
        sectors.set(sectorCode, { id: sectorCode, name: sectorName });
      points.push({
        id: `${sectorCode}_${stockCode}`,
        name: stockName,
        value: marketCap,
        parent: sectorCode,
        color: getColorByMap(rateOfChange),
        gains: rateOfChange,
        priceChange,
        y: marketCap,
      });
    }
  );

  return [...sectors.values(), ...points];
};

/**
 * API 데이터를 treemap chart에 맞게 정제
 * @returns 섹터별 데이터 배열로 분리
 */
export const refineSectorData = (
  apiData: UnknownObject[] | KrDummyStock[],
  { dataKey = `US-Green` }: Record<string, string>
): UnknownObject[] => {
  return dataKey.toLowerCase().includes("ko")
    ? _krDummyRefiner(apiData as KrDummyStock[])
    : _usDummyRefiner(apiData as UnknownObject[], dataKey);
};
