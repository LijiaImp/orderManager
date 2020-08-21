<template>
  <el-container class="elC">
    <el-header>
      <div class="headerTitle">
        <img src="../assets/images/logo.png" alt />
        <h1>懒购外卖后台管理系统</h1>
      </div>
      <div class="headerImg">
        你好，欢迎
        <el-dropdown style="margin-left:5px;color:#fff">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/Main/Personal" style="text-decoration:none">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="delBtn()">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-avatar>
          <img :src="imgUrl" alt />
        </el-avatar>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="curHash"
          class="el-menu-vertical-demo h"
          background-color="#336699"
          text-color="#fff"
          active-text-color="#FFFFCC"
          router
          unique-opened
        >
          <div v-for="item in roleArr" :key="item.url">
            <el-menu-item :index="item.url" v-if="!item.children">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

            <el-submenu :index="item.url" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.url"
                :index="child.url"
              >{{child.name}}</el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <!-- 二级路由 -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs">
          <el-breadcrumb-item v-for="item in breadlist" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { istoken, per } from "../api/apis";
export default {
  //上帝之眼，观察某个属性变法
  watch: {
    $route(to) {
      this.breadlist = to.meta.breadlist;
    },
  },
  data() {
    return {
      username: "",
      breadlist: [],
      imgUrl: "",
      menuList: [
        {
          url: "/Main/Index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/Main/OrderManage",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/Main/product",
          icon: "el-icon-shopping-bag-1",
          name: "商品管理",
          children: [
            { url: "/Main/GoodList", name: "商品列表" },
            { url: "/Main/GoodAdd", name: "添加商品" },
            { url: "/Main/GoodPart", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/Main/Store",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/Main/acc",
          icon: "el-icon-s-custom",
          name: "账号管理",
          children: [
            { url: "/Main/AccList", name: "账号列表" },
            { url: "/Main/Account", name: "添加账号" },
            { url: "/Main/AccPwd", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/Main/Money",
          icon: "el-icon-time",
          name: "销售统计",
          children: [
            { url: "/Main/ProductAll", name: "商品统计" },
            { url: "/Main/OrderAll", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      curHash: "",
    };
  },
  created() {
    this.curHash = this.$route.path;
    // 发送请求验证token是否失效
    istoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        //有效
        this.username = localStorage.acc;
      } else {
        //无效
        this.username = "请登录";
      }
    });
    this.newImg();
    //刷新头像
    this.$bus.$on("imgfreh", () => {
      this.$message({
        type: "success",
        message: "头像更新成功！",
      });
      this.newImg();
    });
    //初始化给面包屑导航赋值
    this.breadlist = this.$route.meta.breadlist;
  },
  methods: {
    newImg() {
      per(localStorage.id).then((res) => {
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    },
    delBtn() {
      // alert("已退出系统，请重新登录");

      // this.$router.push("/");
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出登录!请重新登录",
          });
          localStorage.clear();
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出系统",
          });
        });
    },
  },
  computed: {
    roleArr() {
      //es5
      // let newarr = this.menuList.filter((item) => {
      //   return item.roles.includes(localStorage.role)
      // });
      // return newarr;

      //es6
      return this.menuList.filter((item) =>
        item.roles.includes(localStorage.role)
      );
    },
  },
};
</script>

<style scoped lang='less'>
.elC {
  height: 100%;
  .el-container {
    height: 80%;
    // flex: 1;
  }
}
.el-aside {
  background-color: #336699;
  i {
    color: #fff;
  }
}
.el-menu {
  border: 0;
}

.el-main {
  background-color: #f0f2f5;
  // overflow-y:scroll ;
  height: 100%;
  .crumbs {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #808080;
  }
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(  #0099CC,#336699);
  // background-color: #003366;
  color: #fff;
  padding-left: 10px;
  .headerTitle {
    h1 {
      font-size: 20px;
      margin-left: 5px;
    }
    display: flex;
    align-items: center;
  }

  .headerImg {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    .photo {
      width: 50px;
      height: 50px;
    }
  }
}

h3 {
  padding: 10px 0;
  color: #fff;
  font-size: 18px;
  text-align: center;
  font-weight: normal;
  .hImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
a {
  color: #000;
}
/deep/.el-dropdown-link  {
  cursor: pointer;
}
</style>
