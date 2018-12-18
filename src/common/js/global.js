export default class JHGlobal {
  static addSwiperCount() {
    return JHGlobal.swiperCount++
  }

  static swiperContainerIdName() {
    return JHGlobal.swiperContainerIdNamePrefix + JHGlobal.swiperCount
  }
}

JHGlobal.swiperCount = 0
JHGlobal.swiperContainerIdNamePrefix = 'swiper-container-id_'
