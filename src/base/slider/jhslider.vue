<template>
  <div class="m-slider">
    <div class="swiper-container" id="jhslider-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in arr" v-bind:key="item.id">
          <img :src="item.picUrl" @load="loadImage" alt="">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    name: 'slider',
    props: {
      arr: Array
    },
    data() {
      return {
        swiper: Swiper,
        hasImgLoadedFinish: false
      }
    },
    methods: {
      loadImage() {
        if (!this.hasImgLoadedFinish) {
          this.hasImgLoadedFinish = true
          this.$emit('hasImgLoadedFinish')
        }
      },
      clickIndex(index) {
        this.$emit('clickIndex', index)
      }
    },
    mounted() {
      const wThis = this
      var swiper = new Swiper('#jhslider-swiper-container', {
        lazy: true,
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        preventClicks: false,
        preventLinksPropagation: false,
        preventDefault: false,
        on: {
          tap: function(event) {
            wThis.clickIndex(this.realIndex)
          }
        }
      })
      this.swiper = swiper
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  .m-slider
    img
      width: 100%
</style>
