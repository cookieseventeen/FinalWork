<template>
  <div class="coupons">
    <loading :active.sync="isLoading"></loading>
    <div class="mt-4">
      <button class="btn btn-primary" @click.prevent="openModal(true)">建立新的優惠卷</button>
      <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增優惠卷</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="title">優惠卷名稱</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入" v-model="tempCoupon.title">
                  </div>
                  <div class="form-group">
                    <label for="code">優惠碼</label>
                    <input type="text" class="form-control" id="code" placeholder="請輸入" v-model="tempCoupon.code">
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="percent">折購百分比</label>
                      <input type="number" class="form-control" id="percent" placeholder="請輸入折扣百分比"
                        v-model="tempCoupon.percent">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="endDate">到期日</label>
                      <input type="date" class="form-control" id="endDate" placeholder="請輸入結束日期" v-model="tempTime">
                    </div>
                  </div>
                  <hr>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled"
                        :true-value="1" :false-value="0">
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="upDateCoupon">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td> {{ item.title }} </td>
          <td> {{ item.percent }}％ </td>
          <td> {{ item.due_date | moment("YYYY-MM-DD") }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">已啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>

            <!--<button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(false,item)">編輯</button>-->
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination  v-if="paginationData" :paginationData="paginationData" v-on:emitPage='getCoupon' ></Pagination>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Pagination from '@/components/Pagination';
  import moment from 'moment';
  export default {
    name:'coupons',
    data(){
      return{
        coupons:'',
        paginationData: '',
        tempTime:'',
        isNew:false,
        tempCoupon: {},
        couponData: {},
        isLoading: false
      }
    },
    methods: {
      getCoupon(page = 1){
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
        const vm = this;
        //呼叫api 資料
        vm.isLoading = true;
        this.$http.get(apiUrl).then(res =>{

          if(!res.data.success){
            vm.$router.push('/login');
          }
          vm.coupons=res.data.coupons;
          vm.paginationData=res.data.pagination;
          vm.isLoading = false;

        }).catch(err =>{
            console.error(err); 
        });
      },
      openModal(isNew = false,item){
        const vm = this;

        if(isNew){
          vm.isNew=true;
          vm.tempCoupon={};
          vm.tempTime='';
        }else{
          vm.isNew = false;
          vm.tempCoupon = Object.assign({}, item);
          vm.tempTime=moment(item.due_date).format('yyyy-MM-DD');
        }

        $('#couponModal').modal('show');
      },
      upDateCoupon(){
        const vm = this;

        let apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/`;
        let httpMethod='post';

        if (!vm.isNew) {
          apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
          httpMethod = 'put';
        }

        vm.tempCoupon.due_date=(new Date(vm.tempTime)).valueOf();

        this.$http[httpMethod](apiUrl,{data:vm.tempCoupon}).then(res =>{
          if(res.data.success){
            vm.getCoupon();
            $('#couponModal').modal('hide');
          }
        }).catch(err => {
          console.error(err); 
        });
      }
    },
    created() {
      this.getCoupon();
    },
    components:{
      Pagination
    }
  }
</script>
