<template>
  <div class="m-musiclist">
    <div class="music-header">
      <img class="back-icon" :src="backicon" alt="" @click="handleBack">
      <h1 class="title" v-html="this.title"></h1>
    </div>
    <div class="bg-img" ref="bgImageRef" :style="bgStyle">
      <!--播放按钮-->
      <div ref="playRef" v-show="this.songs.length > 0" class="play-wrapper">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <!--蒙层-->
      <div ref="blurRef" class="blur-view"></div>
    </div>
    <div class="bg-layer" ref="bgLayerRef"></div>
    <m-songlist class="song-list"
                ref="songlistRef"
                :songs="this.songs"
                @onSelectItem="handleSelectItem"
                @onSlidePostionChange="handleSlidePostionChange">
    </m-songlist>
  </div>
</template>

<script type="text/ecmascript-6">
  import backicon from 'image/common_icon_back.png'
  import MSonglist from 'base/song-list/song-list'
  import 'swiper/dist/css/swiper.min.css'
  import MScrollview from 'base/scrollview/jhscrollview'
  import {JHBackdrop, JHTransform} from '../../common/js/dom'
  import {mapActions} from 'vuex'

  const RESERVED_HEIGHT = 80

  export default {
    name: 'm-musiclist',
    data() {
      return {
        backicon: backicon,
        scrollY: 0.0,
        bgImageHeight: 0.0,
        minTranslateY: 0.0,
        mounted: false
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.avatar})`
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      avatar: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: () => []
      }
    },
    components: {
      MSonglist,
      MScrollview
    },
    methods: {
      ...mapActions([
        'selectPlay'
      ]),
      handleBack() {
        this.$router.back()
      },
      handleSelectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index: index
        })
      },
      handleSlidePostionChange(translate) {
        // console.log(translate)
        if (isNaN(translate)) {
          return
        }
        this.scrollY = translate
        let top = this.scrollY + this.bgImageHeight
        let zIndex = 0
        let scale = 1
        let blur = 0
        const percent = Math.abs(translate / this.bgImageHeight)
        if (translate > 0) {
          scale += percent
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.blurRef.style[JHBackdrop] = `blur(${blur}px)`
        if (top > RESERVED_HEIGHT) {
          this.setBgLayerTop(this.scrollY + this.bgImageHeight)
          this.$refs.bgImageRef.style.paddingTop = '70%'
          this.$refs.bgImageRef.style.height = 0
          this.$refs.blurRef.style.paddingTop = '70%'
          this.$refs.blurRef.style.height = 0
          if (top > this.bgImageHeight) {
            zIndex = 10
          }
        } else {
          zIndex = 10
          this.$refs.bgImageRef.style.paddingTop = 0
          this.$refs.bgImageRef.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.blurRef.style.paddingTop = 0
          this.$refs.blurRef.style.height = `${RESERVED_HEIGHT}px`
        }
        this.$refs.bgImageRef.style.zIndex = zIndex
        this.$refs.bgImageRef.style[JHTransform] = `scale(${scale})`
        this.$refs.blurRef.style.zIndex = zIndex
        this.$refs.blurRef.style[JHTransform] = `scale(${scale})`
      },
      setBgLayerTop(top) {
        this.$refs.bgLayerRef.style.top = `${top}px`
      }
    },
    mounted() {
      this.bgImageHeight = this.$refs.bgImageRef.clientHeight
      this.$refs.blurRef.style.height = `${this.bgImageHeight}px`
      this.setBgLayerTop(this.bgImageHeight)
      this.$refs.songlistRef.$el.style.top = `${this.bgImageHeight}px`
      // this.mounted = true
    },
    created() {
      // this.updateLayout()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-musiclist
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .music-header
      position fixed
      top 0
      left 0
      right 0
      height 44px
      padding 8px 10px
      box-sizing border-box
      z-index 20
      .back-icon
        float left
        height 100%
      .title
        height 100%
        line-height 28px
        text-align center
        color $color-text
    .bg-img
      position fixed
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-repeat no-repeat
      background-size cover
      .play-wrapper
        position absolute
        bottom 20px
        z-index 50
        width 100%
        .play
          box-sizing border-box
          width 135px
          padding 7px 0
          margin 0 auto
          text-align center
          border 1px solid $color-theme
          color $color-theme
          border-radius 100px
          font-size 0
          .icon-play
            display inline-block
            vertical-align middle
            margin-right 6px
            font-size $font-size-medium-x
          .text
            display inline-block
            vertical-align middle
            font-size $font-size-small
      .blur-view
        position fixed
        top 0
        width 100%
    .song-list
      position fixed
      bottom 0
      width 100%
      background $color-background
    .bg-layer
      position fixed
      width 100%
      bottom 0
      background $color-background
</style>
