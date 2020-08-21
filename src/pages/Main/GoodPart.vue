<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
      <el-button type="primary" style="margin-left: 776px;" @click="changeGood">添加分类</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="340">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
        </template>
      </el-table-column>
      <el-table-column label="是否禁用" width="340">
        <template slot-scope="scope">
          <el-switch
            :disabled="!scope.row.isedit"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="reBtn(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
          <el-button size="mini" type="danger" @click="delBtn(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total,prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
      ></el-pagination>
    </div>
    <!-- 添加分类 -->
    <div class="changeC" v-show="show==false?false:true">
      <div class="showup">
        <div class="first">
          <p>添加分类</p>
          <button @click="disBtn" class="del">×</button>
        </div>
        <p style="margin:20px 0">
          分类名称
          <el-input v-model="goodinput"></el-input>
        </p>
        <p style="margin-bottom:20px">
          是否启用
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </p>
        <p>
          <el-button type="primary" style="margin-left:100px" @click="addBtn">确认添加</el-button>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import { goodList, addGood, delGood, newType } from "../../api/apis";
export default {
  data() {
    return {
      tableData: [],
      show: false,
      value: null,
      goodinput: "",
      newrow: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      loading: true,
    };
  },

  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.GList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.GList();
    },
    //编辑 //修改
    reBtn(scope) {
      if (scope.row.isedit) {
        //改变数据
        scope.row.isedit = false;

        newType(scope.row.id, scope.row.cateName, scope.row.state).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "懒购系统提示:商品分类修改成功!",
                type: "success",
              });
            } else {
              this.$message({
                message: "懒购系统提示:商品分类修改失败!请稍后再试",
                type: "error",
              });
            }
          }
        );
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },

    //关掉修改添加分类模块
    disBtn() {
      this.show = false;
    },
    //添加分类
    changeGood() {
      this.show = true;
    },
    //添加分类
    addBtn() {
      // console.log(this.value)
      addGood(this.goodinput, this.value).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "商品分类添加成功!",
            type: "success",
          });
          this.goodinput = "";
          this.GList();
        } else {
          this.$message({
            message: "商品分类添加失败!请稍后再试",
            type: "error",
          });
        }
      });
       this.show = false;
    },
    //删除
    delBtn(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGood(row.id).then((res) => {
            if (res.data.code == 0) {
              this.tableData.splice(index, 1);
              this.$message({
                message: "删除成功!",
                type: "success",
              });
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
    //获取列表
    GList() {
      goodList(this.currentPage, this.pageSize).then((res) => {
        // console.log(res.data.data[0].account,res.data.data[0].userGroup,res.data.data[0].ctime)
        //遍历数据

        let arr = res.data.data; //account,userGroup,ctime
        for (let obj of arr) {
          obj.isedit = false; //此对象数据是否在编辑状态
          obj.state = obj.state == 1;
        }
        this.tableData = arr;
        this.total = res.data.total;
         this.loading = false;
      });
    },

    // //index
    //  indexMethod(index) {
    //     return index ++;
    //   }
  },
  created() {
    this.loading = true;
    this.GList();
   
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