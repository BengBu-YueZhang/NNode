import { GET_TOPICS_DETAIL, SET_DETAIL_ID } from './type'
import api from '~/api'

export const state = () => ({
  detail: {},
  detailId: ''
})

export const mutations = {
  [GET_TOPICS_DETAIL] (state, detail) {
    state.detail = detail
  },

  [SET_DETAIL_ID] (state, id) {
    state.detailId = id
  }
}

export const actions = {
  async [GET_TOPICS_DETAIL] ({ commit, state }) {
    const { data: { data } } = await api.getTopicDetail(state.detailId)
    commit(GET_TOPICS_DETAIL, data)
  },

  async [SET_DETAIL_ID] ({ commit }, id) {
    commit(SET_DETAIL_ID, id)
  }
}