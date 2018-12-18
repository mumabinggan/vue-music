<template>
  <div class="m-scrollview">
    <div class="swiper-container" :ref="this.containerIdName" :id="this.containerIdName">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <!-- Add Scroll Bar -->
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import JHGlobal from 'common/js/global.js'
  export default {
    name: 'scrollview',
    props: {
      mousewheel: {
        type: Boolean,
        default: false
      },
      onlistenslidepositionchange: {
        type: Boolean,
        default: false
      },
      onlistenslideindexchange: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        swiper: Swiper,
        containerIdName: JHGlobal.swiperContainerIdName(),
        animatingTimer: null
      }
    },
    methods: {
      update() {
        this.swiper.updateSlides()
      },
      sliderTo(index, animated = true, speed = 350) {
        this.swiper.slideTo(index, speed, animated)
      },
      checkoutAnimation() {
        this.animatingTimer = setInterval(() => {
          if (this.swiper.animating) {
            this.handlePostionChange()
            this.handleSlideIndexChange()
          } else {
            clearTimeout(this.animatingTimer)
          }
        }, 10)
      },
      handlePostionChange() {
        if (this.onlistenslidepositionchange) {
          this.$emit('onSlidePostionChange', this.swiper.getTranslate())
        }
      },
      handleSlideIndexChange() {
        if (this.onlistenslideindexchange) {
          let slides = this.swiper.slides
          const length = slides.length
          for (let index = 0; index < length; ++index) {
            if (index + 1 < length) {
              if (slides[0].progress < 1.0) {
                this.$emit('onSlideIndexChange', 0)
                break
              }
              if (slides[index].progress >= 1.0 &&
                slides[index + 1].progress >= 0.0 &&
                slides[index + 1].progress < 1.0) {
                this.$emit('onSlideIndexChange', index + 1)
                break
              }
            } else {
              this.$emit('onSlideIndexChange', index)
              break
            }
          }
        }
      }
    },
    mounted() {
      let className = '#' + JHGlobal.swiperContainerIdName()
      let wThis = this
      const swiper = new Swiper(className, {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        observer: true,
        observeParents: true,
        mousewheel: true,
          on: {
            onSlideChangeEnd: function(swiper) {
              this.update()
            },
            // setTransition: function(){
            //   console.log('setTransition:')
            // },
            // progress: function(progress) {
            //   console.log(progress)
            // },
            // setTransition: function (transition) {
            //   // console.log('transition:' + transition)
            // },
            // transitionStart: function() {
            //   wThis.handlePostionChange()
            //   wThis.handleSlideIndexChange()
            // },
            // transitionEnd: function() {
            //   wThis.handlePostionChange()
            //   wThis.handleSlideIndexChange()
            // },
            // touchMove: function(event) {
            //   wThis.handlePostionChange()
            //   wThis.handleSlideIndexChange()
            // },
            setSTranslate: function (translate) {
              // if (wThis.onlistenslidepositionchange) {
              //   // console.log('getTranslate:' + this.getTranslate())
              //   // console.log('translate:' + translate)
              //   wThis.$emit('onSlidePostionChange', translate)
              // }
              // if (wThis.onlistenslideindexchange) {
              //   let slides = this.swiper.slides
              //   const length = slides.length
              //   for (let index = 0; index < length; ++index) {
              //     if (index + 1 < length) {
              //       if (slides[0].progress < 1.0) {
              //         wThis.$emit('onSlideIndexChange', 0)
              //         break
              //       }
              //       if (slides[index].progress >= 1.0 &&
              //           slides[index + 1].progress >= 0.0 &&
              //           slides[index + 1].progress < 1.0) {
              //           wThis.$emit('onSlideIndexChange', index + 1)
              //         break
              //       }
              //     } else {
              //       wThis.$emit('onSlideIndexChange', index)
              //       break
              //     }
              //   }
              // }
            }
          }
      })
      this.swiper = swiper
      this.swiper.on('transitionStart', function () {
        wThis.checkoutAnimation()
      })
      this.swiper.on('transitionEnd', function () {
        wThis.handleSlideIndexChange()
        wThis.handlePostionChange()
      })
      // this.swiper.on('touchMove', function () {
      //   console.log('touchMove')
      //   wThis.handleSlideIndexChange()
      //   wThis.handlePostionChange()
      // })
      // this.swiper.on('progress', function () {
      //   console.log('progress')
      //   // wThis.handleSlideIndexChange()
      //   // wThis.handlePostionChange()
      // })
      this.swiper.on('setTranslate', function () {
        wThis.handleSlideIndexChange()
        wThis.handlePostionChange()
      })
      // this.swiper.on('setTransition', function (transition) {
      //   console.log('setTransition')
      //   // wThis.handleSlideIndexChange()
      //   // wThis.handlePostionChange()
      // })
      // this.swiper.on('autoplay', function () {
      //   console.log('autoplay')
      //   // wThis.handleSlideIndexChange()
      //   // wThis.handlePostionChange()
      // })
      JHGlobal.addSwiperCount()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  .m-scrollview
    .swiper-container
      width: 100%
      height: 100%
      overflow visible
</style>
