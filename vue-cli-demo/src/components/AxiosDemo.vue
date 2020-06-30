<template>
  <div>
    <!-- <el-button type="primary" v-on:click="qryPdf()">pic</el-button> -->
    <!-- 直接在src 中写入后台服务地址 后台服务返顺的类型是 image/png -->
    <!-- <img src="/yxy/test/pic2"> -->
    <!-- <img :src="'/yxy/test/'+picname" height="100px">
    <embed src="/yxy/test/pic2" type="image/png" width="100%" height="100%"> -->

    <!-- 如果浏览器支持打开pdf，可以简单使用如下方式打开，用的是浏览器的默认控件打开 -->
    <!-- <embed :src="'/yxy/test/'+pdfname" type="application/pdf" width="100%" height="800"> -->

  
    <!-- 使用pdf插件 vue-pdf 打开预览 -->
    <!-- 简单的打开一页 -->
    <!-- <pdf :src="'/yxy/test/'+pdfname"></pdf> -->

    <!-- 打开pdf的所有内容 -->
    <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 80%"
        ></pdf>

  </div>
</template>

<script>
import pdf from 'vue-pdf';
// var loadingTask = pdf.createLoadingTask('/yxy/test/pdf2');
export default {
  name: "AxiosDemo",
  components: {
    pdf
  },
  data() {
    return {
      picname:"pic2",
      pdfname:"pdf2",
      pic: "",
      pdf: "",
      numPages: undefined,
      src:loadingTask
    };
  },
  methods: {
    // qryPdf() {
    //   this.$http
    //     .get("/yxy/test/pic2")
    //     .then(resp => {
    //       // console.info(resp);
    //       this.pic=resp.data;
    //       // this.pic = btoa(
    //       //   new Uint8Array(resp.data).reduce(
    //       //     (data, byte) => data + String.fromCharCode(byte),
    //       //     ""
    //       //   )
    //       // );
    //       // console.info(this.pic);
    //     })
    //     .catch(function(error) {
    //       console.error(error);
    //     });
    // },
    // getPic(){
    //   // this.$http.
    // }
  },
    mounted() {
 
        this.src.then(pdf => {
 
            this.numPages = pdf.numPages;
        });
    }
};
</script>

<style scoped>
</style>
