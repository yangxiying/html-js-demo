<template>
  <!-- <div> -->
    <!-- Slider main container -->
    <div class="swiper-container">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
    </div>
  <!-- </div> -->
</template>

<script>
// import Swiper JS
import Swiper, { Navigation, Pagination } from "swiper";

// import Swiper from "swiper/bundle";

// import Swiper styles
// import "swiper/swiper-bundle.css";

// import "swiper/css/swiper.css";


// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

let mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

//   // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

//   // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  on: {
    init: function () {
      console.log('swiper initialized');
    },
  },
})

export default {};
</script>

<style>

.swiper-container {
    width: 600px;
    height: 300px;
}

.swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
</style>