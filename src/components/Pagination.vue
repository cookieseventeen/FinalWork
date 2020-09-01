<template>
  <div class="pagination-wrap">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !childPaginationData.has_pre }" ><a class="page-link" href="#" @click.prevent="setPage(childPaginationData.current_page - 1)">Previous</a></li>
        <li class="page-item" :class="{'active': page === childPaginationData.current_page }" v-for="page in childPaginationData.total_pages" :key="page">
          <a class="page-link" href="#" @click.prevent="setPage(page)" >{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !childPaginationData.has_next }" ><a class="page-link" href="#" @click.prevent="setPage(childPaginationData.current_page + 1)">Next</a></li>
      </ul>
    </nav>
    <!--
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled' : !paginationData.has_pre}">
          <a class="page-link" href="#" @click.prevent="getProducts(paginationData.current_page - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="page in paginationData.total_pages" :key="page" :class="{'active': page === paginationData.current_page }">
          <a class="page-link" href="#" @click="getProducts(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled' : !paginationData.has_next}" >
          <a class="page-link" href="#" @click.prevent="getProducts(paginationData.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
    -->
  </div>
</template>

<script>

  export default {
    name: 'Pagination',
    data() {
      return {
        childPaginationData: this.paginationData,
      }
    },
    props:['paginationData'],
    created() {
      /*
      this.getProducts();
      this.$bus.$emit('message:push', '這裡是一段訊息', 'success');
      */
    },
    methods: {
      setPage(page=1){
        this.$emit('emitPage',page);
      },
      updata(){
        this.childPaginationData=this.paginationData;
      }
    },
    watch: {
      paginationData(){        
        this.updata();
      }
    },
  }

</script>
