// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;

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

  console.log('to:',to,'from:', from,'next:', next);
  
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證');
    const apiUrl = `${process.env.APIPATH}/api/user/check`;
    
    axios.post(apiUrl)
      .then(res => {
        console.log('驗證如何？：',res.data);
        console.log('驗證如何？：',res.data.success);

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
