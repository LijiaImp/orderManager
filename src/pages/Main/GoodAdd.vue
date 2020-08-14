<template>
  <div class="content">
    <h3>商品添加</h3>
    <div style="margin-top:25px;margin-left:20px">
      <p>
        商品名称
        <el-input placeholder="商品名称" style="margin-left:10px" v-model="proVal"></el-input>
      </p>
      <p>
        商品分类
        <el-select v-model="value" placeholder="请选择" style="margin-left:10px">
          <el-option
            v-for="item in options"
            :key="item.cateName"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </p>
      <p>
        商品价格
        <el-input placeholder="商品价格" style="margin-left:10px" v-model="priVal"></el-input>
      </p>
      <p style="display: flex;">
        商品图片
        <el-upload
          :action="PRO_IMG_UPLOAD"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          style="margin-left:20px"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </p>
      <p>
        商品描述
        <el-input type="textarea" :rows="2" style="margin-left:10px" v-model="textVal"></el-input>
      </p>
      <el-button type="primary" style="margin-left: 60px;" @click="addBtn">添加商品</el-button>
    </div>
  </div>
</template>

<script>
import { addPro, styleList, PRO_IMG_UPLOAD } from "@/api/apis";
export default {
  created() {
    this.PRO_IMG_UPLOAD = PRO_IMG_UPLOAD;
   
    styleList().then((res) => {
      console.log(res);
      this.options = res.data.categories;
    });
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      proVal: "",
      textVal: "",
      value: "",
      priVal: "",
      options: [],
      PRO_IMG_UPLOAD: "",
     
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(res) {
      // this.dialogImageUrl = URL.createObjectURL(file.raw);
      if (res.code == 0) {
        this.dialogImageUrl = res.imgUrl;
      }
    },
    addBtn() {
      addPro(
        this.proVal,
        this.value,
        this.priVal,
        this.dialogImageUrl,
        this.priVal
      ).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "商品添加成功!",
            type: "success",
          });
          this.proVal = "";
          this.value = "";
          this.priVal = "";
          this.textVal = "";
          // this.dialogImageUrl=''
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
    width: 30%;
  }
  p {
    margin-bottom: 20px;
    .el-textarea {
      width: 36%;
    }
  }
}
</style>