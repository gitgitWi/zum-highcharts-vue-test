<template>
  <section>
    <button
      v-for="({ innerText, dataKey, className }, idx) in tabsDataMap"
      :key="`category-tab-button-${idx}`"
      :class="className"
      @click="() => $emit(`click-button`, dataKey)"
    >
      <input
        :id="dataKey"
        type="radio"
        name="tab-select"
        :checked="dataKey.includes(currentCategory)"
      />
      <label :for="dataKey">
        {{ innerText }}
      </label>
    </button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import { tabsDataMap } from "@/components/highcharts/constants";

export default Vue.extend({
  name: "CategoryTab",

  props: {
    currentCategory: { type: String, required: true },
  },

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
    width: 200px;
    height: 2rem;
    margin: 15px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: indianred;
    color: white;
    text-shadow: 0 0 2px whitesmoke;
    font-size: 1rem;
    font-weight: 300;

    &:hover {
      font-size: 1.1rem;
      transition-duration: 50ms;
    }

    input[type="radio"] {
      appearance: none;

      &:checked + label {
        font-size: 1.1rem;
        font-weight: 900;
        font-style: italic;
        text-decoration: underline;
      }
    }

    &,
    input,
    label {
      cursor: pointer;
    }

    &.red-blue {
      background: linear-gradient(
        90deg,
        rgba(246, 53, 56, 1) 0%,
        rgba(65, 69, 84, 1) 50%,
        rgba(58, 127, 255, 1) 100%
      );
    }

    &.green-red {
      background: linear-gradient(
        90deg,
        rgba(50, 204, 90, 1) 0%,
        rgba(246, 53, 56, 1) 100%,
        rgba(64, 69, 84, 1) 50%
      );
    }

    &.blue-red {
      background: linear-gradient(
        90deg,
        rgba(58, 127, 255, 1) 0%,
        rgba(65, 69, 84, 1) 50%,
        rgba(246, 53, 56, 1) 100%
      );
    }
  }
}
</style>
