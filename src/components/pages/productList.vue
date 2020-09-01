<template>
  <div class="productList p-5">
    <loading :active.sync="isLoading"></loading>

    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12 mt-3" v-for="item in catalogProduct" :key="item.id">
          <a class="theme-card-anchor" :title="item.title" @click.prevent="showProduct(item)">
            <section class="card card-themes free">
              <figure>
                <img :src="item.imageUrl" class="img-fluid" alt="">
              </figure>
              <header>
                <h2>{{ item.title }}</h2>
              </header>
              <div class="card-body">
                <p>{{ item.content.slice( 0, 100) }}</p>
              </div>
            </section>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .productList {
    .theme-card-anchor {
      height: 100%;

      .card-themes {
        height: 100%;

        h2 {
          font-size: 20px;
          padding: 0 1.25rem;
        }
      }
    }
  }

</style>
<script>
  import $ from 'jquery';
  export default {
    name: 'productList',
    data() {
      return {
        productsData: null,
        isLoading: false,
        catalog: ''
      }
    },
    created() {
      const vm = this;
      vm.getProducts();
      vm.getCart();
      vm.catalog = vm.$route.params.catalog;
    },
    computed: {
      catalogProduct(){
        const vm = this;
        let catalogProductData='';
        
        if(vm.catalog != 'all' && vm.productsData != null ){
          catalogProductData= vm.productsData.filter(function(item,index,array){
              return item.category == vm.catalog
          });
        }else{
          catalogProductData = vm.productsData;
        }
        return catalogProductData
      }
    },
    methods: {
      getProducts() {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(apiUrl)
          .then(res => {
            const allProducts = res.data.products;
            vm.productsData = allProducts;
            vm.isLoading = false;
          })
          .catch(err => {
            console.error(err);
          });
      },
      showProduct(productData) {
        this.$bus.$emit('productShow:push', productData);
      },
      getCart() {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;

        this.$http.get(apiUrl)
          .then(res => {
            vm.cartData = res.data.data;
            this.$bus.$emit('reflashcart:push', vm.cartData);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    watch: {
      $route(to, from) {
        this.catalog = this.$route.params.catalog;
      }
    },
    components: {

    }
  }

</script>
