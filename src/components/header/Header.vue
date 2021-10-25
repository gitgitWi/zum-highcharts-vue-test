<template>
  <header>
    <a href="https://zum-test.web.app"><h1>ZUM 국내/해외증시 MAP 테스트</h1></a>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Header",
});
</script>

<style lang="scss" scoped>
header {
  a {
    text-decoration: none;
    color: rgb(27, 82, 237);

    h1 {
      font-weight: 500;
    }

    :hover {
      font-weight: 900;

      transition-property: font-weight;
      transition-duration: 200ms;
    }
  }
}
</style>
