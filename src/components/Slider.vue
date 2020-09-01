<template>
  <div class="sliderWrap">
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div class="col-md-6 p-lg-5 mx-auto my-5">
        <h1 class="display-4 font-weight-normal">你的網站我來武裝</h1>
        <p class="lead font-weight-normal pt-3">對於你的網站有任何的不滿意嗎？</p>
        <p class="lead font-weight-normal">有任何功能需要客製嗎？</p>
        <router-link class="btn btn-outline-secondary" to="/products/all">
          讓我們開始
        </router-link>
      </div>
      <div class="product-device shadow-sm d-none d-md-block"></div>
      <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Slide',
    data() {
      return {
        
      }
    },
    methods: {

    },
    created() {

    },
  }

</script>
