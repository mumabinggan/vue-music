<template>
  <div id="app">
    <m-header></m-header>
    <m-tab></m-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player class="player" v-show="playList.length>0"></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import MTab from 'components/tab/tab'
  import Player from 'components/player/player'
  import {mapGetters} from 'vuex'
  export default {
    name: 'App',
    components: {
      MHeader,
      MTab,
      Player
    },
    computed: {
      ...mapGetters([
        'playing',
        'playList'
      ])
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    .player
      position fixed
      top 0
      left 0
      width 100%
      height 100%
</style>
