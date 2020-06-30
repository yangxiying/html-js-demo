<template>
  <div class="hello">
    <v-chart ref="chart1" :options="orgOptions" :auto-resize="true"></v-chart>
  </div>
</template>

<script>
import { echline } from "echarts/lib/chart/line";
export default {
  component: {
    echline
  },
  name: "HelloWorld",
  data() {
    return {
      orgOptions: {}
    };
  },
  mounted() {
    this.orgOptions = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }
      ]
    };
  }
};
</script>

<style>
</style>