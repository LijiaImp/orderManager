<template>
  <div>
    <div class="dateBox">
      <div class="block">
        <span class="demonstration">时间范围</span>
        <el-date-picker
          v-model="date"
           type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin:0 20px"
        ></el-date-picker>
        <el-button type="primary" @click="searchBtn">查询</el-button>
      </div>
    </div>
    <div id="main" style="height:500px;width: 100%; "></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { orderEcharts } from "@/api/apis";
import { getDate } from "@/utils/utils";
export default {
  data() {
    return {
      date: ["2020-06-04 00:00:00", "2020-06-05 00:00:00"],
    };
  },
  methods: {
    // 封装
    echartsFn(str) {
      orderEcharts(str).then((res) => {
        // console.log(res)
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getDate(obj.orderTime);
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };
        this.myChart.setOption(option);
      });
    },
    //查询
    searchBtn() {
      let timestr = JSON.stringify([
        getDate(this.date[0]),
        getDate(this.date[1]),
      ]);
      this.echartsFn(timestr);
    },
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector("#main"));
    this. echartsFn(JSON.stringify(["2020-06-04 00:00:00", "2020-06-05 00:00:00"]))
  },

};
</script>

<style lang="less" scoped>
#main{
  // background-color: #fff;
  margin-top: 30px;
}
</style>