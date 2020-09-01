<template>
<div>
  <div class="row flex-wrap w-100 my-md-3">
    <div class="col-md-12">
      <h2 class="text-center m-3 p-3">精選範例</h2>
    </div>
    <div v-for="(item,key) in productsDate" :key="key"  class="col-sm-6 pt-3 px-3 pt-md-5 mb-3 px-md-5 text-center  overflow-hidden" :class="{'bg-dark': (key%2)==0,'bg-light': key%2==1,'text-white': key%2==0}" >
      <div class="bg-light shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0; background-position: center" :style="{ backgroundImage:`url(${item.imageUrl})`}"></div>
      <hr>
      <div class="my-3 py-3">
        <h2 class="display-5"> {{item.title}}</h2>
        <p class="lead"> {{ item.content }} </p>
        <button class="btn btn-sm" :class="{'btn-dark': (key%2)==1,'btn-light': key%2==0}" @click.prevent="showProduct(item)">詳細內容</button>
        <button class="btn btn-sm" :class="{'btn-dark': (key%2)==1,'btn-light': key%2==0}" @click.prevent="addToCart(item.id)"><i v-if="item.id === status.loadItem" class="fas fa-spinner fa-spin"></i>加到購物車</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'Feature-Product',
    data() {
      return {
        productsDate: '',
        cartData:'',
        status:{
          loadItem:'',
        }
      }
    },
    methods: {
      getProducts(page = 1) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
        const vm = this;
        this.$http.get(apiUrl)
          .then(res => {
            const allProducts=res.data.products;
            vm.productsDate = allProducts.filter(function(item,index,array){
              return item.is_featured === 1
            });
            
            
          })
          .catch(err => {
            console.error(err);
          });
      },
      addToCart(id, qty = 1) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        const cartData = {
          product_id: id,
          qty
        };
        vm.status.loadItem= id;
        this.$http.post(apiUrl, {
            data: cartData
          })
          .then(res => {
            
            vm.status.loadItem= '';
            vm.getCart();
            this.$bus.$emit('message:push', '商品已加入購物車', 'success');
           // this.getCart();
          })
          .catch(err => {
            console.error(err);
          });
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
      },
      showProduct(productData){
          this.$bus.$emit('productShow:push', productData);
      }
    },
    created() {
      this.getProducts();
      this.getCart();
    },
  }

</script>
