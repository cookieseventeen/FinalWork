<template>
  <div class="login">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="user.username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="user.password">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login">Sign in</button>
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:{
        username:'',
        password:''
      }
    }
  },
  methods: {
    login(){
      const apiUrl=`${process.env.APIPATH}/admin/signin`;
      const vm=this;
      this.$http.post(apiUrl,vm.user)
      .then(res => {
        console.log(res.data.success);
        
        if(res.data.success){
          vm.$router.push('/admin');
        }else{
          alert('登入失敗,請確認帳號密碼')
        }
      })
      .catch(err => {
        console.error(err); 
      });
    }
  },
}
</script>
<style lang="scss" scoped>
  .form-signin{
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
</style>