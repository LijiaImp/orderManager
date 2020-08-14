<template>
  <div>
    <div class="money">
      <div class="moenyBox">
        <img src="../../assets/images/order_icon.png" alt />
        <div>
          <span style="margin:6px 0; display:inline-block">总订单</span>
          <p>{{totalOrder}}单</p>
        </div>
      </div>
      <div class="moenyBox">
        <img src="../../assets/images/money_icon.png" alt />
        <div>
          <span style="margin:6px 0; display:inline-block">总金额</span>
          <p>{{totalAmount}}元</p>
        </div>
      </div>
      <div class="moenyBox">
        <img src="../../assets/images/today_order_icon.png" alt />
        <div>
          <span style="margin:6px 0; display:inline-block">今日订单</span>
          <p>{{todayOrder}}单</p>
        </div>
      </div>
      <div class="moenyBox">
        <img src="../../assets/images/today_money_icon.png" alt />
        <div>
          <span style="margin:6px 0; display:inline-block">今日金额</span>
          <p>{{totayAmount}}元</p>
        </div>
      </div>
    </div>
    <div id="main" style="height:400px;"></div>
  </div>
</template>

<script>
import { index } from "@/api/apis";
import echarts from "echarts";
import {numberToCurrency} from '@/utils/utils';
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
      this.totalOrder =numberToCurrency(res.data.totalOrder) ;
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
.money {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .moenyBox {
    width: 18%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 36px;
    text-align: center;
    font-size: 18px;
    span {
      color: #ccc;
    }
  }
}

#main {
  margin-top: 30px;
  background-color: #fff;
  padding: 5px;
}
</style>