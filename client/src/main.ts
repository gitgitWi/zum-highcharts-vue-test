import Vue from "vue";
import { HighchartsVue } from "@/components/highcharts";
import App from "./App.vue";
import { router } from "@/router";

Vue.config.productionTip = false;
Vue.use(HighchartsVue);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
