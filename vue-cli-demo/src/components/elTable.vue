<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>-->

      <el-table-column v-for="col in cols" :key="col.id" :prop="col.prop" :label="col.label"></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="addCol">添加一列</el-button>
    </div>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          attrs:[{akey:"a",aval:"1"}]
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          attrs:[]
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          attrs:[]
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          attrs:[]
        }
      ],
      cols: [
        { prop: "date", label: "日期",id:0 },
        { prop: "name", label: "姓名",id:1 },
        { prop: "address", label: "地址",id:2 }
      ]
    };
  },
  methods: {
      addCol(){
        let idd = this.cols.length+1
        this.cols.push({prop: 'attrs.akey', label: '属性名',id:this.cols.length+1})
        this.cols.push({prop: 'attrs.aval', label: '属性值',id:this.cols.length+1})
      }
  }

};
</script>