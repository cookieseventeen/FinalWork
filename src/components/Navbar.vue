<template>
  <div class="navbar-wrap sticky-top">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">前端萬事屋</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse"
        data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      signout(){
        const vm= this;
        const url= `${process.env.APIPATH}/logout`;
        this.$http.post(url).then((response) => {
          if (response.data.success) {
            vm.$router.push('/signin');
          }
        });
      }
    },
    created() {

    },
  }

</script>