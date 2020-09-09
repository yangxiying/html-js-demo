<template>
  <div>
    <div>
      <p>hls.js播放</p>
      <video ref="videoRef" width="400" controls></video>
    </div>
    
  </div>
</template>
<script>
// import "../assets/js/video.js";
// import Video from "video.js";
// import "video.js/dist/video-js.css";
// import videoplayer from "@/components/videoPlayer";

// import "../assets/js/hls";
// var Hls = window.Hls
import Hls from "hls.js";

export default {
  //   components: {
  //     videoplayer,
  //   },
  data() {
    return {};
  },
  mounted() {
    this.initHlsJsVideo(); 
  },
  methods: {
    
    initHlsJsVideo() {
      var hls = new Hls();
      hls.loadSource(
        "http://yf.ugc.v.cztv.com//cztv/ugcvod/2018/04/14/A98CD7B26B06D94A5CEA56AA7D723572/h264_800k_mp4.mp4_playlist.m3u8"
      ); //需要播放的视频地址
      hls.attachMedia(this.$refs.videoRef);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        this.$refs.videoRef.play();
      });
    },
  },
};
</script>