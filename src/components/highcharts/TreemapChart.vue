<template>
  <div id="chart-wrapper">
    <highcharts :ref="treemap" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Highcharts } from "./HighCharts";
import { getChartOptions } from "./options";

export default Vue.extend({
  name: "TreemapChart",

  components: {
    Highcharts,
  },

  data(): Record<string, unknown> {
    return {
      chartOptions: {},
      marketData: {},
    };
  },

  mounted(): void {
    this.cronFetchChartData();
  },

  methods: {
    getChartOptions,

    async loadChartData(): Promise<void> {
      console.info(`__loadChartData__`);
      // this.chartOptions = this.getChartOptions([]);
    },

    cronFetchChartData(): void {
      setTimeout(this.loadChartData, 15_000);
    },
  },
});
</script>

<style>
#chart-wrapper {
  width: 100%;
  min-width: 600px;
  height: max-content;
  max-height: 600px;
}
</style>
