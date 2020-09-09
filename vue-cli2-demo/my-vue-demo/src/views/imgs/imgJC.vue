<template>
  <div>
    <div>
      <img :src="require('@/assets/map/map-y1.PNG')" height="200px" />
      <img :src="option.img" height="200px" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
    </div>
    <div style="height: 200px;">
      <!-- <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        :fixedBox="option.fixedBox"
        @realTime="realTime"
      ></vueCropper>-->
      <vueCropper
        ref="cropper"
        :img="option.img"
        :info="true"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedBox="option.fixedBox"
        @realTime="realTime"
      ></vueCropper>
    </div>
    <div class="avatar-upload-preview">
      <img  :src="previews.url" :style="previews.img" />
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  components: { VueCropper },
  data() {
    return {
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: require("@/assets/map/map-y1.PNG"), // 裁剪图片的地址
        // img: "https://img.yzcdn.cn/vant/apple-3.jpg", // 裁剪图片的地址
        // info: true, // 裁剪框的大小信息
        // outputSize: 0.8, // 裁剪生成图片的质量
        // outputType: "jpeg", // 裁剪生成图片的格式
        // canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        // fixedBox: true, // 固定截图框大小 不允许改变
        // fixed: true, // 是否开启截图框宽高固定比例
        // fixedNumber: [7, 5], // 截图框的宽高比例
        // full: true, // 是否输出原图比例的截图
        // canMoveBox: false, // 截图框能否拖动
        // original: false, // 上传图片按照原始比例渲染
        // centerBox: false, // 截图框是否被限制在图片里面
        // infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组
      // 防止重复提交
      loading: false,
      previews: {},
    };
  },
  methods: {
    // 实时预览函数
    realTime(data) {
      console.log("realTime",data);
      this.previews = data;
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      //   debugger;
      //获取截图的blob数据
      this.$refs.cropper.getCropBlob((data) => {
        console.log("getCropBlob", data);
        // debugger;

        // var fileName = "goods" + this.fileinfo.uid;
        // this.loading = true;
        //上传阿里云服务器
        // client().put(fileName, data).then(result => {
        //   this.dialogVisible = false
        //   this.picsList.push(result.url)
        // }).catch(err => {
        //   console.log(err)
        //   this.loading = false
        // })
      });

      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        // do something
        // console.log(data);
      });
    },
  },
};
</script>

<style  >
/* .cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
} */
</style>