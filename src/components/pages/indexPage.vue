<template>
  <div class="indexPage">
    <Slider></Slider>
    <FeaturedProduct></FeaturedProduct>
  </div>
</template>

<script>
  import $ from 'jquery';
  import FeaturedProduct from '../FeaturedProduct';
  import Slider from '../Slider';
  export default {
    name: 'indexPage',
    data() {
      return {}
    },
    created() {

    },
    methods: {

    },
    components: {
      FeaturedProduct,
      Slider
    }
  }

</script>
