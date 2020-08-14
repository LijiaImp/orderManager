<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" prop="category">
        <template slot-scope="scope">
          <span>{{scope.row.category}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" prop="price">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl==''?'':GET_PRO_IMG+scope.row.imgUrl" style="width:60px;height:60px" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc">
        <template slot-scope="scope">
          <span>{{scope.row.goodsDesc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showBtn(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delBtn(sscope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total,prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
    <div class="changeC" v-show="show==false?false:true">
      <div class="showup">
        <div class="first">
          <p>修改商品</p>
          <button @click="disBtn" class="del">×</button>
        </div>
        <p style="margin:20px 0">
          商品名称
          <el-input v-model="newobj.name"></el-input>
        </p>
        <p style="margin-bottom:20px">
          商品分类
          <el-select v-model="newobj.category" placeholder="请选择">
            <el-option
              v-for="item in newstyle"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateName"
              z-index="1005"
            ></el-option>
          </el-select>
        </p>
        <p style="margin-bottom:20px">
          商品价格
          <el-input v-model="newobj.price"></el-input>
        </p>
        <p style="margin-bottom:20px">
          商品图片
          <el-upload
            :action="PRO_IMG_UPLOAD "
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :show-file-list="false"
            style="margin-left:70px"
          >
            <i v-show="!newobj.imgUrl" class="el-icon-plus"></i>
            <img style="width: 100px" v-show="newobj.imgUrl" :src="newobj.imgUrl==''?'':GET_PRO_IMG  + newobj.imgUrl" />
          </el-upload>
        </p>
        <p style="margin-bottom:20px">
          商品描述
          <el-input v-model="newobj.goodsDesc"></el-input>
        </p>
        <p>
          <el-button type="primary" style="margin-left:100px" @click="modBtn(curIndex)">修改</el-button>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import {
  proList,
  delPro,
  modPro,
  GET_PRO_IMG,
  PRO_IMG_UPLOAD,
  styleList,
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      show: false,
      curIndex: 0,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      GET_PRO_IMG: "",
      PRO_IMG_UPLOAD: "",
      name: "",
      category: "",
      price: "",
      goodsDesc: "",
      // imgUrl: "",
      dialogVisible: false,
      loading: true,
      newobj: {
          imgUrl: "",
      },
      newstyle: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.proListFn();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.proListFn();
    },
    //渲染列表
    proListFn() {
      proList(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        // this.uploadData = { id: res.data.data.id };
        this.loading = false;
      });
    },
    //删除
    delBtn(index, row) {
      this.$confirm("是否删除该条数据", "懒购系统提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPro(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "商品删除成功!",
                type: "success",
              });
              this.proListFn();
            } else {
              this.$message({
                message: "商品删除失败!请稍后再试",
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
    showBtn(row) {
      this.show = true;
      this.newobj = { ...row };
      // console.log(this.newobj)
      styleList().then((res) => {
        this.newstyle = res.data.categories;
      });
    },
    //编辑
    modBtn() {
      delete this.newobj.rating;
      delete this.newobj.ratings;
      delete this.newobj.sellCount;
      modPro(this.newobj).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.proListFn();
          this.$message({
            message: "懒购系统提示:商品修改成功!",
            type: "success",
          });
          this.show = false;
        } else {
          this.$message({
            message: "懒购系统提示:商品修改失败!请稍后再试",
            type: "error",
          });
        }
      });
    },
    //关掉修改添加分类模块
    disBtn() {
      this.show = false;
    },
    //头像
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(res) {
      // this.dialogImageUrl = URL.createObjectURL(file.raw);
      if (res.code == 0) {
        this.newobj.imgUrl = res.imgUrl;
      }
    },
  },
  created() {
    this.PRO_IMG_UPLOAD = PRO_IMG_UPLOAD;
    this.GET_PRO_IMG = GET_PRO_IMG;
    this.loading = true;
    this.proListFn();
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
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
}
</style>