<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="appName">Chicken Music</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm-header'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    height: 44px
    color: $color-theme
    text-align: center
    .icon
      display: inline-block
      margin-top: 6px
      width: 30px
      height: 32px
      bg-image('logo')
      background-size: 30px 32px
      background-repeat: no-repeat
    .appName
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large

</style>
