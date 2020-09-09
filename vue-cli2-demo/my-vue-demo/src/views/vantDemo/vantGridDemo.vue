<template>
  <div>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
      </van-grid-item>
      <van-grid-item text="文字">
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        文字
      </van-grid-item>
      <van-grid-item text="文字">
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        文字
      </van-grid-item>
      <van-grid-item text="文字">
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        文字
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem,Image } from "vant";
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
  },
};
</script>

<style>
</style>