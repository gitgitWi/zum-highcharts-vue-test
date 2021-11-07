<template>
  <section>
    <h2>D3 TreemapChart</h2>
    <svg id="d3-chart" ref="svg" :width="size.w" :height="size.h">
      <g v-for="(node, idx) in nodes" :key="`treemap-leaf-rect-${idx}`">
        <rect
          :id="`treemap-leaf-node-${idx}`"
          :x="node.x0"
          :y="node.y0"
          :width="node.x1 - node.x0"
          :height="node.y1 - node.y0"
          :style="{
            fill: !node.children && getNodeColor(node.data.gains),
          }"
        ></rect>
        <clipPath :id="`treemap-leaf-clip-${idx}`">
          <use :href="getHashUrl('node', idx)" />
        </clipPath>

        <text
          v-if="node.children"
          :clip-path="`url(${getHashUrl('clip', idx)})`"
          :style="{
            fontSize: 10,
            fill: 'grey',
          }"
          :x="node.x0 + 5"
          :y="node.y0 + 12"
        >
          <tspan>
            {{ node.data.name }}
          </tspan>
          <tspan dx="3">
            {{ format(",d")(node.value) }}
          </tspan>
        </text>

        <text
          v-else
          :clip-path="`url(${getHashUrl('clip', idx)})`"
          :style="{
            fontSize: 10,
            fill: 'white',
          }"
          :x="node.x0 + 5"
          :y="node.y0 + 12"
        >
          <tspan>
            {{ node.data.name }}
          </tspan>
          <tspan :x="node.x0 + 5" dy="12">
            {{ format(",d")(node.data.marketCap) }}
          </tspan>
          <tspan>{{ node.data.gains.toFixed(2) }} %</tspan>
        </text>
      </g>
    </svg>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import {
  format,
  hierarchy,
  select,
  treemap,
  treemapBinary,
  treemapSquarify,
  zoom,
} from "d3";

import { krBlueColorMap } from "@/constants";
import { getStockColor } from "@/utils";

import { getRootData } from "./utils";

export default Vue.extend({
  name: "D3TreemapChart",

  data() {
    return {
      size: {
        w: 1200,
        h: 600,
      },
      nodes: [],
    };
  },

  async mounted() {
    // @ts-ignore
    this.nodes = await this.getNodes();
    this.setZoom();
  },

  methods: {
    getData() {
      return import("../../assets/us-dummy.json");
    },

    async getNodes() {
      const apiData = getRootData(await this.getData());

      const root = hierarchy(apiData, (d) => d.children)
        .sum((d) => d.value as number)
        // @ts-ignore
        .sort((a, b) => b.value - a.value);

      // compute layout
      return treemap()
        .size([this.size.w, this.size.h])
        .tile(treemapSquarify)

        .paddingOuter(10)
        .paddingInner(5)
        .paddingTop(23)
        .round(true)(root);
    },

    getHashUrl(type: string, idx: string) {
      // @ts-ignore
      return new URL(`#treemap-leaf-${type}-${idx}`, location).href;
    },

    format,

    getNodeColor(gains: number) {
      return getStockColor(krBlueColorMap)(gains);
    },

    setZoom() {
      const svg = select(this.$refs.svg as Element);

      svg.call(
        zoom()
          .extent([
            [0, 0],
            [this.size.w, this.size.h],
          ])
          .scaleExtent([1, 6])
          .on("zoom", ({ transform }) => {
            svg.selectAll("g").attr("transform", transform);
          })
      );
    },
  },
});
</script>

<style lang="scss" scoped>
#d3-chart {
  box-shadow: 0 0 5px 2px lightgray;

  g {
    fill: black;
  }

  rect {
    cursor: pointer;
    stroke: grey;

    &:hover {
      fill: rgba(blanchedalmond, 0.7);
    }
  }

  text {
    font-size: 1em;

    tspan {
      white-space: inherit;
    }
  }
}
</style>
