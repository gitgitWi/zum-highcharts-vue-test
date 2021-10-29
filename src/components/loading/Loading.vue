<template>
  <section>데이터를 가져오는 중입니다...!!</section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "LoadingComponent",
});
</script>

<style lang="scss" scoped>
section {
  box-sizing: border-box;
  width: 75vw;
  max-width: 1200px;
  height: 40vh;
  max-height: 1200px;
  margin: 15px;

  display: grid;
  place-content: center;

  color: rgba(255, 255, 255, 0.9);
  font-weight: 900;
  font-style: italic;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.8)
  );
  background-size: 500% 500%;
  border-radius: 15px;
  animation: gradient 4s ease-in-out infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
