import axios, { AxiosInstance } from "axios";

export class Fetcher {
  protected fetcher: AxiosInstance = axios.create({});

  constructor(protected baseUrl: string, protected token?: string) {}

  protected setFetcher(): void {
    this.fetcher = axios.create({
      baseURL: this.baseUrl,
      params: this.token ? { token: this.token } : {},
    });
  }

  protected sleep(ms = 500): void {
    const date = Date.now();
    let currentDate = Date.now();
    while (currentDate - date < ms) {
      currentDate = Date.now();
    }
  }
}
