import * as Types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(Types.SET_CURRENT_INDEX, index)
  commit(Types.SET_PLAYLIST, list)
  commit(Types.SET_SEQUENCE_LIST, list)
  commit(Types.SET_FULLSCREEN, true)
  commit(Types.SET_PLAYING_STATE, true)
}
