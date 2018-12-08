<template>
  <transition name="slide">
    <div class="m-singer-detail">
      <m-musiclist></m-musiclist>
    </div>
    <!--<div class="loading-container" v-if="!hasSongList">-->
      <!--<loading></loading>-->
    <!--</div>-->
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getSingerDetail} from 'src/api/singer'
  import {RESULT_OK} from '../../api/config'
  import Loading from 'base/loading/loading'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
  import MMusiclist from 'components/music-list/music-list'

  export default {
    name: 'm-singer-detail',
    data() {
      return {
        songs: []
      }
    },
    components: {
      Loading,
      MMusiclist
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === RESULT_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    created() {
      this._getDetail()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-singer-detail
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 200
    background-color $color-background
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .loading-container
    position: absolute
    width: 100%
    top: 220px
</style>
