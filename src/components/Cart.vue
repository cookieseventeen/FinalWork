<template>
  <div class="pageCart">
    <div class="cartList" :class="{'open': cartStatus}">
      <div class="wrap">
        <div class="inner">
          <div class="cartList--item" v-for="item in cartData.carts" :key="item.id">
            <div class="pic-info">
              <img :src="item.product.imageUrl" :alt="item.product.title">
            </div>
            <div class="text-title pl-2 pr-2">
              {{ item.product.title }}
              <span v-if="deleteItem.indexOf(item.id) != (-1)"><i  class="fas fa-spinner fa-spin"></i></span>
            </div>
            <button type="button" @click="removeCartItem(item.id)" class="deleteItem btn btn-outline-danger btn-sm"><i class="far fa-trash-alt"></i></button>
          </div>
        </div>
        <div class="ctrl-bar p-2">
          <router-link class="btn btn-success" to="/checkorders">
            結帳去
          </router-link>
        </div>
      </div>
    </div>
    <div class="close-cart">
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="num">
      {{ cartNum }}
    </div>
    <button class="cart-btn" @click="toggleCart"><i class="fas fa-cart-plus"></i></button>
  </div>
</template>
<style lang="scss">
  .pageCart {
    position: fixed;
    right: 2%;
    bottom: 12%;
    width: 50px;
    height: 50px;
    border: 2px solid #CCC;
    border-radius: 100%;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    background: #eee;
    z-index: 99;
    
    .num {
      position: absolute;
      right: 90%;
      bottom: 90%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 100%;
      background: #000;
      color: #FFF;
      text-align: center;
      transform: translate(50%, 50%);
    }

    i {
      font-size: 20px;
      transform: translate(-1px, 1px);
    }
  }
  .cart-btn{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    &:focus,
    &:hover,
    &:focus
    :hover{
      outline: none;
    }
  }

  .cartList {
    width: 360px;
    height: 400px;
    position: absolute;
    right: 0;
    bottom: 120%;
    border: 3px solid #CCC;
    border-radius: 6px;
    background: #FFF;
    cursor: auto;
    transform: translateX(10%);
    opacity: 0;
    pointer-events: none;
    transition: opacity .6s ease,transform .6s ease;
    &.open{
      transform: translateY(0%);
      opacity: 1;
      pointer-events: auto;
      box-shadow: 0px 2px 12px rgba(0,0,0,0.2);
    }
    .wrap{
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 4px;
      padding-bottom: 64px;
    }
    .inner {
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      width: 100%;
    }

    .cartList--item {
      text-align: left;
      padding: 4px 8px;
      line-height: 1.7;
      display: flex;
      align-items: center;
      

      &+.cartList--item {
        border-top: 1px solid #CCC;
      }

      .pic-info{
        width: 80px;
        img{
          max-width: 100%;
          width: 100%;
        }
      }

    }

    .ctrl-bar{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #eee;
      border-top: 2px solid #CCC;
    }
  }
  

</style>
<script>
  export default {
    name: 'Cart',
    data() {
      return {
        cartData: {},
        cartStatus: false,
        deleteItem:[]
      };
    },
    computed: {
      cartNum() {
        if (this.cartData.carts) {
          return this.cartData.carts.length < 99 ? this.cartData.carts.length : '99'
        }
      }
    },
    methods: {
      updateCart(cartData) {
        const vm = this;
        vm.cartData = cartData;
      },
      toggleCart(){
        this.cartStatus=!this.cartStatus;
      },
      removeCartItem(id) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        const vm = this;

        vm.deleteItem.push(id);

        this.$http.delete(apiUrl)
          .then(res => {
            vm.getCart();
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
            this.cartData = res.data.data;
          })
          .catch(err => {
            console.error(err);
          });
      },
      closeCart(){
        const vm = this;
        vm.cartStatus= false;
      }
    },
    created() {
      const vm = this;

      // 自定義名稱 'messsage:push'
      // message: 傳入參數
      // status: 樣式，預設值為 warning
      vm.$bus.$on('reflashcart:push', (cartData) => {
        vm.getCart();
      });
      vm.$bus.$on('close-cart:push', (cartData) => {
        vm.closeCart();
      });

      vm.getCart();
      //vm.$bus.$emit('message:push');
    },
  };

</script>
