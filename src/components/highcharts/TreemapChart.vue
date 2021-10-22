<template>
  <div id="chart-wrapper">
    <highcharts
      id="container"
      :options="chartOptions"
      :deep-copy-on-update="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import usDummy from "$assets/us-dummy.json";

import { TreemapSector } from "@/components/highcharts/types";
import { getChartOptions } from "@/components/highcharts/options";
import { getStockColor, refineSectorData } from "@/components/highcharts/utils";

const { random } = Math;

export default Vue.extend({
  name: "TreemapChart",

  data(): Record<string, unknown> {
    return {
      chartOptions: {},
    };
  },

  async mounted(): Promise<void> {
    this.loadChartData();
  },

  methods: {
    async loadChartData(): Promise<void> {
      const data = this._refiner(usDummy.sectors as TreemapSector[]);
      this.chartOptions = getChartOptions(data);
    },

    /**
     * @description
     * value: 각 영역의 크기
     * colorValue: 각 영역의 색상값
     * parent: treemap의 parent id
     */
    _refiner(sectors: TreemapSector[]): Record<string, string | number>[] {
      const points = [] as Record<string, string | number>[];

      sectors.forEach(({ name: sectorName, stocks }, sectorId) => {
        const value = stocks.reduce(
          (acc, { name: stockName, marketCap }, stockId) => {
            const gains = random() * 5 * (random() < 0.5 ? -1 : +1);
            const gainsColor =
              gains > 0 ? "blue" : gains === 0 ? "grey" : "red";
            const gainsFixed = gains.toFixed(2);

            points.push({
              id: `${sectorId}_${stockId}`,
              name: `<span>${stockName}</span><br /><span style="color: ${gainsColor}; text-shadow: 0 0 3px grey; font-size: 0.8em">${gainsFixed.toLocaleString()}%</span>`,
              // name: stockName,
              value: marketCap,
              parent: `${sectorId}`,
              color: getStockColor(gains),
              gains: `${gainsFixed}%`,
            });
            return (acc += marketCap);
          },
          0
        );

        points.push({
          id: `${sectorId}`,
          value,
          name: sectorName,
        });
      });
      return points;
    },
  },
});
</script>

<style lang="scss" scoped>
#chart-wrapper {
  width: 100%;
  min-width: 600px;
  max-width: 1800px;
  height: max-content;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
}

#container {
  width: 100%;
  max-width: 1600px;
  height: 900px;
}
</style>
