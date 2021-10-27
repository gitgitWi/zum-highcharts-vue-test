import { TreemapStock } from "@/components/highcharts/types";
import {
  colorMapReg,
  krBlueColorMap,
  usBlueColorMap,
  usGreenColorMap,
} from "@/components/highcharts/constants";
import { KrDummyStock, UnknownObject } from "@/types";

const { random, floor, ceil } = Math;

const getColorMap = (dataKey: string): ReadonlyMap<number, string> =>
  dataKey.match(colorMapReg)?.[0].toLowerCase() === "blue"
    ? usBlueColorMap
    : usGreenColorMap;

export const getStockColor =
  (colorMap = usBlueColorMap) =>
  (gains: number): string => {
    const parseGains =
      gains > 3 ? 3 : gains < -3 ? -3 : gains >= 0 ? floor(gains) : ceil(gains);
    return colorMap.get(parseGains) as string;
  };

export const getRelativeSize = (pointSize: number, ratio = 0.2): number => {
  return floor(ratio * pointSize);
};

export const getLogoHtml = (logoSrc: string, pointSize: number): string => {
  const size = getRelativeSize(pointSize, 0.2);

  return `
  <div 
    style="
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
    alt=""
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

const _usDummyRefiner = (sectors: UnknownObject[], dataKey = `US-Green`) => {
  const points: UnknownObject[] = [];
  const getColorByMap = getStockColor(getColorMap(dataKey));
  sectors?.forEach(({ name: sectorName, stocks }, sectorId) => {
    const value = (stocks as TreemapStock[]).reduce(
      (acc, { name: stockName, marketCap, logoSrc = "" }, stockId) => {
        /** @todo API에서 받아오는 것으로 수정 필요 */
        const gains = random() * 5 * (random() < 0.5 ? -1 : +1);

        points.push({
          id: `${sectorId}_${stockId}`,
          name: stockName,
          value: +marketCap,
          parent: `${sectorId}`,
          color: getColorByMap(gains),
          gains,
          logoSrc,
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
  const sectors = new Map<number, { id: string; name: string; value: number }>(
    []
  );
  const getColorByMap = getStockColor(krBlueColorMap);

  stocks.forEach(
    ({
      stockCode,
      stockName,
      logo,
      rateOfChange,
      marketCap,
      priceChange,
      sector: { id, name },
    }) => {
      sectors.has(id)
        ? (sectors.get(id)!.value += marketCap)
        : sectors.set(id, { id: `${id}`, name, value: marketCap });
      points.push({
        id: `${id}_${stockCode}`,
        name: stockName,
        value: marketCap,
        parent: `${id}`,
        color: getColorByMap(rateOfChange),
        gains: rateOfChange,
        logoSrc: logo,
        priceChange,
      });
    }
  );

  console.warn(sectors);

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
    : _usDummyRefiner(apiData as UnknownObject[]);
};
