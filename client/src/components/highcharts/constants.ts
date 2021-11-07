import { SECTORS_FUNCTION_BASEURL } from "@/configs";
import { UnknownObject } from "@/types";

export const { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } = Number;

export const borderColor = "#FFFFFF";

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
