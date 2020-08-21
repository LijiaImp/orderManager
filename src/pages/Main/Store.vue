<template>
  <div class="content">
    <div class="h3">
      <h3>店铺管理</h3>
      <el-button :type="isedit?'success':'primary'" @click="modBtn">{{isedit?'保存':'编辑'}}</el-button>
    </div>
    <!-- <div style="margin-top:25px;margin-left:20px">
      <p>
        <span>店铺名称</span>
        <el-input :placeholder="arr.name" style="margin-left:10px" v-model="arr.name"></el-input>
      </p>
      <p>
        <span>店铺公告</span>
        <el-input type="textarea" :rows="7" style="margin-left:10px" v-model="arr.bulletin"></el-input>
      </p>
      <p>
        <span>店铺头像</span>
        <img
          style="width: 100px; height: 100px；border-radius:4px;margin-left:10px"
          :src="GET_STORE_IMG+arr.avatar"
        />
      </p>
      <p style="display: flex;">
        <span>店鋪图片</span>
        <el-upload
          :action="STORE_IMG_UPLOAD"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          style="margin-left:10px;"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </p>
      <p>
        <span>配送费</span>
        <el-input
          :placeholder="arr.deliveryPrice"
          style="margin-left:10px"
          v-model="arr.deliveryPrice"
        ></el-input>
      </p>
      <p>
        <span>配送时间</span>
        <el-input
          :placeholder="arr.deliveryTime"
          style="margin-left:10px"
          v-model="arr.deliveryTime"
        ></el-input>
      </p>
      <p>
        <span>配送描述</span>
        <el-input :placeholder="arr.description" style="margin-left:10px" v-model="arr.description"></el-input>
      </p>
      <p>
        <span>店铺评分</span>
        <el-input :placeholder="arr.score" style="margin-left:10px" v-model="arr.score"></el-input>
      </p>
      <p>
        <span>销量</span>
        <el-input :placeholder="arr.sellCount" style="margin-left:10px" v-model="arr.sellCount"></el-input>
      </p>
      <p>
        <span>活动</span>
        <el-checkbox-group
          v-model="checkList"
          style="width: 200px; margin-left: 58px;margin-top: -18px;font-size:13px"
          @change="change"
        >
          <el-checkbox label="在线支付满28减5"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
          <el-checkbox label="单人精彩套餐"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购"></el-checkbox>
          <el-checkbox label="单人特色套餐"></el-checkbox>
        </el-checkbox-group>
      </p>
      <p>
        <span>营业时间</span>
        <el-time-picker
          is-range
          v-model="arr.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </p>
    </div>-->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top:25px;margin-left:20px"
      :disabled="!isedit"
    >
      <el-form-item label="店铺名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="form.bulletin" :rows="7" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          :action="STORE_IMG_UPLOAD"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="form.avatar"
            :src="GET_STORE_IMG+form.avatar"
            class="avatar"
            style="width: 150px; height: 150px;"
          />
          <img v-else :src="imgUrl" class="avatar" style="width: 150px; height: 150px;" />
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          :action="STORE_IMG_UPLOAD"
          list-type="picture-card"
          show-file-list
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleImgSuccess"
          :file-list="form.pics"
          :limit="3"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="form.deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input v-model="form.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-input v-model="form.score"></el-input>
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="form.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="checkList" style="width: 200px;" @change="change">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-time-picker
          is-range
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  storeList,
  modStore,
  STORE_IMG_UPLOAD,
  GET_STORE_IMG,
} from "@/api/apis";
import { getDate } from "@/utils/utils";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // arr: [],
      // fileList: [],
      STORE_IMG_UPLOAD: "",
      GET_STORE_IMG: "",
      form: {}, //新数据
      // arr1: {}, //要被改的新数据
      checkList: [],
      isedit: false,
      imgUrl: "",
    };
  },
  methods: {
    handleExceed() {
      this.$message.warning(`当前限制选择 3 个文件`);
    },

    //图片
    handleRemove(file) {
      console.log(file, this.form.pics);
      // this.form.pics = this.form.pics.filter((item) => item != file);------方法1
      // console.log(this.form.pics.indexOf(file))
      this.form.pics.splice(this.form.pics.indexOf(file), 1); //方法2
      // console.log(this.form.pics)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //店铺
    handleImgSuccess(res, file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.dialogImageUrl = res.imgUrl;
      this.form.pics.push({ url: this.GET_STORE_IMG + this.dialogImageUrl });
    },
    //头像
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.avatar = res.imgUrl;
      }
    },
    //修改
    modBtn() {
      // this.arr1 = { ...this.form };
      // this.arr1.pics = JSON.stringify(this.pics);
      // this.arr1.supports = JSON.stringify(this.checkList);
      // this.arr1.date = JSON.stringify(this.arr1.date);
      // console.log(this.arr1, this.form);
      if (this.isedit) {
        this.isedit = false;

        let arr1 = JSON.parse(JSON.stringify(this.form));
        arr1.pics = JSON.stringify(
          arr1.pics.map((item) => item.url.substr(this.GET_STORE_IMG.length))
        );
        arr1.supports = JSON.stringify(this.checkList);
        (arr1.date = JSON.stringify([
          getDate(arr1.date[0]),
          getDate(arr1.date[1]),
        ])),
          console.log(arr1.date, arr1.pics);
        modStore(arr1).then((res) => {
          // console.log(res);
          if (res.data.code == 0) {
            this.$message({
              message: "懒购系统提示:店铺修改成功!",
              type: "success",
            });
          }
        });
      } else this.isedit = true;
    },
    change(val) {
      this.form.supports = val;
    },
  },
  created() {
    this.STORE_IMG_UPLOAD = STORE_IMG_UPLOAD;
    this.GET_STORE_IMG = GET_STORE_IMG;
    storeList().then((res) => {
      res.data.data.date[0] = getDate(res.data.data.date[0]);
      res.data.data.date[1] = getDate(res.data.data.date[1]);
      // this.arr = res.data.data;
      this.form = res.data.data;
      this.checkList = res.data.data.supports;
      // this.pics = res.data.data.pics;
      // res.data.data.supports = JSON.parse(res.data.data.supports) ;
      // console.log(this.arr);
      this.form.pics = this.form.pics.map((item) => ({
        url: this.GET_STORE_IMG + item,
      }));
    });
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  width: 100%;
  padding-bottom: 20px;
  .h3 {
    padding: 10px;
    text-indent: 10px;
    border-bottom: 1px solid #f4f4f4;

    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 16px;
      font-weight: normal;
      width: 100px;
    }
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
  span {
    display: inline-block;
    width: 50px;
    text-align: center;
  }
}
/deep/.el-form-item__content {
  line-height: 0 !important;
}
</style>