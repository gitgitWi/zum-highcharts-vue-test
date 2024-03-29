<template>
  <div id="chart-wrapper">
    <category-tab
      :current-category.sync="currentDataKey"
      @click-button="tabButtonClickHandler"
    />
    <loading-component v-if="isLoading" />
    <highcharts v-else id="container" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {
  dummyDataMap,
  categoryKeys,
  DataKeys,
  borderColor,
} from "@/components/highcharts/constants";
import { getChartOptions } from "@/components/highcharts/options";
import { refineSectorData } from "@/components/highcharts/utils";

import { LoadingComponent } from "@/components/loading";
import CategoryTab from "./CategoryTab.vue";

export default Vue.extend({
  name: "TreemapChart",

  components: { CategoryTab, LoadingComponent },

  data() {
    return {
      chartOptions: {},
      currentDataKey: DataKeys.KrBlueBlack,
      isLoading: true,
    };
  },

  mounted() {
    this.loadChartData();
    this.setIsLoading(false);
  },

  methods: {
    async loadChartData(): Promise<void> {
      const dataKey = this.currentDataKey as string;
      const category =
        categoryKeys.find((key) => dataKey.toLowerCase().includes(key)) ?? `ko`;

      const dataPromise =
        dummyDataMap?.[category] ??
        Promise.all([dummyDataMap.kospi, dummyDataMap.kosdaq]);

      // @ts-ignore
      const data = refineSectorData((await dataPromise).flat(), { dataKey });
      if (!data.length) return;

      this.chartOptions = getChartOptions(
        data,
        dataKey.includes("Black") ? `#000000` : borderColor
      );
      this.setDocumentTitle(dataKey);
    },

    tabButtonClickHandler(dataKey: DataKeys) {
      this.setIsLoading(true);
      this.currentDataKey = dataKey;
      this.loadChartData();
      this.setIsLoading(false);
    },

    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setDocumentTitle(title: string) {
      document.title = `금융 줌 Map ${title}`;
    },
  },
});
</script>

<style lang="scss" scoped>
#chart-wrapper {
  width: 100%;
  min-width: 600px;
  height: max-content;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;

  &::v-deep {
    .sector-label {
      font-weight: 900;

      &.black-theme {
        color: black;
      }

      &.white-theme {
        color: white;
      }
    }
  }
}

#container {
  width: 100%;
  min-width: 600px;
  height: 900px;
}
</style>
