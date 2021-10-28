import axios, { AxiosInstance } from "axios";

export class Fetcher {
  static baseUrl: string;
  static token?: string | undefined;
  static fetcher: AxiosInstance = axios.create({});

  static setFetcher(baseUrl: string, token?: string): void {
    this.baseUrl = baseUrl;
    this.token = token;
    this.fetcher = axios.create({
      baseURL: baseUrl,
      params: token ? { token } : {},
    });
  }

  static sleep(ms = 500): void {
    const date = Date.now();
    let currentDate = Date.now();
    while (currentDate - date < ms) {
      currentDate = Date.now();
    }
  }
}
