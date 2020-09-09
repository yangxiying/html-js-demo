<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开打印 Dialog</el-button>

    <el-dialog title="打印页面" :visible.sync="dialogVisible" width="40%" size="small">
      <div style="width:500px" id="divtest">
        <div>
          <p>111111</p>
          <p>222222</p>
          <p>333333</p>
          <p>444444</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
          <p>111111</p>
        </div>
        <img id="printTest" :src="printImg" style="width:100%;  height:auto;" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-print="'#divtest'">去打印</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      printImg: "static/123.png",
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
</style>