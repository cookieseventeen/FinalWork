<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="openModal(true)">建立新的產品</button>
      <!-- Modal -->

    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-right">原價</th>
          <th width="120" class="text-right">售價</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
          <th width="120">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in productsDate" :key="key">
          <td>
            {{ item.category }}
          </td>
          <td>
            {{ item.title }}
          </td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency}}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else> 未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(false,item)">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click.prevent="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal-wrap">
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                      v-model="tempProduct.imageUrl" >
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                      <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control" ref="files" @change="uploadfile">
                  </div>
                  <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" :class="{'is-invalid': errors.has('title')}" id="title" name="title" placeholder="請輸入標題" v-model="tempProduct.title" v-validate="'required'">
                    <span class="text-danger" v-if="errors.has('title')">標題必須輸入</span>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                        v-model="tempProduct.category">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                        v-model="tempProduct.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" :class="{'is-invalid': errors.has('price')}" id="price" name="price" placeholder="請輸入售價"
                        v-model="tempProduct.price" v-validate="'required'">
                      <span class="text-danger" v-if="errors.has('price')">價格必須輸入</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="DemoSite">Demo Site:</label>
                      <input type="text" class="form-control" id="DemoSite" placeholder="請輸入展示網站"
                        v-model="tempProduct.demoSite">
                    </div>
                  </div>
                  <div class="form-row">
                    <label for="Youtube">Youtube</label>
                    <div class="form-group input-group col-md-12">
                      <input type="text" class="form-control" id="Youtube" placeholder="請輸入Youtube連結"
                        v-model="tempProduct.youtube">
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button"
                          @click="getYoutubeData">覆蓋Youtube資料</button>
                      </div>
                    </div>
                  </div>

                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                      v-model="tempProduct.description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"
                      v-model="tempProduct.content"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled"
                        :true-value="1" :false-value="0">
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="is_featured" v-model="tempProduct.is_featured"
                        :true-value="1" :false-value="0">
                      <label class="form-check-label" for="is_featured">
                        精選商品
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click.prevent="upDateProduct">確認</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination v-if="paginationData" :paginationData="paginationData" v-on:emitPage='getProducts'></Pagination>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Pagination from '@/components/Pagination';


  import getYouTubeID from 'get-youtube-id';

  export default {
    name: 'Products',
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
      //this.$bus.$emit('message:push', '這裡是一段訊息', 'success');
    },
    methods: {
      getProducts(page = 1) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
        const vm = this;

        vm.isLoading = true;

        this.$http.get(apiUrl)
          .then(res => {

            if (!res.data.success) {
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

        this.$validator.validate().then((result) => {
            if (result) {
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
          } else {
            vm.$bus.$emit('message:push', '請確認輸入的內容是否正確', 'danger');
          }
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
      },
      getYoutubeData() {
        const vm = this;
        if (vm.tempProduct.youtube) {

          vm.isLoading = true;

          const youtubeID = getYouTubeID(vm.tempProduct.youtube)
          const youtubeLink =
            `${process.env.YOUTUBEAPIPATH}?&id=${youtubeID}&key=${process.env.YOUTUBEKEY}&part=snippet,statistics&fields=items(id,snippet,statistics)`;

          this.$http.get(youtubeLink, {
              withCredentials: false
            })
            .then(res => {



              const youtubeData = res.data.items[0];

              vm.tempProduct.title = youtubeData.snippet.title;
              vm.tempProduct.imageUrl = youtubeData.snippet.thumbnails.standard.url;
              vm.tempProduct.content = youtubeData.snippet.description;


              vm.isLoading = false;
            })
            .catch(err => {
              vm.isLoading = false;
            });
        }
      }
    },
    components: {
      Pagination
    }
  }

</script>
