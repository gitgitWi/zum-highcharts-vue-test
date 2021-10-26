export const borderColor = "#FFFFFF";

export const usRedColorMaps: ReadonlyMap<number, string> = new Map([
  [-3, "rgb(246, 53, 56)"],
  [-2, "rgb(191, 64, 69)"],
  [-1, "rgb(38, 41, 49)"],
]);

export const blueColorMap: ReadonlyMap<number, string> = new Map([
  ...usRedColorMaps,
  [0, "rgb(65, 69, 84)"],
  [1, "rgb(63, 85, 135)"],
  [2, "rgb(60, 106, 195)"],
  [3, "rgb(58, 127, 255)"],
]);

export const greenColorMap: ReadonlyMap<number, string> = new Map([
  ...usRedColorMaps,
  [0, "rgb(64, 69, 84)"],
  [1, "rgb(52, 118, 78)"],
  [2, "rgb(48, 158, 79)"],
  [3, "rgb(50, 204, 90)"],
]);

export const colorMapReg = /(blue|green)/i;
export const categoryReg = /(us|kospi|kosdaq)/i;

export const tabsDataMap = [
  {
    innerText: `KOSPI(blue-red)`,
    dataKey: `KOSPI-Blue`,
    className: `blue-red`,
  },
  {
    innerText: `KOSDAQ(blue-red)`,
    dataKey: `KOSDAQ-Blue`,
    className: `blue-red`,
  },
  { innerText: `US(blue-red)`, dataKey: `US-Blue`, className: `blue-red` },
  { innerText: `US(green-red)`, dataKey: `US-Green`, className: `green-red` },
];
