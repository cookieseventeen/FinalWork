<template>
  <div class="products">
    tttttt
  </div>
</template>

<script>
  export default {
    name: 'Products',
    data() {
      return {
        productsDate: []
      }
    },
    created() {
      this.getProducts();
    },
    methods: {
      getProducts() {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`;
        const vm = this;
        this.$http.get(apiUrl)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
