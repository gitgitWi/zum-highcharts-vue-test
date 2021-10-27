import { UnknownObject, ZumDomesticStock } from "../../types";
import { range } from "../../utils";

import { Fetcher } from "./fetcher";

export class ZumFetcher extends Fetcher {
  constructor() {
    super(`https://finance.zum.com/api`);
  }

  private getLogoSrc(stockCode: string): string {
    return `https://s3.ap-northeast-2.amazonaws.com/alphasquare-s3/static/images/company_logos/${stockCode}.png`;
  }

  static async searchStockCodes(
    stockNames: string[]
  ): Promise<UnknownObject[]> {
    const _this = new ZumFetcher();
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
          _this.fetcher
            .get(`https://finance.zum.com/api/suggest`, {
              params: { query: stockName },
            })
            .then(
              ({ data }) =>
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
    const _this = new ZumFetcher();
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
              logo: _this.getLogoSrc(stockCode),
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
