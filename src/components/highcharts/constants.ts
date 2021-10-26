export const borderColor = "#CCCCCC";

export const usRedColorMaps: ReadonlyMap<number, string> = new Map([
  [-3, "#FF4747"],
  [-2, "#BD464B"],
  [-1, "#7A4550"],
  [0, "#414554"],
]);

export const blueColorMap: ReadonlyMap<number, string> = new Map([
  ...usRedColorMaps,
  [1, "#3F5587"],
  [2, "#3C6AC3"],
  [3, "#3A7FFF"],
]);

export const greenColorMap: ReadonlyMap<number, string> = new Map([
  ...usRedColorMaps,
  [1, "#34764E"],
  [2, "#309E4F"],
  [3, "#32CC5A"],
]);

export const tabsDataMap = [
  { innerText: `US(green-red)`, dataKey: `US-Green`, color: `#32CC5A` },
  { innerText: `US(blue-red)`, dataKey: `US-Blue`, color: `#3A7FFF` },
];
