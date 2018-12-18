<template>
  <div class="m-recommend">
    <m-scrollview ref="scrollview" class="scrollview">
      <!--<div class="swiper-slide">-->
        <!---->
      <!--</div>-->
      <m-slider class="recommend-slider swiper-slide"
        @hasImgLoadedFinish="updateLayout"
                @clickIndex="clickCarouselIndex"
                v-if="hasCarousel" v-bind:arr="this.carouselResponse.data.slider">
      </m-slider>
      <div class="recommend-playlist-title swiper-slide">
        热门歌单推荐
      </div>
      <div class="recommend-playlist-item swiper-slide"
           v-if="hasSongList"
           v-for="item in this.songListResponse.data.list"
           v-bind:key="item.dissid">
        <img class="playlist-item-cover" v-lazy="item.imgurl" alt="">
        <div class="playlist-item-right">
          <div class="playlist-item-title">{{item.creator.name}}</div>
          <div class="playlist-item-briefDescription">{{item.dissname}}</div>
        </div>
      </div>
      <div class="loading-container" v-if="!hasSongList">
        <loading></loading>
      </div>
    </m-scrollview>
  </div>
</template>

<script type="text/ecmascript-6">
  import MScrollview from 'base/scrollview/jhscrollview'
  import MSlider from 'base/slider/jhslider'
  import {getRecommendList, getDiscList} from 'src/api/recommend'
  import {RESULT_OK} from '../../api/config'
  import Loading from 'base/loading/loading'

  export default {
    name: 'm-recommend',
    components: {
      MSlider,
      MScrollview,
      Loading
    },
    data() {
      return {
        carouselResponse: {
          code: Boolean,
          data: {
            slider: []
          }
        },
        songListResponse: {
          code: Boolean,
          data: {
            list: []
          }
        }
      }
    },
    computed: {
      hasCarousel: function () {
        return ((this.carouselResponse.data !== null) &&
          (this.carouselResponse.data.slider !== null) &&
          (this.carouselResponse.data.slider.length > 0))
      },
      hasSongList: function () {
        return (this.songListResponse.data !== null) &&
          (this.songListResponse.data.list !== null) &&
          (this.songListResponse.data.list.length > 0)
      }
    },
    methods: {
      _getRecommendList() {
        getRecommendList().then((res) => {
          this.carouselResponse = res
          if (res.code === RESULT_OK) {
            console.log(res)
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          this.songListResponse = res
          if (res.code === RESULT_OK) {
            console.log(res)
          }
          setTimeout(() => {
            this.updateLayout()
          }, 0)
        })
      },
      updateLayout() {
        this.$refs.scrollview.update()
      },
      clickCarouselIndex(index) {
        console.log('========updateLayout========' + index)
      }
    },
    created() {
      this._getRecommendList()
      this._getDiscList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-recommend
    width: 100%
    position: fixed
    top: 88px
    bottom: 0
    overflow hidden
    .scrollview
      width: 100%
      height: 100%
      .recommend-slider
        height auto
      .recommend-playlist-title
        width: 100%
        height: 60px
        color: $color-theme
        line-height: 60px
        text-align: center
      .recommend-playlist-item
        width 100%
        height 100px
        box-sizing border-box
        padding 15px
        display flex
        .playlist-item-cover
          width 70px
          height 70px
          margin-right 10px
        .playlist-item-right
          flex 1
          padding 5px 0px
          overflow hidden
          display: flex
          flex-direction: column
          justify-content space-between
          .playlist-item-title
            font-size: $font-size-medium-x;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
            color $color-text
          .playlist-item-briefDescription
            font-size: $font-size-medium;
            line-height 18px
            color $color-text-d
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
      .loading-container
        position: absolute
        width: 100%
        top: 220px
</style>
