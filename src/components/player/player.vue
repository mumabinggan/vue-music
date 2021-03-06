<template>
  <div class="m-player">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave">
      <div class="normal-player"
           v-show="fullScreen">
        <!--顶-->
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <div class="top-item">
          <div class="back" @click="handleToSmallScreen">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
        <!--中间-->
        <div class="middle-item">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdRef">
              <div class="cd" :class="this.cdCls">
                <img :src="currentSong.image" alt="" class="image">
              </div>
            </div>
          </div>
        </div>
        <!--底-->
        <div class="bottom-item">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i :class="this.playIcon" @click.stop="togglePlaying"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="handleToFullScreen">
        <div class="icon" :class="this.cdCls">
          <img :src="currentSong.image" alt="" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="playControl">
          <i :class="this.miniPlayIcon" @click.stop="togglePlaying"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audioRef" :src="currentSong.url"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {JHTransform} from 'common/js/dom'
  import animations from 'create-keyframe-animation'
  export default {
    name: 'm-player',
    data() {
      return {
      }
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniPlayIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing'
      ])
    },
    props: {
    },
    components: {
    },
    methods: {
      handleBack() {
        this.$router.back()
      },
      togglePlaying() {
        this.setPlayingState(!this.playing)
      },
      handleToSmallScreen() {
        this.setFullScreen(false)
      },
      handleToFullScreen() {
        this.setFullScreen(true)
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.2)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear',
            delay: 100
          }
        })
        animations.runAnimation(this.$refs.cdRef, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdRef.style.animation = ''
      },
      leave(el, done) {
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdRef.style.transition = `all 0.4s ease`
        this.$refs.cdRef.style[JHTransform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdRef.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdRef.style[JHTransform] = ''
        this.$refs.cdRef.style.transition = ''
      },
      _getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {x, y, scale}
      },
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN',
        setPlayingState: 'SET_PLAYING_STATE'
      })
    },
    watch: {
      currentSong() {
        this.$nextTick(() => {
          // this.$refs.audioRef.play()
        })
      },
      playing(newPlaying) {
        // const audio = this.$refs.audioRef
        this.$nextTick(() => {
          // newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    mounted() {
    },
    created() {
      // this.updateLayout()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-player
    .normal-player
      width 100%
      height 100%
      top 0
      bottom 0
      z-index 500
      background $color-background
      display flex
      flex-direction column
      .background
        position absolute
        width 100%
        height 100%
        filter blur(20px)
      .top-item
        position relative
        width 100%
        box-sizing border-box
        padding 20px 20px
        .icon-back
          position absolute
          font-size 25px
        .title
          font-size 22px
          text-align center
        .subtitle
          margin-top 14px
          font-size 14px
          text-align center
      .middle-item
        position relative
        width 100%
        flex 1
        .middle-l
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              &.play
                animation rotate 20s linear infinite
              &.pause
                animation-play-state paused
              .image
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
          .playing-lyric-wrapper {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric {
              height: 20px;
              line-height: 20px;
              font-size: $font-size-medium;
              color: $color-text-l;
            }
          }
      .bottom-item
        position relative
        width 100%
        height 180px
        .operators
          font-size 30px
          margin 90px 30px 0
          display flex
          justify-content space-between
          align-items center
          .i-center
            font-size 45px
      &.normal-enter-active, &.normal-leave-active
        transition all 0.4s
        .top-item, .bottom-item
          transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity 0
        .top-item
          transform translate3d(0, -100px, 0)
        .bottom-item
          transform translate3d(0, 100px, 0)
    .mini-player
      position fixed
      bottom 0
      width 100%
      z-index 350
      background $color-highlight-background
      display flex
      align-items center
      padding 10px 18px
      box-sizing border-box
      .icon
        width 40px
        img
          border-radius 50%
        &.play
          animation rotate 20s linear infinite
        &.pause
          animation-play-state paused
      .text
        flex 1
        margin-left 10px
        margin-right 10px
        height 36px
        display flex
        flex-direction column
        justify-content space-between
        .name
          font-size $font-size-medium
        .desc
          font-size $font-size-small
          color $color-text-l
      .playControl
        font-size 23px
        margin-right 20px
      .control
        font-size 20px
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
