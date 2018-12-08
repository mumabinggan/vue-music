<template>
  <div class="m-scrollview">
    <div class="swiper-container" id="jsscrollview-swiper-container">
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
        swiper: Swiper
      }
    },
    methods: {
      update() {
        this.swiper.updateSlides()
      },
      sliderTo(index, animated = true, speed = 350) {
        this.swiper.slideTo(index, speed, animated)
      }
    },
    mounted() {
      let wThis = this
      const swiper = new Swiper('#jsscrollview-swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        observer: true,
        mousewheel: true,
          on: {
            onSlideChangeEnd: function(swiper) {
              this.update()
            },
            setTranslate: function (translate) {
              if (wThis.onlistenslidepositionchange) {
                wThis.$emit('onSlidePostionChange', translate)
              }
              if (wThis.onlistenslideindexchange) {
                let slides = this.slides
                const length = slides.length
                for (let index = 0; index < length; ++index) {
                  if (index + 1 < length) {
                    if (slides[0].progress < 1.0) {
                      wThis.$emit('onSlideIndexChange', 0)
                      break
                    }
                    if (slides[index].progress >= 1.0 &&
                        slides[index + 1].progress >= 0.0 &&
                        slides[index + 1].progress < 1.0) {
                        wThis.$emit('onSlideIndexChange', index + 1)
                      break
                    }
                  } else {
                    wThis.$emit('onSlideIndexChange', index)
                    break
                  }
                }
              }
            }
          }
      })
      this.swiper = swiper
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  .m-scrollview
    #jsscrollview-swiper-container
      width: 100%
      height: 100%
      .swiper-slide
        height: auto;
</style>
