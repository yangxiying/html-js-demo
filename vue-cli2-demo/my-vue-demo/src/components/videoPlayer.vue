<template>
  <video :id="'player'+id" class="video-js" preload="auto" style="width: 100%;height: 100%;" 
    controls muted data-setup='{"html5" : { "nativeTextTracks" : false }}'>
    <source :src="videoSrc" type="video/mp4">
  </video>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-flash';
import SWF_URL from 'videojs-swf/dist/video-js.swf';
videojs.options.flash.swf = SWF_URL;
export default {
  name: 'video-player',
  props: {
    id: {
      type: [String, Number]
    },
    videoSrc : {
      type: [String]
    }
  },
  data() {
    return {
      player: null,
    //   videoSrc: null
    };
  },
  mounted() {
    this.player = videojs('player' + this.id);

  },
  methods: {
    changeVideo(source) {
      this.player = videojs('player' + this.id);
      this.videoSrc = source;
      this.player.src({
        src: this.videoSrc,
        type: 'rtmp/flv'
      });
      this.player.play();
    }
  },
  beforeDestroy: function() {
    this.player.dispose();
  }
};
</script>
<style scoped>
/* .video-js  {
  display: none;
}
.vjs-big-play-button{
  display: none;
} */
</style>