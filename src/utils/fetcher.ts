import axios, { AxiosInstance } from "axios";
import { API_TOKEN } from "../configs";
import { BASE_URL } from "./constants";

export class Fetcher {
  private fetcher: AxiosInstance | undefined;

  constructor(baseUrl: string = BASE_URL) {
    this.setFetcher(baseUrl);
  }

  private setFetcher(baseURL: string) {
    this.fetcher = axios.create({
      baseURL,
      params: {
        token: API_TOKEN,
      },
    });
  }

  private getData(url: string, params?: Record<string, unknown>) {
    return this.fetcher?.get(url, { params }).then(({ data, status }) => ({
      data,
      status,
    }));
  }

  getDataArrayWithInterval(
    path: string,
    stockNames: string[]
    // interval = 500
    // options?: Record<string, string>
  ): Promise<any[]> {
    const parseItem = ({
      data: { ticker, finnhubIndustry, logo, marketCapitalization },
    }: Record<string, any>): Record<string, unknown> => ({
      name: ticker,
      sectorId: finnhubIndustry,
      logoSrc: logo,
      marketCap: marketCapitalization,
    });

    return Promise.all(
      stockNames.map((stockName) =>
        this.getData(path, { symbol: stockName })
          ?.then(parseItem)
          .catch((err) => {
            throw new Error(err);
          })
      )
    );
  }
}
