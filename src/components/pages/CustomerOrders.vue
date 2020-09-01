<template>
  <div class="CustomerOrders">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in productsDate" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage :`url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6" v-if="!item.price">原價 {{ item.origin_price | currency }} 元</del>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price | currency }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price | currency}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
              <i v-if="item.id === status.loadItem" class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)">
              <i v-if="item.id === status.cartItem" class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ modalData.title }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="modalData.imageUrl" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">
                {{ modalData.content }}
              </p>
              <footer class="blockquote-footer text-right">
                {{ modalData.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6" v-if="!modalData.price">原價 {{ modalData.origin_price | currency }} 元</del>
              <del class="h6" v-if="modalData.price">原價 {{ modalData.origin_price | currency }} 元</del>
              <div class="h5" v-if="modalData.price">現在只要 {{ modalData.price | currency}} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="modalData.num" placeholder="請選擇數量">
              <option v-for="unitNum in 10" :key="unitNum" :value="unitNum">
                選購 {{ unitNum }} {{ modalData.unit }}
              </option>
            </select>
            <!--
              
              -->
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong> {{ modalData.num * modalData.price }} </strong> 元
            </div>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="addToCart(modalData.id, modalData.num)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <Pagination v-if="paginationData.total_pages" :paginationData="paginationData" v-on:emitPage='getProducts'>
    </Pagination>
    <hr>
    <hr>
    <div class="cart-table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartData.carts" :key="item.id">
            <td><button type="button" class="deleteItem btn btn-outline-danger btn-sm"
                @click.prevent="removeCartItem(item.id)"><i class="far fa-trash-alt"></i></button></td>
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }} / {{ item.product.unit }} </td>
            <td> {{ item.product.price }} </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>總計</td>
            <td>{{ cartData.total }}</td>
          </tr>
          <tr v-if=" cartData.total != cartData.final_total">
            <td></td>
            <td></td>
            <td>折扣價</td>
            <td>{{ cartData.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary " type="button" @click="addCouponCode">套用優惠碼</button>
        </div>
      </div>
    </div>
    <hr>
    <hr>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createdOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail" v-model="form.user.email"
            v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}" placeholder="請輸入 Email" >
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username" v-model="form.user.name"
            v-validate="'required'" :class="{'is-invalid': errors.has('name')}" placeholder="輸入姓名" >
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" name="phonenumber" id="usertel" v-model="form.user.tel" v-validate="'required'" :class="{'is-invalid': errors.has('phonenumber')}" placeholder="請輸入電話">
          <span class="text-danger" v-if="errors.has('phonenumber')">請輸入電話</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
             v-validate="'required'" :class="{'is-invalid': errors.has('address')}" placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'CustomOrder',
    data() {
      return {
        productsDate: [],
        cartData: {},
        modalData: {},
        paginationData: {},
        coupon_code: '',
        isLoading: false,
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: ''
          },
          message: ''
        },
        status: {
          loadItem: '',
          cartItem: '',
        }
      }
    },
    created() {
      this.getProducts();
      this.getCart();
      //this.$bus.$emit('message:push', '這裡是一段訊息', 'success');
    },
    methods: {
      getProducts(page = 1) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
        const vm = this;

        vm.isLoading = true;

        this.$http.get(apiUrl)
          .then(res => {
            vm.productsDate = res.data.products;
            vm.paginationData = res.data.pagination;
            vm.isLoading = false;
          })
          .catch(err => {
            console.error(err);
          });
      },
      getProduct(id) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        const vm = this;

        vm.isLoading = true;
        vm.status.loadItem = id;
        vm.modalData = {};

        this.$http.get(apiUrl)
          .then(res => {
            vm.modalData = res.data.product;
            console.log(vm.modalData,res.data.product);
            
            vm.isLoading = false;

            $('#productModal').modal('show');
            vm.status.loadItem = '';
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
        }
        vm.status.cartItem = id;
        this.$http.post(apiUrl, {
            data: cartData
          })
          .then(res => {
            vm.status.cartItem = '';
            $('#productModal').modal('hide');
            this.getCart();
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
            vm.isLoading = false;
          })
          .catch(err => {
            console.error(err);
          });
      },
      removeCartItem(id) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        const vm = this;

        vm.status.cartItem = id;

        vm.isLoading = true;

        this.$http.delete(apiUrl)
          .then(res => {
            vm.getCart();
          })
          .catch(err => {
            console.error(err);
          });
      },
      addCouponCode() {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const vm = this;
        const coupon = {
          code: vm.coupon_code
        }

        this.$http.post(apiUrl, {
            data: coupon
          })
          .then(res => {
            if (!res.data.success) {
              this.$bus.$emit('message:push', res.data.message, 'danger');
            }

          })
          .catch(err => {
            console.error(err);
          });
      },
      createdOrder() {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const vm = this;
        const order = vm.form;

        this.$validator.validate().then((result) => {
          if (result) {
            this.$http.post(apiUrl, {
                data: order
              })
              .then(res => {
                if (!res.data.success) {
                  this.$bus.$emit('message:push', res.data.message, 'danger');
                } else {
                  this.$bus.$emit('message:push', res.data.message, 'success');
                  vm.$router.push(`/test/customer_checkout/${res.data.orderId}`);
                }
                vm.getCart();
              })
              .catch(err => {
                console.error(err);
              });

          } else {
            vm.$bus.$emit('message:push', '請確認輸入的內容是否正確', 'danger');
          }
        });
      },
      playVideo() {
        this.player.playVideo()
      },
      playing() {
        console.log('\o/ we are watching!!!')
      }
    },
    components: {
      Pagination
    },
    computed: {
      player() {
        return this.$refs.youtube.player
      }
    }
  }

</script>
<style lang="scss">
  .cart-table-wrap {
    max-width: 800px;
    margin: 0 auto;
  }

</style>
