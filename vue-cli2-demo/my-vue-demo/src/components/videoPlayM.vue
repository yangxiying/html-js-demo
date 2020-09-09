<template>
  <div ref='divvideo'>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

import video_zhCN from "video.js/dist/lang/zh-CN.json";
import video_en from "video.js/dist/lang/en.json";

videojs.addLanguage("zh-CN", video_zhCN);
videojs.addLanguage("en", video_en);

import videojsFlash from "videojs-flash";

export default {
  name: "VideoPlayM",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  //   //侦听属性
  //   watch: {
  //     options: function (val) {
  //         console.info('sdfsdfsdfsdfs')
  //       console.info(val)
  //     },
  //   },
  mounted() {
    console.info("common is mounted");
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  created() {
    console.info("common is created");
  },
  beforeUpdate() {
    console.info("common is beforeUpdate");
  },
  updated: function () {
    console.info("common is updated");
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
},
  methods: {
    chageUrl: function (src, type) {
      if (this.player) {
        this.player.src([
          {
            type: type,
            src: src,
          },
        ]);

        this.player.play();
      }
    },

    disposePlay: function () {
      if (this.player) {
        console.log("this.player.dispose() 11111111111");
        this.player.dispose();
        //   this.$refs.videoPlayer.destroyVideo()
        // this.$refs.divvideo.append('<template></template><video ref="videoPlayer" class="video-js"></video><template>')
      }
    },
  },
  beforeDestroy() {
    if (this.player) {
      console.log("this.player.dispose()  beforeDestroy ");
      this.player.dispose();
      this.player = null;
      //   this.$refs.videoPlayer.destroyVideo()
    }
  },
};
</script>