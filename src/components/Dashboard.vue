<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';

  export default {
    name: 'Dashboard',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      Navbar,
      Sidebar
    },
    methods: {

    },
    created() {

    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
