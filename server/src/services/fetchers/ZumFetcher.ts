import { UnknownObject, ZumDomesticStock } from "../../types";
import { range } from "../../utils";

import { Fetcher } from "./fetcher";

interface SectorData {
  id: string;
  name: string;
  ratio: number;
  sectorIds: number[];
}

export class ZumFetcher extends Fetcher {
  /**
   * 코스피/코스닥 산업/섹터 id -> 트리맵전용 id로 역매핑
   * @param sectors
   * @returns
   */
  static reverseSectorIdMap(sectors: SectorData[]): {
    [sectorId: string]: string;
  } {
    return sectors.reduce((acc, { id, sectorIds }) => {
      sectorIds.forEach(
        (sectorId) =>
          // @ts-ignore
          (acc[sectorId] = id)
      );
      return acc;
    }, {});
  }

  static async searchStockCodes(
    stockNames: string[]
  ): Promise<UnknownObject[]> {
    const results: UnknownObject[] = [];
    const oneTime = 5;
    const interval = Math.floor(stockNames.length / oneTime);

    try {
      for (const idx of range(interval)) {
        const currentNames = stockNames.slice(
          idx * oneTime,
          (idx + 1) * oneTime
        );

        const requests = currentNames.map((stockName) =>
          ZumFetcher.fetcher
            .get(`https://finance.zum.com/api/suggest`, {
              params: { query: stockName },
            })
            .then(
              ({ data }) =>
                // @ts-ignore
                (data?.stock as UnknownObject[])?.filter(
                  ({ name }) => name === stockName
                )[0]
            )
        );
        const oneTimeResults = await Promise.all(requests);

        results.push(
          ...oneTimeResults.map(({ code, name }) => ({
            stockName: name,
            stockCode: code,
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }

    return results;
  }

  static async getStockData(stockCodes: string[]): Promise<UnknownObject[]> {
    const _this = ZumFetcher;
    const results: UnknownObject[] = [];
    const oneTime = 5;
    const interval = Math.floor(stockCodes.length / oneTime);

    try {
      for await (const idx of range(interval)) {
        const currentCodes = stockCodes.slice(
          idx * oneTime,
          (idx + 1) * oneTime
        );

        const requests = currentCodes.map((stockCode) =>
          _this.fetcher
            .get(`${_this.baseUrl}/domestic/stock/${stockCode}`)
            .then(({ data }) => data)
        );

        const oneTimeResults = (await Promise.all(
          requests
        )) as ZumDomesticStock[];

        results.push(
          ...oneTimeResults.map(
            ({
              price: {
                detail: {
                  id: stockCode,
                  name: stockName,
                  currentPrice,
                  marketCap,
                  priceChange,
                  rateOfChange,
                },
              },
              additionalInfo: {
                industry: { id: sectorId, name: sectorName },
              },
            }) => ({
              stockCode,
              stockName,
              currentPrice,
              marketCap,
              priceChange,
              rateOfChange,
              sector: { id: sectorId, name: sectorName },
            })
          )
        );

        _this.sleep(500);
      }
    } catch (error) {
      console.error(error);
    }
    return results;
  }
}
