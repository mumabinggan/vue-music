<template>
  <div class="m-musiclist">
    <div class="commom-header">
      <img v-bind:src="common-icon-back.png"/>
      <!--<img class="common-back-icon" v-bind:src="common-icon-back.png" alt="">-->
      <h1 class="title"></h1>
    </div>
    <div class="bg-img">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm-musiclist',
    data() {
      return {
        songs: []
      }
    },
    components: {
    },
    computed: {
    },
    methods: {
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-musiclist
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 200
    background $color-background
    .commom-header
      height 44px
      background-color red
</style>
