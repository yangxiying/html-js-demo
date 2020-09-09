<template>
  <div>
    <div>
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
    </div>

    <el-dialog title="提示" :visible.sync="isopen" width="50%">
      <el-row >
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
            <div>
                冬青柱极耐修剪。夏季要整形修剪一次，秋季可根据不同的绿化需求进行平剪或修剪成球形、圆柱形，保持一定的冠形枝态。好景苗圃常年批发优质冬青柱，大小规格都有，现挖现卖，关于冬青柱市场价格，请来电咨询！
            </div>
        </el-col>
      </el-row>
    </el-dialog>



    <el-dialog title="提示" :visible.sync="isopen22" width="50%">
      <el-row >
        <el-col :span="12"> 
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px;">
                  <span>{{item}}</span>
                </div>
        </el-col>
        <el-col :span="10" offset="2">
            <div>
                冬青柱极耐修剪。夏季要整形修剪一次，秋季可根据不同的绿化需求进行平剪或修剪成球形、圆柱形，保持一定的冠形枝态。好景苗圃常年批发优质冬青柱，大小规格都有，现挖现卖，关于冬青柱市场价格，请来电咨询！
            </div>
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
export default {
  data() {
    return {
      isopen: false,
      isopen22:false,
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
};
</script>

<style>
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