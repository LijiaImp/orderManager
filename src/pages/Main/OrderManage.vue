<template>
  <div class="content">
    <div style="  margin-bottom: 40px; padding-top:20px;  padding-left: 15px;" class="divbox">
      <span>订单号&nbsp;</span>
      <el-input v-model="orderNo" placeholder="订单号" class="input_height"></el-input>

      <span>收货人&nbsp;</span>
      <el-input v-model="consignee" placeholder="收货人" class="input_height"></el-input>

      <span>手机号&nbsp;</span>
      <el-input v-model="phone" placeholder="手机号" class="input_height"></el-input>

      <span>订单状态</span>
      <el-select v-model="orderState" placeholder="请选择" class="input_height">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <br />
      <div class="block" style="margin-top:20px">
        <span class="demonstration">选择时间&emsp;</span>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" style="margin-left:20px" @click="checkBtn">查询</el-button>
      </div>
    </div>
    <div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        border
        style="width: 100%;"
      >
        <el-table-column fixed prop="orderNo" label="订单号">
          <template slot-scope="scope">
            <span>{{scope.row.orderNo}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="210">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.orderTime}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.orderTime" />
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.phone}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.phone" />
          </template>
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="150">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.consignee}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.consignee" />
          </template>
        </el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="180">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.deliverAddress}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.deliverAddress" />
          </template>
        </el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="210">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.deliveryTime}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.deliveryTime" />
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="150">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.remarks}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.remarks" />
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="金额" width="130">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.orderAmount}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.orderAmount" />
          </template>
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="150">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.orderState}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.orderState" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              type="text"
              size="small"
              @click="reBtn(scope)"
            >{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <div class="changeC" v-show="show==false?false:true">
      <div class="showup">
        <div class="first">
          <p>订单详情</p>
          <button @click="disBtn" class="del">×</button>
        </div>
        <p style="margin:10px 0">
          <b>订单号：</b>
          <span>{{ord.orderNo}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>下单时间：</b>
          <span>{{ord.orderTime}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>联系电话：</b>
          <span>{{ord.phone}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>收货人：</b>
          <span>{{ord.consignee}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>送货地址：</b>
          <span>{{ord.deliverAddress}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>送达时间：</b>
          <span>{{ord.deliveryTime}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>备注：</b>
          <span>{{ord.remarks}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>订单金额：</b>
          <span>{{ord.orderAmount}}</span>
        </p>
        <p style="margin-bottom:10px">
          <b>订单状态：</b>
          <span>{{ord.orderState}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ordList, ordMsg, ordMod } from "@/api/apis";
import { getDate } from "@/utils/utils";
export default {
  data() {
    return {
      options: [
        {
          value: "",
          label: "",
        },
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
      ],
      tableData: [],

      //查询数据
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //手机号
      orderState: "", //订单状态
      date: null,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      show: false,
      loading: true,
      ord: {
        orderNo: "",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: "",
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.listOrder();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.listOrder(this.paramsex);
    },
    //获取列表
    listOrder(paramsex) {
      ordList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        let arr = res.data.data; //account,userGroup,ctime
        for (let obj of arr) {
          obj.orderTime = getDate(obj.orderTime);
          obj.deliveryTime = getDate(obj.deliveryTime);
          obj.isedit = false;
        }
        this.tableData = arr;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    //查询
    checkBtn() {
      // console.log(this.currentPage, this.pageSize,this.orderInput,this.perInput,this.phoneInput,JSON.stringify(this.value1),this.value)
      // ordOne(
      //   this.currentPage,
      //   this.pageSize,
      //   this.orderInput,
      //   this.perInput,
      //   this.phoneInput,
      //   this.value
      // ).then((res) => {
      //   let arr = res.data.data; //account,userGroup,ctime
      //   for (let obj of arr) {
      //     obj.orderTime = getDate(obj.orderTime);
      //     obj.deliveryTime = getDate(obj.deliveryTime);
      //   }
      //   this.tableData = arr;
      //   this.total = res.data.total;
      // });

      let { orderNo, consignee, phone, orderState } = this;
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "") paramsex.orderState = orderState;
      if (this.date) {
        paramsex.date = JSON.stringify([
          getDate(this.date[0]),
          getDate(this.date[1]),
        ]);
      }


      this.paramsex = paramsex;

      this.listOrder(this.paramsex);
      // console.log(this.value1)
    },
    //查看
    handleClick(row) {
      this.show = true;
      ordMsg(row.id).then((res) => {
        res.data.data.orderTime = getDate(res.data.data.orderTime);
        res.data.data.deliveryTime = getDate(res.data.data.deliveryTime);
        this.ord = res.data.data;
      });
    },
    // 关闭查看窗口
    disBtn() {
      this.show = false;
    },
    //编辑 //修改
    reBtn(scope) {
      if (scope.row.isedit) {
        //改变数据
        scope.row.isedit = false;
        ordMod(scope.row).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "懒购系统提示:订单修改成功!",
              type: "success",
            });
          } else {
            this.$message({
              message: "懒购系统提示:订单修改失败!请稍后再试",
              type: "error",
            });
          }
        });
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },
  },
  //渲染表格
  created() {
    this.loading = true;

    this.listOrder();
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
}
.divbox {
  .el-input {
    width: 16%;
    margin-right: 20px;
  }
}
.changeC {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  .first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
    p {
      font-size: 16px;
    }
  }
  .el-input {
    width: 74%;
  }
  .showup {
    padding: 0 15px;
    padding-bottom: 20px;
    background-color: #fff;
    width: 500px;
  }
  .del {
    /* border: 1px solid #000; */
    outline: 0;
    border: 0;
    background-color: transparent;
    font-size: 16px;
    padding: 0;
  }
  .del:hover {
    color: lightsalmon;
  }
  b {
    display: inline-block;
    width: 60px;
  }
}
</style>