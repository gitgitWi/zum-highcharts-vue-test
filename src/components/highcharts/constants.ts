import { UnknownObject } from "@/types";

export const borderColor = "#FFFFFF";

export const krBlueColorMap: ReadonlyMap<number, string> = new Map([
  [3, "rgb(246, 53, 56)"],
  [2, "rgb(191, 64, 69)"],
  [1, "rgb(122, 69, 80)"],
  [0, "rgb(65, 69, 84)"],
  [-1, "rgb(63, 85, 135)"],
  [-2, "rgb(60, 106, 195)"],
  [-3, "rgb(58, 127, 255)"],
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
  korea: import("$assets/kr-dummy.json").then(({ stocks }) => stocks),
  kospi: import("$assets/kr-dummy.json").then(({ stocks }) =>
    stocks.filter(({ category }) => category === "KOSPI")
  ),
  kosdaq: import("$assets/kr-dummy.json").then(({ stocks }) =>
    stocks.filter(({ category }) => category === "KOSDAQ")
  ),
};

export const enum DataKeys {
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
