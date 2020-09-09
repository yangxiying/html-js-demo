<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="filelist"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <!-- <el-form-item label="照片"> -->
      <el-upload
        accept="image/*"
        class="avatar-uploader"
        :action="uploadPath"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    <!-- </el-form-item> -->
  </div>
</template>

<script>
import imageConversion from 'image-conversion'
export default {
  data() {
    return {
      //压缩质量
      imgQuality: 0.5,
      imgUrl: "",
      uploadPath:'/picww/common/upload',
      dialogImageUrl: "",
      dialogVisible: false,
      filelist: [
        {
          name: "food.jpg",
          url:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        },
        {
          name: "food.jpg",
          url:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        },
      ],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleAvatarSuccess(res, file) {
      debugger;
      // 服务器返回结果处理
    },
    dataURItoBlob(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    },
    beforeAvatarUpload(file) {
      const _this = this;
      // debugger;
      // return new Promise((resolve) => {
      //   const reader = new FileReader();
      //   const image = new Image();
      //   image.onload = (imageEvent) => {
      //     const canvas = document.createElement("canvas");
      //     const context = canvas.getContext("2d");
      //     const width = image.width * _this.imgQuality;
      //     const height = image.height * _this.imgQuality;
      //     canvas.width = width;
      //     canvas.height = height;
      //     context.clearRect(0, 0, width, height);
      //     context.drawImage(image, 0, 0, width, height);
      //     const dataUrl = canvas.toDataURL(file.type);
      //     const blobData = _this.dataURItoBlob(dataUrl, file.type);
      //     resolve(blobData);
      //   };
      //   reader.onload = (e) => {
      //     image.src = e.target.result;
      //   };
      //   reader.readAsDataURL(file);
      // });


      return new Promise((resolve, reject) => {
        let isLt2M = file.size / 1024 / 1024 < 2 // 判定图片大小是否小于2MB
        console.info('file.size',isLt2M)
        if (isLt2M) {
          resolve(file)
        }
        // console.info("ssssss")
        console.log(file) // 压缩到400KB,这里的400就是要压缩的大小,可自定义
        imageConversion.compressAccurately(file, 400).then(res => { // console.log(res)
        debugger
        console.log('res')
        console.log(res)
         resolve(res)
        }).catch(e=>{
            console.log(e)
        });
      });


      // 图片不大于4m,宽度不大于2000
      // return new Promise((resolve, reject) => {
      //   let _URL = window.URL || window.webkitURL
      //   let isLt2M = file.size / 1024 / 1024 > 4 // 判定图片大小是否小于4MB
      //   // 这里需要计算出图片的长宽
      //   let img = new Image()
      //   img.onload = function () {
      //     file.width = img.width // 获取到width放在了file属性上
      //     file.height = img.height // 获取到height放在了file属性上
      //     let valid = img.width > 2000 // 图片宽度大于2000
      //     // console.log(11, file)
      //     // 这里我只判断了图片的宽度,compressAccurately有多个参数时传入对象
      //     if (valid || isLt2M) {
      //       imageConversion.compressAccurately(file, {
      //         size: 400,
      //         width: 2000 }).then(res => { // console.log(33, res)
      //          resolve(res)
      //       })
      //     } else resolve(file)
      //   } // 需要把图片赋值
      //   img.src = _URL.createObjectURL(file)
      // });


    },
  },
};
</script>

<style>
</style>