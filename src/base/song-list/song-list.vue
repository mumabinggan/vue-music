<template>
  <div class="m-songlist">
    <m-scrollview ref="scrollview"
                  class="scrollview"
                  :onlistenslideindexchange="true"
                  :onlistenslidepositionchange="true"
                  @onSlidePostionChange="handleSlidePostionChange">
      <div class="song-item swiper-slide"
           v-if="hasSongList"
           v-for="(item, index) in this.songs"
           v-bind:key="item.id"
           @click="handleSelectItem(item, index)">
        <div class="item-title">{{item.name}}</div>
        <div class="item-subtitle">{{item.singer + "●" + item.album}}</div>
      </div>
    </m-scrollview>
  </div>
</template>

<script type="text/ecmascript-6">
  import MScrollview from 'base/scrollview/jhscrollview'
  // import {Song, createSong} from 'common/js/song'
  export default {
    name: 'm-songlist',
    data() {
      return {
      }
    },
    props: {
      songs: {
        type: Array,
        default: () => []
      }
    },
    components: {
      MScrollview
    },
    computed: {
      hasSongList: function () {
        return (this.songs !== null) &&
          (this.songs.length > 0)
      }
    },
    methods: {
      handleSelectItem(item, index) {
        this.$emit('onSelectItem', item, index)
      },
      handleSlidePostionChange(translate) {
        this.$emit('onSlidePostionChange', translate)
      }
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-songlist
    .scrollview
      width 100%
      height 100%
      .song-item
        width 100%
        height 80px
        box-sizing border-box
        padding 20px 15px
        font-size $font-size-small
        color $color-text-l
        display flex
        flex-direction column
        justify-content space-between
        .item-title
          font-size 15px
          color $color-text
        .item-subtitle
          font-size 15px
</style>
