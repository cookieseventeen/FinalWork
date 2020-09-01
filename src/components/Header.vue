<template>
  <div class="navbar-wrap sticky-top">
    <nav class="site-header py-1">
      <div class="container d-flex flex-column flex-md-row justify-content-between">
        <router-link class="py-2 d-none d-md-inline-block" to="/products/all">
          <i class="fas fa-asterisk fa-spin mr-1"></i>點我開始
        </router-link>
        <router-link class="py-2 d-none d-md-inline-block" to="/products/GoogleMap API">
          GoogleMap API
        </router-link>
        <router-link class="py-2 d-none d-md-inline-block" to="/products/滾動式互動">
          滾動式互動
        </router-link>
        <router-link class="py-2 d-none d-md-inline-block" to="/products/輪播圖">
          輪播圖
        </router-link>
        <router-link class="py-2 d-none d-md-inline-block" to="/products/選單套件">
          選單套件
        </router-link>
        <!--
        <a class="py-2 d-none d-md-inline-block" href="#">GoogleMap API</a>
        <a class="py-2 d-none d-md-inline-block" href="#">滾動式互動</a>
        <a class="py-2 d-none d-md-inline-block" href="#">輪播圖</a>
        <a class="py-2 d-none d-md-inline-block" href="#">選單套件</a>
        -->
        <router-link class="py-2 d-none d-md-inline-block" to="/checkorders">結帳</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
    },
    created() {
    },
  }

</script>
