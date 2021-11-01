// import {
//   getLogoHtml,
//   getStockGainHtml,
//   getStockNameHtml,
// } from "@/components/highcharts/utils";
import { CommonMapOptionBuilder } from "./CommonOptionBuilder";

// const { MAX_SAFE_INTEGER } = Number;

export class KrMapOptionBuilder extends CommonMapOptionBuilder {
  constructor() {
    super();
    this.initKrMapOptions();
  }

  private initKrMapOptions() {
    this.setCommonOptions();
  }
}
