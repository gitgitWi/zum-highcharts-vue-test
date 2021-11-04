import { SECTORS_FUNCTION_BASEURL } from "@/configs";
import { UnknownObject } from "@/types";

export const { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } = Number;

export const borderColor = "#FFFFFF";

export const krBlueColorMap: ReadonlyMap<number, string> = new Map([
  [3, "#f53538"],
  [2.5, "#CA393E"],
  [2, "#B43A41"],
  [1.5, "#913E46"],
  [1, "#74404B"],
  [0.5, "#74404B"],
  [0, "#434653"],
  [-0.5, "#404e68"],
  [-1, "#3d5883"],
  [-1.5, "#3a639e"],
  [-2, "#376eba"],
  [-2.5, "#3379d6"],
  [-3, "#2f89ff"],
]);

export const usRedColorMaps: ReadonlyMap<number, string> = new Map([
  [-3, "rgb(246, 53, 56)"],
  [-2, "rgb(191, 64, 69)"],
  [-1, "rgb(38, 41, 49)"],
]);

export const usBlueColorMap: ReadonlyMap<number, string> = new Map([
  ...usRedColorMaps,
  [0, "rgb(65, 69, 84)"],
  [1, "rgb(63, 85, 135)"],
  [2, "rgb(60, 106, 195)"],
  [3, "rgb(58, 127, 255)"],
]);

export const usGreenColorMap: ReadonlyMap<number, string> = new Map([
  ...usRedColorMaps,
  [0, "rgb(64, 69, 84)"],
  [1, "rgb(52, 118, 78)"],
  [2, "rgb(48, 158, 79)"],
  [3, "rgb(50, 204, 90)"],
]);

export const dummyDataMap: Readonly<{
  [key: string]: Promise<UnknownObject[]>;
}> = {
  us: import("$assets/us-dummy.json").then(({ sectors }) => sectors),
  kospi:
    process.env.NODE_ENV === "production"
      ? fetch(`${SECTORS_FUNCTION_BASEURL}/kospi`)
          .then((res) => res.json())
          .then(({ results }) => results)
      : import("$assets/kospi-dummy.json").then(({ results }) => results),
  kosdaq:
    process.env.NODE_ENV === "production"
      ? fetch(`${SECTORS_FUNCTION_BASEURL}/kosdaq`)
          .then((res) => res.json())
          .then(({ results }) => results)
      : import("$assets/kosdaq-dummy.json").then(({ results }) => results),
};

export const enum DataKeys {
  KrBlueBlack = `KOREA-Blue-Black`,
  KrBlue = `KOREA-Blue`,
  KospiBlue = `KOSPI-Blue`,
  KosdaqBlue = `KOSDAQ-Blue`,
  UsBlue = `US-Blue`,
  UsGreen = `US-Green`,
}

export const categoryKeys: ReadonlyArray<string> = Object.keys(dummyDataMap);
export const colorMapReg = /(blue|green)/i;

export const tabsDataMap: Readonly<
  { innerText: string; dataKey: DataKeys; className: string }[]
> = [
  {
    innerText: `KR ALL(red-blue-blackBg)`,
    dataKey: DataKeys.KrBlueBlack,
    className: `red-blue`,
  },
  {
    innerText: `KR ALL(red-blue)`,
    dataKey: DataKeys.KrBlue,
    className: `red-blue`,
  },
  {
    innerText: `KOSPI(red-blue)`,
    dataKey: DataKeys.KospiBlue,
    className: `red-blue`,
  },
  {
    innerText: `KOSDAQ(red-blue)`,
    dataKey: DataKeys.KosdaqBlue,
    className: `red-blue`,
  },
  {
    innerText: `US(blue-red)`,
    dataKey: DataKeys.UsBlue,
    className: `blue-red`,
  },
  {
    innerText: `US(green-red)`,
    dataKey: DataKeys.UsGreen,
    className: `green-red`,
  },
];

/**
 * @description
 * 구역 가로 사이즈 -> 종목명 폰트 사이즈 맵핑
 * - 등락율 숫자 사이즈는 (종목명 사이즈 - 2)
 */
export const widthLevelToFontSizeArray: ReadonlyArray<[number, number]> = [
  [MAX_SAFE_INTEGER, 28],
  [240, 28],
  [220, 26],
  [200, 24],
  [170, 22],
  [150, 20],
  [130, 18],
  [100, 16],
  [80, 14],
  [60, 12],
  [50, 10],
  [36, 9],
  [MIN_SAFE_INTEGER, 0],
];
