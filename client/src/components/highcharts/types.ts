import { Point } from "highcharts";

export {
  ChartOptions,
  DataLabelsOptions,
  Options,
  PlotOptions,
  PlotTreemapLevelsOptions,
  PointOptionsObject,
  SeriesOptionsType,
  SeriesTreemapOptions,
  SubtitleOptions,
  TitleOptions,
  TooltipOptions,
} from "highcharts";

interface TreemapItem {
  id: string;
  name: string;
  marketCap: number;
  value?: number | null;
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

export interface ChartPointStock extends TreemapStock, Point {
  shapeArgs: {
    width: number;
    height: number;
  };
}
