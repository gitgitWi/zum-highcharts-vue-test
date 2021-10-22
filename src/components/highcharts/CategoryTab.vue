<template>
  <section>
    <div class="tabs">
      <span>US(blue-red)</span>
    </div>
    <div>
      <span>US(green-red)</span>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CategoryTab",
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .tabs {
    padding: 0 15px;
  }
}
</style>
