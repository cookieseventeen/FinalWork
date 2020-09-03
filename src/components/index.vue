<template>
  <div class="index">
      <div class="logo-wrap text-center">
         <router-link class="py-2 d-none d-md-inline-block logo" to="/">
          萬事屋
        </router-link>
      </div>
    <Header></Header>
    <div class="main">
      <router-view></router-view>
    </div>
    <Footer></Footer>
    <Cart></Cart>
    <Alert></Alert>
    <showProduct ></showProduct>
  </div>
</template>

<script>
  import Header from './Header';
  import Footer from './Footer';
  import Cart from './Cart';
  import Alert from './AlertMessage';
  import showProduct from './showProduct';

  export default {
    name: 'Index',
    data() {
      return {
          openShowProduct:false
      }
    },
    methods: {},
    created() {},
    components: {
      Header,
      Footer,
      Cart,
      Alert,
      showProduct
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
   @import "../assets/scss/index";
</style>
