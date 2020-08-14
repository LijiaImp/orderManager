<template>
  <div class="content">
    <h3>添加账号</h3>
    <div style="margin-top:25px;margin-left:20px">
      <p>
        <span>账号</span>
        <el-input style="margin-left:10px" v-model="accVal"></el-input>
      </p>
      <p>
        <span>密码</span>
        <el-input style="margin-left:10px" v-model="accpwdVal"></el-input>
      </p>
      <p>
        <span>用户分组</span>
        <el-select clearable v-model="value" style="margin-left:10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
      <p>
        <el-button type="primary" style="margin-left: 60px;" @click="addBtn">添加</el-button>
        <el-button @click="reBtn">重置</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { userAdd } from "../../api/apis";
export default {
  data() {
    return {
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
      value: "",
      accVal: "",
      accpwdVal: "",
      msg: "",
     
    };
  },
  methods: {
    reBtn() {
      this.value = "";
      this.accVal = "";
      this.accpwdVal = "";
    },
    addBtn() {
      userAdd(this.accVal, this.accpwdVal, this.value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "账号添加成功!",
            type: "success",
          });
          this.value = "";
          this.accVal = "";
          this.accpwdVal = "";
        } else {
          this.$message({
            message: "账号添加失败!请稍后再试",
            type: "success",
          });
        }
      });
    },
   
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  width: 100%;
  padding-bottom: 20px;
  h3 {
    padding: 10px 0;
    text-indent: 10px;
    border-bottom: 1px solid #f4f4f4;
    font-size: 16px;
    font-weight: normal;
  }
  .el-input {
    width: 28%;
  }
  input {
    height: 30px !important;
    line-height: 30px !important;
  }
  p {
    margin-bottom: 20px;
    .el-textarea {
      width: 36%;
    }
    span {
      text-align: right;
      display: inline-block;
      width: 50px;
    }
  }
}

</style>