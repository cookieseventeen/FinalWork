<template>
  <div class="CheckOrders">
    <loading :active.sync="isLoading"></loading>
    <div class="cart-table-wrap pt-5 mt-5">
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
      <hr>
      <div class="container">
        <div class="my-5 row justify-content-center">
          <form class="col-md-12" @submit.prevent="createdOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" name="email" id="useremail" v-model="form.user.email"
                v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}" placeholder="請輸入 Email">
              <span class="text-danger" v-if="errors.has('email')">
                {{ errors.first('email') }}
              </span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" name="name" id="username" v-model="form.user.name"
                v-validate="'required'" :class="{'is-invalid': errors.has('name')}" placeholder="輸入姓名">
              <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" name="phonenumber" id="usertel" v-model="form.user.tel"
                v-validate="'required'" :class="{'is-invalid': errors.has('phonenumber')}" placeholder="請輸入電話">
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
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';

  export default {
    name: 'CheckOrder',
    data() {
      return {
        cartData: {},
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
          cartItem: '',
        }
      }
    },
    created() {
      // this.getProducts();
      this.getCart();
      //this.$bus.$emit('message:push', '這裡是一段訊息', 'success');
      this.$bus.$emit('close-cart:push');
    },
    methods: {
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
            } else {
              this.$bus.$emit('message:push', res.data.message, 'success');
              vm.getCart();
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
                  vm.$router.push(`/checkoutorder/${res.data.orderId}`);
                  this.$bus.$emit('reflashcart:push');
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
      }
    },
  }

</script>
<style lang="scss">
  .cart-table-wrap {
    max-width: 800px;
    margin: 0 auto;
  }

</style>
