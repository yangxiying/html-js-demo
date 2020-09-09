<template>
  <div>
    <!-- <div>
      <el-row>
        <el-col :span="2" v-for="(o, index) in 32" :key="o" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
              @click="isopen=true"
            />
            <div style="padding: 14px;">
              <span @click="isopen=true">好吃的汉堡</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>-->

    <!-- <div>
      <swiper
        :slides-per-view="3"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>...
      </swiper>
    </div>-->
    <div>
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
        class="swiper-wrap"
        @slideChangeTransitionEnd="slideChangeTransitionEnd()"
      >
        <swiper-slide>
          <el-row>
            <el-col :span="2" v-for="(o, index) in 32" :key="index" :offset="1">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                  @click="isopen=true"
                />
                <div style="padding: 14px;">
                  <span @click="isopen=true">好吃的汉堡</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>
          <el-row>
            <el-col :span="2" v-for="(o, index) in 32" :key="o" :offset="1">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                  @click="isopen=true"
                />
                <div style="padding: 14px;">
                  <span @click="isopen=true">好吃的汉堡</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <!-- <div class="swiper-pagination"></div> -->
        <!-- <div class="swiper-pagination" v-for="(item,index) in 5" :key ="item" slot="pagination"></div> -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <paginaion></paginaion> -->
      </swiper>
      <!-- <div class="number">{{imgIndex}}</div> -->
      <!-- <div class="swiper-pagination"></div> -->
    </div>

    <el-dialog title="提示" :visible.sync="isopen" width="50%">
      <el-row>
        <el-col :span="12">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px;">
                  <span>{{item}}</span>
                </div>
              </el-card>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="10" offset="2">
          <div>冬青柱极耐修剪。夏季要整形修剪一次，秋季可根据不同的绿化需求进行平剪或修剪成球形、圆柱形，保持一定的冠形枝态。好景苗圃常年批发优质冬青柱，大小规格都有，现挖现卖，关于冬青柱市场价格，请来电咨询！</div>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="isopen22" width="50%">
      <el-row>
        <el-col :span="12">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>ppppppppppp</span>
          </div>
        </el-col>
        <el-col :span="10" offset="2">
          <div>冬青柱极耐修剪。夏季要整形修剪一次，秋季可根据不同的绿化需求进行平剪或修剪成球形、圆柱形，保持一定的冠形枝态。好景苗圃常年批发优质冬青柱，大小规格都有，现挖现卖，关于冬青柱市场价格，请来电咨询！</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px;">
                  <span>{{item}}</span>
                </div>
              </el-card>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// swiper 4.0.7
// import "swiper/dist/css/swiper.css";
// swiper 5.2.0
import "swiper/css/swiper.css";
// swiper 6.2.0
// import "swiper/swiper-bundle.css";
// import { Swiper, SwiperSlide,directive,Pagination } from "vue-awesome-swiper";

//vue-awesome-swiper 4.1.1 最好对应的swiper 为5.2.0及以下
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import { swiper, swiperSlide } from "swiper/vue";

// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// import 'swiper/swiper.scss';
//   import 'swiper/components/navigation/navigation.scss';
//   import 'swiper/components/pagination/pagination.scss';
//   import 'swiper/components/scrollbar/scrollbar.scss';
// install Swiper components
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
// Swiper.use(Pagination);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    // swiper: directive,
  },
  data() {
    return {
      imgIndex: 1,
      swiperOptions: {
        grabCursor: true,
        // autoplay: {
        //   enabled: true,
        //   delay:1000,
        // },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // type: "bullets",
          // type: "custom",
          // renderCustom: function (swiper, current, total) {
          //   return current + " of " + total;
          // },
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        },
        // Some Swiper option/callback...
      },
      isopen: false,
      isopen22: false,
      datalist: [
        {
          pic:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          msg: "1111111",
        },
        {
          pic:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          msg: "22222222",
        },
        {
          pic:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          msg: "3333333",
        },
        {
          pic:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          msg: "4444444",
        },
        {
          pic:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          msg: "5555555",
        },
      ],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(1, 1000, false)
  },
  methods: {
    slideChangeTransitionEnd() {
      // console.log(this.swiper);
      console.log(this.swiper.realIndex);
    },
  },
  watch: {},
};
</script>

<style>

.swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>