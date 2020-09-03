<template>
  <div class="indexPage">
     <loading :active.sync="isLoading"></loading>
    <Slider></Slider>
    <FeaturedProduct :featureProductsDate="featureProductsDate"></FeaturedProduct>
  </div>
</template>

<script>
  import $ from 'jquery';
  import FeaturedProduct from '../FeaturedProduct';
  import Slider from '../Slider';
  export default {
    name: 'indexPage',
    data() {
      return {
        isLoading: false,
        featureProductsDate: '',

      }
    },
    created() {
      this.getFeatureProducts();
    },
    methods: {
      getFeatureProducts() {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(apiUrl)
          .then(res => {
            const allProducts=res.data.products;
            vm.featureProductsDate = allProducts.filter(function(item,index,array){
              return item.is_featured === 1
            });
            vm.isLoading = false;
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    components: {
      FeaturedProduct,
      Slider
    }
  }

</script>
