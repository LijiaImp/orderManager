<template>
  <div>
  
    <div class="card">
      <el-card class="box-card">
        <div class="el-card__body">
          <div class="el-icon-document ic"></div>
          <div>
            <p >总订单</p>
            <strong >{{totalOrder}}单</strong>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="el-card__body">
          <div class="el-icon-coin ic" style="color:#D4237A"></div>
          <div>
            <p>总销售额</p>
            <strong>{{totalAmount}}元</strong>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="el-card__body">
          <div class="el-icon-s-order ic"></div>
          <div>
            <p>今日订单数</p>
            <strong>{{todayOrder}}单</strong>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="el-card__body">
          <div class="el-icon-money ic" style="color:#1AFA29"></div>
          <div>
            <p>今日销售额</p>
            <strong>{{totayAmount}}元</strong>
          </div>
        </div>
      </el-card>
    </div>
    <div id="main" style="height:400px;"></div>
  </div>
</template>

<script>
import { index } from "@/api/apis";
import echarts from "echarts";
import { numberToCurrency } from "@/utils/utils";
export default {
  data() {
    return {
      totalOrder: "",
      totalAmount: "",
      todayOrder: "",
      totayAmount: "",
      // xData:[]
    };
  },
  methods: {},

  mounted() {
    let myChart = echarts.init(document.querySelector("#main"));
    index().then((res) => {
      console.log(res.data);
      this.totalOrder = numberToCurrency(res.data.totalOrder);
      this.totalAmount = numberToCurrency(res.data.totalAmount);
      this.todayOrder = numberToCurrency(res.data.todayOrder);
      this.totayAmount = numberToCurrency(res.data.totalAmount);
      // 基于准备好的dom，初始化echarts实例

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "懒购外卖数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["总订单", "总销售额"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "总订单",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "总销售额",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>

.card {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.box-card {
  width: 20%;
  display: flex;
  .ic {
    font-size: 40px;
    color: #1296db;
  }
}
.el-card__body {
  display: flex;
  padding: 0;
  .ic {
    margin-right: 35px;
    p {
      flex-wrap: nowrap;
    }
  }
}
#main {
  margin-top: 30px;
  background-color: #fff;
  padding: 5px;
}
</style>