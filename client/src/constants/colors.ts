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

export const colorMapReg = /(blue|green)/i;
