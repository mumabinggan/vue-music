<template>
  <div class="m-tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="item-title">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singerlist">
      <span class="item-title">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="item-title">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="item-title">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm-tab'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "~common/stylus/variable"
  .m-tab
    height: 44px
    display: flex
    justify-content: space-around
    font-size: $font-size-medium
    .tab-item
      display: flex
      justify-content:center
      align-items:center
      .item-title
        display:inline-block
        line-height: 30px
      &.router-link-active
        .item-title
          color: $color-theme
          border-bottom: 2px solid $color-theme
          box-sizing: border-box
</style>
