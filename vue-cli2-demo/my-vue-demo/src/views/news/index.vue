<template>
  <div id="todo-list-example"> 
    <ul>
      <li
        v-for="(item) in newslist"
        v-bind:key="item.id"
        v-bind:title="item.title"
      >{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: []
    };
  },
  // 挂载的时候获取新闻列表
  mounted() {
    this.$http.get("/mock/news").then(res => {
      // url即在mock.js中定义的
      console.log(res.data); // 打印一下响应数据
      this.newslist = res.data;
    });
  }
};
</script>

<style>
</style>