<template>
  <div>
    <nut-swiper
      :paginationVisible="true"
      :paginationClickable="true"
      direction="horizontal"
      @slideChangeEnd="slideChangeEnd"
      ref="demo1"
    >
      <!-- <div v-for="(item,index) in dataItem" :key="index" class="nut-swiper-slide">
        <span>page{{item.name}}--{{index}}</span>
      </div>-->
      <div v-for="(item,index) in pagenum" :key="index" class="nut-swiper-slide">
        <el-row>
          <el-col :span="5" v-for="(o,inde) in dataItem" :key="inde" :offset="1">
            <el-card :body-style="{ padding: '0px' }">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
              <!-- <div style="padding: 14px;"> -->
                <span>page{{o.name}}--{{index}}</span>
              <!-- </div> -->
            </el-card>
          </el-col>
        </el-row>
      </div>
    </nut-swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataItems: [],
      pagenum: 4,
      dataItem: [
        {
          name: "111111",
        },
        {
          name: "22222",
        },
        {
          name: "33333",
        },
        {
          name: "4444",
        },
        {
          name: "5555",
        },
        {
          name: "6666",
        },{
          name: "7777",
        },
        {
          name: "8888",
        },
        {
          name: "9999",
        },
        {
          name: "101010",
        },
        {
          name: "121212",
        },
        {
          name: "131313",
        },
      ],
    };
  },
  mounted() {
    this.dataItems[0] = this.dataItem;
  },
  methods: {
    slideChangeEnd(index, el) {
      console.log(index, el);
      let dataindex = index - 1;
      if (this.dataItems[dataindex]) {
        this.dataItem = this.dataItems[dataindex];
      } else {
        this.dataItem = [{ name: "aaa" }, { name: "bbb" }, { name: "cccc" }];
      }
    },
  },
};
</script>

<style>
</style>