<template>
  <section>
    <button
      v-for="({ innerText, dataKey, color }, idx) in tabsDataMap"
      :key="`category-tab-button-${idx}`"
      class="tabs"
      :style="{ backgroundColor: color }"
      @click="() => $emit(`click-button`, dataKey)"
    >
      {{ innerText }}
    </button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import { tabsDataMap } from "@/components/highcharts/constants";

export default Vue.extend({
  name: "CategoryTab",

  data() {
    return {
      tabsDataMap,
    };
  },
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 150px;
    height: 2rem;
    margin: 15px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: indianred;
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      font-size: 1.1rem;
      transition-duration: 50ms;
    }
  }
}
</style>
