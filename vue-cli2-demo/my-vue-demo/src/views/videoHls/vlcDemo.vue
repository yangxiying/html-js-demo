<template>
  <div>
    <div>
      <p>test show hikang video</p>
      <object
        type="application/x-vlc-plugin"
        pluginspage="http://www.videolan.org/"
        id="vlc"
        events="false"
        width="720"
        height="410"
      >
        <param name="mrl" value="rtsp://admin:HYXY2020@192.168.1.7:554/Streaming/Channels/102" />
        <param name="volume" value="50" />
        <param name="autoplay" value="true" />
        <param name="loop" value="false" />
        <param name="fullscreen" value="false" />
        <param name="controls" value="true" />
      </object>
    </div>

    <div>
      <p>vlc -2 </p>
      <video
        src="http://127.0.0.1:18080/testtest"
        width="600"
        height="450"
        autoplay="autoplay"
        loop="loop"
      ></video>
    </div>

    <div>
      <p>vlc -3 </p>
      <video id="myVideo-vlc-3" class="video-js" width="500"
        height="400" autoplay="autoplay"
        loop="loop">
        <source src="http://127.0.0.1:18080/testtest" type="video/mp4" />
      </video>
    </div>

  <div>
    <iframe src="http://demo.easynvr.com:10800/play.html?channel=2&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay"></iframe>
  </div>


  </div>
</template>
<script>
import Video from "video.js";
import "video.js/dist/video-js.css";
import videojsFlash from "videojs-flash";

export default {
  //   components: {
  //     videoplayer,
  //   },
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {
    // this.player.destory();
  },
  methods: {},
};
</script>