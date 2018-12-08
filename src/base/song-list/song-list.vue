<template>
  <div class="m-song-list"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm-song-list',
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
  .m-song-list
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 200
    background-color $color-background
</style>
