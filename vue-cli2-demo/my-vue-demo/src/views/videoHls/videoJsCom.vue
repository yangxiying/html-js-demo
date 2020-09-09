<template>
  <div>
    <div>
      <button v-on:click="switchUrl(1)">切换mp4</button>
      <button v-on:click="switchUrl(2)">切换湖南TV</button>
      <button v-on:click="switchUrl(3)">切换苗圃视频</button>
      <button v-on:click="playDispose()">play.dispose()</button>
      <button @click="opendialog()">点击打开 Dialog</button>
    </div>
    <div>
      <VideoPlayerm ref="myvideo" :options="videoOptions" />
    </div>
    <div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <!-- <VideoPlayerm ref="myvideoDialog" :options="videoOptions" /> -->
        <component :is="item.component" :options="item.videoOptions" ref="myvideoDialog"></component>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import VideoPlayerm from "@/components/videoPlayM.vue";
export default {
  //   name: "VideoExample",
  components: {
    VideoPlayerm,
  },
  data() {
    return {
      dialogVisible: false,
      item: {},
      videoOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          // 设置控制条组件，是否可显示
          currentTimeDisplay: false,
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          playToggle: false,
          volumePanel: false,
        },
        language: "zh-CN",
        fullscreen: { navigationUI: "show" },
        sources: [
          {
            src: "//vjs.zencdn.net/v/oceans.mp4",
            type: "video/mp4",
          },
        ],
      },
    };
  },

  methods: {
    //切换url
    switchUrl: function (val) {
      console.info("000000000");

      //   this.videoOptions.sources= [{
      //     src: "//vjs.zencdn.net/v/oceans.mp4",
      //     type: "video/mp4",
      //   }];
      //   debugger;
      if (val === 3) {
        this.$refs.myvideo.chageUrl(
          "/prod-api/videodir/HYXY0.m3u8",
          "application/x-mpegURL"
        );
      } else if (val === 2) {
        this.$refs.myvideo.chageUrl(
          "rtmp://58.200.131.2:1935/livetv/hunantv",
          "rtmp/flv"
        );
      } else if (val === 1) {
        this.$refs.myvideo.chageUrl(
          "//vjs.zencdn.net/v/oceans.mp4",
          "video/mp4"
        );
      }
    },
    playDispose: function () {
      this.$refs.myvideo.disposePlay();
    },

    opendialog: function () {
      this.dialogVisible = true;
      this.item={
        component: 'VideoPlayerm',
        videoOptions: this.videoOptions,
      };
    },

    handleClose(done) {
      let _this =this;
      this.$confirm("确认关闭？")
        .then((_) => {
          
          // if(_this.$refs.myvideoDialog )
          // _this.$refs.myvideoDialog.disposePlay();
          _this.item=[];
          // this.player.disposePlay();


          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
</style>