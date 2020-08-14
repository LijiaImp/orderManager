<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>管理员信息</span>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" width="120"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="300"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="changeAcc(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delBtn(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :page-sizes="[5,10,15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <p>
      <el-button type="danger" @click="delAll">批量删除</el-button>
      <el-button type="primary">取消选择</el-button>
    </p>

    <div class="changeC" v-show="show==false?false:true">
      <div class="showup">
        <div class="first">
          <p>修改账号</p>
          <button @click="disBtn" class="del">×</button>
        </div>
        <p style="margin:20px 0">
          <span style="display:inline-block;width:56px;text-align: right;margin-right:5px">账号</span>
          <el-input v-model="newobj.account"></el-input>
        </p>
        <p style="margin-bottom:20px">
          <span style="display:inline-block;width:56px;text-align: right;margin-right:5px">用户分组</span>
          <!-- <el-input v-model="groupinput"></el-input> -->
          <el-select v-model="newobj.userGroup" style="margin-left:10px;z-index:2000">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          <el-button type="primary" @click="changeBtn" style="margin-left:100px">修改</el-button>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import { accList, delAcc, delAll, changeAcc } from "../../api/apis";
import { getDate } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [],
      arr: [],
      idarr: [],
      newobj: {},
      show: false,
      total: 0,
      currentPage: 1,
      pagesize: 5,
      options: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
      ],
      loading: true,
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.changeList();
    }, 1000);
  },
  methods: {
    handleSelectionChange(val) {
      this.idarr = val.map((item) => item.id);
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.changeList();
    },
    handleCurrentChange(newpage) {
      // console.log(`当前页: ${val}`);
      this.currentPage = newpage;
      this.changeList();
    },
    //获取列表函数
    changeList() {
      accList(this.currentPage, this.pagesize).then((res) => {
        // console.log(res.data.data[0].account,res.data.data[0].userGroup,res.data.data[0].ctime)
        //遍历数据
        let arr = res.data.data; //主要是处理日期
        for (let obj of arr) {
          obj.ctime = getDate(obj.ctime);
        }
        this.tableData = arr; //account,userGroup,ctime
        this.total = res.data.total;
        this.loading = false;
      });
    },
    //单条删除
    delBtn(index) {
      this.$confirm("是否删除该条数据", "懒购系统提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delAcc(this.tableData[index].id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "账号删除成功!",
                type: "success",
              });
              this.changeList();
            } else {
              this.$message({
                message: "账号删除失败!请稍后再试",
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    delAll() {
      // console.log(this.idarr);
      let str = JSON.stringify(this.idarr);
      this.$confirm("是否删除这些条数据", "懒购系统提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delAll(str).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.changeList();
            } else {
              this.$message({
                message: "删除失败!请稍后再试",
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑
    changeAcc(row) {
      this.show = true;
      this.newobj = { ...row };
      console.log(this.newobj);
    },
    //关掉修改账号模块
    disBtn() {
      this.show = false;
    },
    //修改账号
    changeBtn() {
      // console.log(this.tableData[curIndex]);
      // delete this.newobj.ctime;
      // delete this.newobj.imgUrl;
      changeAcc(this.newobj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "账号修改成功!",
            type: "success",
          });
          this.changeList();
          this.show = false;
        } else {
          this.$message({
            message: "账号修改失败!请稍后再试",
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.block {
  margin: 20px 0;
}
.changeC {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
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
    background-color: #fff;
    width: 400px;
    height: 270px;
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
}
</style>