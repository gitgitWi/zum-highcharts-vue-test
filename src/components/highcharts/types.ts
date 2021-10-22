export {
  Options,
  SeriesOptionsType,
  TooltipFormatterContextObject,
  TooltipFormatterCallbackFunction,
} from "highcharts";

interface TreemapItem {
  id: string;
  name: string;
  marketCap: number;
  value: number;
}

export interface TreemapStock extends TreemapItem {
  /** 섹터 id */
  sectorId: string;
  /** 현재가 */
  price: number;
  /** 등락율 */
  gains: number;
  /** 썸네일 이미지 */
  logoSrc?: string;
}

export interface TreemapSector extends TreemapItem {
  stocks: TreemapStock[];
}

type MarketNames = "kospi" | "kosdaq" | "dow" | "nasdaq" | "dummy";

export interface TreemapMarket {
  name: MarketNames;
  sectors: TreemapSector[];
}
