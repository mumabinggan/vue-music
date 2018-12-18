<template>
  <div class="m-phonelist">
    <m-scrollview ref="scrollview"
                  class="scrollview"
                  v-bind:onlistenslideindexchange="true"
                  v-bind:onlistenslidepositionchange="true"
                  @onSlideIndexChange="setSlideIndex">
      <div class="phonelist-item swiper-slide"
           v-for="item in this.data"
           v-bind:key="item.title">
        <div class="phonelist-item-title common-title">{{item.title}}
        </div>
        <div class="phonelist-item-content"
             v-for="phone in item.items"
             v-bind:key="phone.id"
             @click="selectItem(phone)">
          <img class="playlist-item-img" v-lazy="phone.avatar" alt="">
          <div class="playlist-item-name">{{phone.name}}</div>
        </div>
      </div>
    </m-scrollview>
    <div class="phonelist-index"
         @touchstart="onShortcutTouchStart"
         @touchmove="onShortcurTouchMove">
      <ul>
        <li v-for="(item, index) in shortcurList"
            :key="index"
            :data-index="index"
            :class="{'current': currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="fix-title common-title" v-show="sectionTitle">{{sectionTitle}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */

  import 'swiper/dist/css/swiper.min.css'
  import MScrollview from 'base/scrollview/jhscrollview'
  import {getData} from '../../common/js/dom'

  const ANCHOR_HEIGHT = 18

  export default {
    name: 'phonelist',
    components: {
      MScrollview
    },
    created() {
      this.touch = {}
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    computed: {
      shortcurList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      sectionTitle() {
        if (this.currentIndex === 0) {
          return null
        }
        let title = (this.data[this.currentIndex] ? this.data[this.currentIndex].title : null)
        return title
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('selectItem', item)
      },
      onShortcutTouchStart(e) {
        let index = getData(e.target, 'index')
        if (!index) {
          return
        }
        this.touch.y1 = e.touches[0].pageY
        this.touch.beginIndex = index
        this.$refs.scrollview.sliderTo(this.touch.beginIndex)
      },
      onShortcurTouchMove(e) {
        this.touch.y2 = e.touches[0].pageY
        const count = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        const moveIndex = parseInt(this.touch.beginIndex) + count
        if (moveIndex >= this.data.length) {
          return
        }
        this.$refs.scrollview.sliderTo(moveIndex)
      },
      setSlideIndex(index) {
        this.currentIndex = index
      },
      update() {
        this.$refs.scrollview.update()
      }
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-phonelist
    height 100%
    overflow hidden
    background $color-background
    .scrollview
      height 100%
      width 100%
      .phonelist-item
        height auto
        .phonelist-item-content
          height 90px
          display flex
          align-content center
          align-items center
          padding-left 15px
          .playlist-item-img
            width 60px
            height 60px
            border-radius 50%
          .playlist-item-name
            display inline-block
            margin-left 20px
            color $color-text-l
            font-size $font-size-medium
    .phonelist-index
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      height auto
      padding 20px 0
      border-radius: 10px;
      text-align: center;
      background: $color-background-d;
      li
        height 20px
        font-size 14px
        &.current {
          color: $color-theme;
        }
    .fix-title
      position absolute
      left 0
      top 0
      right 0
    .common-title
      height 25px
      line-height 25px
      font-size 13px
      padding-left 15px
      z-index 40
      background-color gray
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
</style>
