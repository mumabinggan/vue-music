<template>
  <div class="m-singerlist">
    <m-phonelist v-if="hasSingerList"
                 ref="scrollview"
                 class="scrollview"
                 :data="this.orderedSingerList"
                 @selectItem="selectItem">
    </m-phonelist>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'src/api/singer'
  import {RESULT_OK} from '../../api/config'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import MPhonelist from 'base/phonelist/jhphonelist'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    name: 'singerlist',
    components: {
      MPhonelist,
      Loading
    },
    data() {
      return {
        singerListResponse: {
          code: Boolean,
          data: {
            list: []
          }
        },
        orderedSingerList: []
      }
    },
    computed: {
      hasSingerList: function () {
        return this.orderedSingerList.length > 0
      }
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          this.singerListResponse = res
          if (res.code === RESULT_OK) {
            console.log(res.data.list)
            this.orderedSingerList = this._normalSingerList(this.singerListResponse.data.list)
          }
        })
      },
      selectItem(item) {
        this.$router.push({
          path: `/singerlist/${item.id}`
        })
        this.setSinger(item)
      },
      updateLayout() {
        this.$refs.scrollview.update()
      },
      _normalSingerList(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    created() {
      this._getSingerList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" ref="stylesheet/stylus">
  .m-singerlist
    width: 100%
    position: fixed
    top: 88px
    bottom: 0
</style>
