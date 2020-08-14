<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>管理员信息</span>
    </div>
    <div style="border-bottom:1px solid #f0f2f5;padding-bottom:15px">管理员ID：{{userid}}</div>
    <div style="border-bottom:1px solid #f0f2f5;padding:15px 0">账号：{{username}}</div>
    <div style="border-bottom:1px solid #f0f2f5;padding:15px 0">用户组：{{usergroup}}</div>
    <div style="border-bottom:1px solid #f0f2f5;padding:15px 0">创建时间：{{usertime}}</div>
    <div style="border-bottom:1px solid #f0f2f5;padding:15px 0">
      更改头像：
      <el-upload
        class="avatar-uploader"
        :action="USER_IMG_UPLOAD"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="uploadData"
        style="margin-left:82px"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <img v-else :src="imgUrl" class="avatar" />
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
    </div>
  </el-card>
</template>

<script>
import { per,USER_IMG_UPLOAD } from "../../api/apis";
import { getDate } from "@/utils/utils";
export default {
  created() {
    this.USER_IMG_UPLOAD=USER_IMG_UPLOAD;
    var id = localStorage.getItem("id");
    per(id).then((res) => {
      this.userid = res.data.accountInfo.id;
      this.username = res.data.accountInfo.account;
      this.usergroup = res.data.accountInfo.userGroup;
      let time = getDate(res.data.accountInfo.ctime);
      this.imgUrl=res.data.accountInfo.imgUrl;
      this.usertime = time;
    });
    this.uploadData = { id: localStorage.id };
  },
  data() {
    return {
      userid: "",
      username: "",
      usergroup: "",
      usertime: "",
      imageUrl: "",
      imgUrl:"",
      uploadData: {},
      USER_IMG_UPLOAD:''
    };
  },
  methods: {
    handleAvatarSuccess(res,file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code==0) {
        this.$bus.$emit('imgfreh')
      }
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
</style>