<template>
  <div>
    <div>
      <iframe
        :src="ifrmaeSrc"
        width="640"
        height="360"
        allowfullscreen
        allow="autoplay"
      ></iframe>
    </div>
    <div>
      <iframe
        :src="ifrmaeSrctmp"
        width="640"
        height="360"
        allowfullscreen
        allow="autoplay"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifrmaeSrc: "./hikwebsdk/cn/demo.html",
      ifrmaeSrctmp: "./hikwebsdk/cn/demo-easy.html",
    };
  },
};
</script>

<style>
</style>