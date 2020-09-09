<template>
  <div>
    <div>
      <!-- <button v-on:click>反转消息</button> -->
    </div>


    <div>
      <p>video.js播放 rtmp 格式文件, 湖南卫视</p>
      <video
        id="myvideo-3"
        width="500"
        height="400"
        class="video-js vjs-default-skin"
        controls
        data-setup="{}"
      >
        <!-- 20200813使用这个下面的地址，如下测试可用 -->
        <source src="rtmp://58.200.131.2:1935/livetv/hunantv" type="rtmp/flv" />
      </video>
    </div>

    <div class="test_two_box">
      <p>video.js播放 mp4 格式文件</p>
      <video id="myVideo" class="video-js">
        <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
      </video>
    </div>
    <div>
      <!-- <p>video.js播放 hls 格式文件</p>
      <video
        id="myvideo-2"
        width="500"
        height="400"
        class="video-js vjs-default-skin"
        controls
        data-setup="{}"
      >-->
      <!-- hls直播源地址：CCTV1高清 -->
      <!-- <source
          src="/vedio_1/cztv/ugcvod/2018/04/14/A98CD7B26B06D94A5CEA56AA7D723572/h264_800k_mp4.mp4_playlist.m3u8"
          type="application/x-mpegURL"
        />
      </video>-->
    </div>
  </div>
</template>
<script>
// import "../assets/js/video.js";
import Video from "video.js";
import "video.js/dist/video-js.css";
// import videoplayer from "@/components/videoPlayer";

import videojsFlash from "videojs-flash";
// import videojsSwf from'videojs-swf';

export default {
  //   components: {
  //     videoplayer,
  //   },
  data() {
    return {
      player1: null,
      player2: null,
      player3: null,
      player4: null,
      player5: null,
      videourl: null,
      videoType:null,
    };
  },
  mounted() {
    this.initVideo();
    // this.initVideo2();
    this.initVideo3();
  },
  beforeDestroy() {
    // if(this.player1) this.player1.player1
  },
  methods: {
    //切换url
    switchUrl() {
      if (!this.videourl) {
        this.videourl = "rtmp://58.200.131.2:1935/livetv/hunantv";
        this.videoType='rtmp/flv';
      } else {
        if(this.videourl.index('rtmp://58.200.131.2')>0){
          this.videourl = "//vjs.zencdn.net/v/oceans.mp4";
          this.videoType='video/mp4';
        }
      }

      // if(this.player1){
      //   this.player1.
      // }
    },
    initVideo() {
      //初始化视频方法
      this.player1 = Video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "400px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px",
      });

      this.player1.on("ended", function () {
        this.dispose();
      });
    },
    initVideo2() {
      //初始化视频方法
      this.player2 = Video("myvideo-2", {}, function () {
        console.log("videojs-2播放器初始化成功");
      });

      this.player2.on("ended", function () {
        this.dispose();
      });
    },

    initVideo3() {
      //初始化视频方法
      this.player3 = Video("myvideo-3", {}, function () {
        console.log("videojs-3播放器初始化成功");

        this.play();
      });

      this.player3.on("ended", function () {
        this.dispose();
      });
    },
  },
};
</script>