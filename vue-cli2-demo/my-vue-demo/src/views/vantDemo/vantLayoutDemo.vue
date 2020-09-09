<template>
  <div>
    <!-- 每个元素的两侧间隔相等 -->
    <!-- <van-row type="flex" justify="space-around"> -->
    <van-row >
      <van-col span="6">span: 6-1</van-col>
      <van-col span="6">span: 6-2</van-col>
      <van-col span="6">span: 6-3</van-col>
      <van-col span="6">span: 6-4</van-col>
      <van-col span="6">span: 6-5</van-col>
      <van-col span="6">span: 6-6</van-col>
      <van-col span="6">span: 6-7</van-col>
    </van-row>
  </div>
</template>

<script>
import { Col, Row } from "vant";

// 刚开始不行，网上说需要需要引入 npm i less-loader less
// 后面发现只要引用组件使用以下方式就可
// import "vant/lib/col/style/less";
// import "vant/lib/row/style/less";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },
};
</script>

<style>
</style>