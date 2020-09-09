<template>
  <div id="mockjs-example">
    <el-row>
      <el-button @click="queryNews">查询</el-button>
      <el-button type="primary" @click="addNews">增加</el-button>
      <!-- <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>-->
    </el-row>

<!-- stripe 属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。 -->
    <!-- 竖直方向的边框的，如果需要，可以使用 border 属性，它接受一个Boolean，设置为true即可启用。 -->
    <!-- el-table元素中定义了height属性，即可实现固定表头的表格，而不需要额外的代码。 -->
    <el-table :data="newslist" stripe border fit='' style="width: 100%" height ='500'>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"  ></el-table-column>
      <el-table-column prop="createdTime" label="时间"></el-table-column>
    </el-table>



<!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" >确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: [],
      title:'add news',
      open: false,
      form: {},
      rules: {
      },
    };
  },
  // 挂载的时候获取新闻列表
  mounted() {
    // this.$http.get("/mock/news").then((res) => {
    //   // url即在mock.js中定义的
    //   console.log(res.data); // 打印一下响应数据
    //   this.newslist = res.data;
    // });
  },
  methods: {
    queryNews() {
      this.$http.get("/mock/news").then((res) => {
        // url即在mock.js中定义的
        // console.log(res.data); // 打印一下响应数据
        this.newslist = res.data;
      });
    },
    addNews(){
      this.open=true;
    },
     // 取消按钮
    cancel() {
      this.open = false;
    },
  },
};
</script>

<style>
</style>