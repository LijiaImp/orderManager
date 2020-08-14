<template>
  <div id="loginDiv">
    <div class="box">
      <div class="logoBox">
        <div class="logo">
          <img src="../assets/images/logo.png" alt />
        </div>
        <h3>懒购外卖管理系统</h3>
      </div>
      <div class="loginBox">
        <el-input prefix-icon="el-icon-user-solid" v-model="acc" placeholder="请输入用户名"></el-input>
        <el-input prefix-icon="el-icon-lock" show-password v-model="pwd" placeholder="请输入密码"></el-input>
        <p class="error-p">{{msg}}</p>
        <el-button type="primary" style="width:100%;height:30px;padding:0" @click="loginBtn">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      msg: "", //提示
    };
  },
  methods: {
    loginBtn() {
      login(this.acc, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.token = res.data.token; //写入token
          localStorage.role = res.data.role; //写入用户组
          localStorage.acc = this.acc; //存入用户名
          localStorage.id = res.data.id; //存入id
          this.$router.push("/Main/Index");
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
        } else this.msg = res.data.msg;
      });
    },
  },
  created() {
    document.onkeydown = (e) => {
      e = window.event || e;
      // console.log(e.code);
      if (
        this.$route.path == "/" &&
        (e.code == "Enter" || e.code == "enter" || e.code == "NumpadEnter")
      ) {
        this.loginBtn();
      }
    };
  },
};
</script>

<style lang="less" scoped>
#loginDiv {
  width: 100%;
  height: 100%;
  background: url(../assets/images/bg.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  .error-p {
    font-size: 13px;
    color: brown;
    margin-bottom: 20px;
  }
  .box {
    width: 480px;
    // height: 370px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    .logoBox {
      width: 45%;
      // background-color: #003366;
      text-align: center;
      height: 233px;
      display: flex;
      flex-direction: column;
      // justify-content: space-ar;
      // align-items: center;
      //  height: 100%;
      .logo {
        margin-top: 30px;
        img {
          width: 75px;
          height: 75px;
        }
      }
      h3 {
        color: #fff;
        font-size: 20px;
        text-align: center;
        font-family: "楷体";
        margin-top: 10px;
      }
    }
    .loginBox {
      width: 47%;
      padding: 40px 20px;
      // height: 100%;
      background-color: #fff;
      /deep/.el-input {
        // border: 0;
        border-bottom: 1px solid #dcdfe6;
        margin-top: 10px;
        /deep/input {
          border: 0;
        }
      }
    }
  }
  // .logo {
  //   position: fixed;
  //   top: 10px;
  //   left: 10px;
  //   width: 100px;
  //   height: 100px;
  //
  // }
  // h1 {
  //   font-size: 50px;
  //   color: #000;
  //   font-weight: normal;
  //   font-family: "楷体";
  //   text-indent: 65px;
  // }
  // .loginBox {
  //   width: 300px;
  //   height: 300px;
  //   padding: 10px;
  //   h3 {
  //     color: #fff;
  //     font-size: 24px;
  //     text-align: center;
  //     font-family: "楷体";
  //   }

  // }
}
</style>