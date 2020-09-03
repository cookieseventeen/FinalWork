<template>
  <div class="showProduct" :class="{'open': status.show }">
    <button type="button" class="close close-btn" @click="hideProduct" aria-label="Close">
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <div class="video-wrap">
      <div id="youtubePlayer" :class="{'playing': status.playing }">
        <youtube :video-id="videoId" :resize="true" :fitParent="true" :player-vars="playerVars" ref="youtube"
          @playing="playing" @ended="ended"></youtube>
          <div class="loadVideo ">
            <i class="fas fa-compact-disc fa-spin mr-2"></i>Loading Video
          </div>
      </div>
    </div>
    <div class="video-info p-5">
      <div class="inner">
        <h2 class="title"> {{ productDetail.title }} </h2>
        <div class="category">
          <span class="badge badge-secondary">{{ productDetail.category }}</span>
        </div>
        <div class="discription mt-3">
          {{ productDetail.content }}
        </div>
        <div class="demoLink mt-3 mb-5">
          <div class="mt-3 mb-1 font-weight-bold tips">請點擊下面連結前往展示網站：</div>
          <div class="item" v-if="productDetail.demoSite">
            <a :href="productDetail.demoSite" target="_blank">{{ productDetail.demoSite }} </a>
          </div>
          <div class="item" v-if="!productDetail.demoSite">
            <a :href="productDetail.codepen" target="_blank">{{ productDetail.demoSite }} </a>
          </div>
        </div>
        <div class="crtl-bar">
          <div class="d-flex justify-content-between align-items-baseline p-3 pr-5 pl-5">
            <!-- <div class="h5">2,800 元</div> -->
            <del class="h6" v-if="!productDetail.price">原價 {{ productDetail.origin_price | currency }} 元</del>
            <del class="h6" v-if="productDetail.price">原價 {{ productDetail.origin_price | currency }} 元</del>
            <div class="h5" v-if="productDetail.price">現在只要 {{ productDetail.price | currency}} 元</div>
          </div>
          <div class=" d-flex justify-content-between align-items-baseline p-3 pr-5 pl-5">
            <button class="btn btn-info" @click="hideProduct">關閉</button>
            <button class="btn btn-success" @click="addToCart(productDetail.id)"><i v-if="productDetail.id === status.loadItem" class="fas fa-spinner fa-spin mr-2"></i>加到購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .showProduct {
    background: #FFF;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 1021;
    transform: translateY(-100%);
    transition: transform 0.6s ease,opacity 0.6s ease;

    &.open {
      transform: translate(0%);
      opacity: 1;

      .close-btn {
        .bar {
          &:nth-child(1) {
            transform: rotate(45deg);
          }

          &:nth-child(2) {
            transform: rotate(-45deg);
          }
        }
      }
    }

    .close-btn {
      width: 36px;
      height: 36px;
      position: absolute;
      right: 10px;
      top: 5px;
      cursor: pointer;
      z-index: 2;
      transition: transform 0.6s ease;
      .bar {
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        background: #CCC;
        transition: transform 0.6s ease;
      }
      &:hover{
        transform: rotate(45deg);
      }
    }

    .video-wrap {
      position: absolute;
      width: 70%;
      height: 100%;
      left: 0;
      top: 0;
      background: #000;

    }
  }

  #youtubePlayer {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;

    .loadVideo {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: #FFF;
      transition: opacity 1s ease; 
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
    }
    /*
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: #FFF;
      transition: opacity 1s ease,transform 1s;
      z-index: 2;
    }*/

    &.playing {
      .loadVideo{
        transition-delay: .4s;
        opacity: 0;
      }
    }
  }

  .video-info {
    position: absolute;
    right: 0;
    width: 30%;
    top: 0;
    height: 100%;
    .inner{
      overflow-y: auto;
      overflow-x: hidden;
      height: 85%;
    }
  }

  .crtl-bar {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    background: #f7f7f7;
    border-top: 1px solid #CCC;
  }

  .tips{
    font-size: 16px;
  }

</style>
<script>
  import getYouTubeID from 'get-youtube-id';
  export default {
    name: 'showProduct',
    data() {
      return {
        productDetail: {

        },
        status: {
          show: false,
          playing: false,
          loadItem:''
        },
        videoId: '',
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          playsinline: 0
        }
      };
    },
    methods: {
      showProduct(productData) {
        const vm = this;
        vm.productDetail = productData;
        vm.status.show = true;
        vm.videoId = getYouTubeID(productData.youtube);
        document.querySelector('body').classList.add("open");
        vm.playVideo();

      },
      hideProduct() {
        const vm = this;
        vm.status.show = false;
        vm.status.playing = false;

        document.querySelector('body').classList.remove("open");
        vm.pausedVideo();
      },
      playVideo() {
        this.player.playVideo()
      },
      pausedVideo() {
        this.player.pauseVideo()
      },
      playing() {
        console.log('\o/ we are watching!!!');
        this.status.playing = true;
      },
      ended() {
        this.playVideo();
      },
      getCart() {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;

        this.$http.get(apiUrl)
          .then(res => {
            vm.cartData = res.data.data;
            this.$bus.$emit('reflashcart:push', vm.cartData);
          })
          .catch(err => {
            console.error(err);
          });
      },
      addToCart(id, qty = 1) {
        const apiUrl = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        const cartData = {
          product_id: id,
          qty
        };
        vm.status.loadItem= id;
        this.$http.post(apiUrl, {
            data: cartData
          })
          .then(res => {
            
            vm.status.loadItem= '';
            vm.getCart();
            this.$bus.$emit('message:push', '商品已加入購物車', 'success');
            vm.hideProduct();
           // this.getCart();
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
    created() {
      const vm = this;

      // 自定義名稱 'messsage:push'
      // message: 傳入參數
      // status: 樣式，預設值為 warning
      vm.$bus.$on('productShow:push', (productData) => {
        vm.showProduct(productData);
      });
      //vm.$bus.$emit('message:push');
    },
    computed: {
      player() {
        return this.$refs.youtube.player
      }
    }
  };

</script>
