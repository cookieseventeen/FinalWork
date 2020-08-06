<template>
  <div class="index">
    <a @click.prevent="logout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    logout(){
      const apiUrl=`${process.env.APIPATH}/logout`;
      const vm=this;
      this.$http.post(apiUrl)
      .then(res => {
        console.log(res.data.success);
        if(res.data.success){
          vm.$router.push('/login');
        }
      })
      .catch(err => {
        console.error(err); 
      });
    }
  },
  created() {
    console.log('這裡是首頁');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
