<template>
  <div class="orders">
    <loading :active.sync="isLoading"></loading>
    
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買項目</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>
            {{ Date(item.create_at) | moment("YYYY-MM-DD") }}
          </td>
          <td>
            {{ item.user.email }}
          </td>
          <td>
            <ul>
              <li v-for="(productItem, key) in item.products" :key="key">
                {{ productItem.product.title }} 數量:{{ productItem.qty + productItem.product.unit}}
              </li>
            </ul>
          </td>
          <td>
            {{ item.total }}
          </td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination  v-if="paginationData" :paginationData="paginationData" v-on:emitPage='getOrder' ></Pagination>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Pagination from '@/components/Pagination';
  export default {
    name:'Order',
    data(){
      return{
        orders:'',
        paginationData: '',
        isLoading: false
      }
    },
    methods: {
      getOrder(page = 1){
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
        const vm = this;
        //呼叫api 資料
        vm.isLoading=true;
        this.$http.get(apiUrl).then(res =>{
          if(!res.data.success){
            vm.$router.push('/login');
          }
          vm.orders=res.data.orders;
          vm.paginationData=res.data.pagination;
          vm.isLoading=false;

        }).catch(err =>{

        });
      }
    },
    created() {
      this.getOrder();
    },
    components:{
      Pagination
    }
  }

  /*
  export default {
    name: 'Orders',
    data() {
      return {
        productsDate: [],
        paginationData: {},
        tempProduct: {},
        isNew: false,
        isLoading: false,
        status: {
          fileUploading: false
        }
      }
    },
    created() {
      this.getProducts();
      this.$bus.$emit('message:push', '這裡是一段訊息', 'success');
    },
    methods: {
      getProducts(page = 1) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
        const vm = this;

        vm.isLoading = true;

        this.$http.get(apiUrl)
          .then(res => {
            if(!res.data.success){
              vm.$router.push('/login');
            }
            vm.productsDate = res.data.products;
            vm.paginationData = res.data.pagination;
            vm.isLoading = false;
          })
          .catch(err => {
            console.error(err);
          });
      },
      openModal(isNew, item) {
        if (isNew) {
          this.tempProduct = {};
          this.isNew = true;
        } else {
          this.tempProduct = Object.assign({}, item);
          this.isNew = false;
        }
        $('#productModal').modal('show');
      },
      deleteModal(item) {
        this.tempProduct = Object.assign({}, item);
        $('#delProductModal').modal('show');
      },
      uploadfile() {
        const upconfileFile = this.$refs.files.files[0];
        const vm = this;
        const fromData = new FormData();
        fromData.append('file-to-upload', upconfileFile);
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;

        vm.status.fileUploading = true;

        this.$http.post(url, fromData, {
          herders: {
            'Content-type': 'multipart/form-data'
          }
        }).then((response) => {
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            vm.status.fileUploading = false;
          } else {
            this.$bus.$emit('message:push', response.data.message, 'danger');
          }
        });
      },
      upDateProduct() {
        const vm = this;
        let apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
        let httpMethod = 'post';


        if (!vm.isNew) {
          apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
          httpMethod = 'put';
        }

        this.$http[httpMethod](apiUrl, {
            data: vm.tempProduct
          })
          .then(res => {

            if (res.data.success) {
              $('#productModal').modal('hide');
            } else {
              $('#productModal').modal('hide');
            }
            this.getProducts();
          })
          .catch(err => {
            console.error(err);
          });
      },
      deleteProduct() {
        const vm = this;
        let apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        let httpMethod = 'delete';

        this.$http[httpMethod](apiUrl, {
            data: vm.tempProduct
          })
          .then(res => {

            if (res.data.success) {
              $('#delProductModal').modal('hide');
              vm.tempProduct = {};
            } else {
              $('#delProductModal').modal('hide');
            }

            this.getProducts();
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    components: {
      Pagination
    }
  }
  */
</script>
