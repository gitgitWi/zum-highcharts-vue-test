import {
  MAX_GAINS,
  MIN_GAINS,
  usBlueColorMap,
  usGreenColorMap,
  colorMapReg,
} from "@/constants";
import { ceil, floor } from "@/utils";

export const getColorMap = (dataKey: string): ReadonlyMap<number, string> =>
  dataKey.match(colorMapReg)?.[0].toLowerCase() === "blue"
    ? usBlueColorMap
    : usGreenColorMap;

export const getStockColor =
  (colorMap = usBlueColorMap) =>
  (gains: number): string => {
    /**
     * @description
     * 계산하기 쉽게 2배수를 floor해서 비교
     */
    let parseGains: number;

    if (gains >= 0) {
      parseGains = gains >= 3 ? MAX_GAINS : ceil(gains * 2);
    } else {
      parseGains = gains <= -3 ? MIN_GAINS : floor(gains * 2);
    }

    return colorMap.get(parseGains * 0.5) as string;
  };
