<template>
  <div>
      <!-- require('@/assets/map/'+pic)  不可用，报错 ，需要在 vue.config.js中 的 url-loader 中增加处理-->

    <button @click="changePic">动态切换pic</button>
    <img :src ="require('@/assets/map/'+pic)" />
  </div>
</template>

<script>
export default {

    data(){
        return{
            pic:"map-y1.PNG",
        }
    },
    methods: {
        changePic(){
            this.pic="logo.png"
        }
    },
}
</script>

<style>
</style>