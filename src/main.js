// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from "vue-moment";
import VueYoutube from 'vue-youtube';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW',zhTWValidate);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);


Vue.use(moment);
Vue.prototype.$Moment = moment;

Vue.use(VueYoutube);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const apiUrl = `${process.env.APIPATH}/api/user/check`;
    axios.post(apiUrl)
      .then(res => {
        if (res.data.success) {
          next();
        } else {
          next({
            path: '/login',
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
      
  } else {
    next();
  }
  
});
