<template>
  <div style="width:100%;margin:20px auto;height:600px">
    <!-- Using the slider component -->
    <slider ref="slider" :options="options" @slide="slidecli">
      <!-- slideritem wrapped package with the components you need -->
      <slideritem v-for="(item,index) in pagenum" :key="index">
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
      </slideritem>
      <!-- Customizable loading -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
</template>

<script>
import { slider, slideritem } from "vue-concise-slider";
export default {
  components: {
    slider,
    slideritem,
  },
  props: {
    breed: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      //data list [array]
      dataItems: [],
      pagenum: 14,
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
        },
        {
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

      someList: [
        {
          html: "slide1",
          style: {
            background: "#1bbc9b",
          },
        },
        {
          html: "slide2",
          style: {
            background: "#4bbfc3",
          },
        },
        {
          html: "slide3",
          style: {
            background: "#7baabe",
          },
        },
      ],
      //Slider configuration [obj]
      options: {
        currentPage: 0,
        pagination: true,
      },
    };
  },
  mounted() {
    debugger;
    this.dataItems[0] = this.dataItem;
    this.options.currentPage=0;
    // this.pagenum=1;
  },
  methods: {
    slidecli(data) {
      console.log(data.currentPage);
      let curpage = data.currentPage;
      debugger;
      if (this.dataItems[curpage]) {
        this.dataItem = this.dataItems[curpage];
      } else {
        this.dataItem = [{ name: "aaa" }, { name: "bbb" }, { name: "cccc" }];
        this.dataItems[curpage] = this.dataItem;
      }
    },
  },
  watch: {
      breed(newV, oldV) {
      // debugger
      console.log("newV");
      console.log(newV);
      
      // }
    },
     $route(to, from) {
      // 对路由变化作出响应...
      // this.breed=to.params.id
      console.log("route")
      console.log(to)
      console.log(from)
      this.$refs.slider.$emit('speed', 0)
      this.$refs.slider.$emit('slideTo', 0)
      // debugger;
    }
  },

};
</script>

    
<style>
</style>