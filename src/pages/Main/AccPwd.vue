<template>
  <el-card class="content box-card">
    <h3>修改密码</h3>
    <div style="margin-top:25px;margin-left:20px">
      <p>
        <span>旧密码</span>
        <el-input style="margin-left:10px" v-model="oldpwd" @blur="blurPwd" show-password></el-input>
        <span class="error-p">{{msg}}</span>
      </p>
      <p>
        <span>新密码</span>
        <el-input style="margin-left:10px" v-model="newpwd" show-password></el-input>
      </p>
      <p>
        <span>确认新密码</span>
        <el-input style="margin-left:10px" v-model="repwd" show-password @blur="rePwd"></el-input>
        <span class="error-p">{{msg1}}</span>
      </p>
      <p>
        <el-button type="primary" style="margin-left: 60px;" @click="newBtn">修改</el-button>
        <el-button @click="delBtn">重置</el-button>
      </p>
    </div>
  </el-card>
</template>

<script>
import { oldPwd, newPwd } from "../../api/apis";
export default {
  data() {
    return {
      value: "",
      oldpwd: "",
      newpwd: "",
      repwd: "",
      msg: "",
      msg1: "",
    };
  },
  methods: {
    delBtn() {
      this.newpwd = "";
      this.repwd = "";
      this.oldpwd = "";
    },
    //旧密码失焦
    blurPwd() {
      if (this.oldpwd == "") return false;
      var id = localStorage.getItem("id");
      // console.log(id)
      oldPwd(id, this.oldpwd).then((res) => {
        if (res.data.code != 0) {
          this.msg = res.data.msg;
        } else this.msg = "";
      });
    },
    //确认密码失焦
    rePwd() {
      if (this.repwd == "" || this.repwd != this.newpwd) {
        this.msg1 = "两次密码不一致，请重新输入";
      } else {
        this.msg1 = "";
      }
    },
    // 修改密码
    newBtn() {
      var id = localStorage.getItem("id");
      newPwd(id, this.newpwd).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "账号密码修改成功!请重新登录",
            type: "success",
          });
          this.newpwd = "";
          this.repwd = "";
          this.oldpwd = "";
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
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
    > span:first-of-type {
      text-align: right;
      display: inline-block;
      width: 65px;
    }
  }
}
.error-p {
  font-size: 13px;
  color: brown;
  // margin-bottom: 2px;
}
</style>