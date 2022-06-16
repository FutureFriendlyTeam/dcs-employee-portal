export const state = () => ({
  filter: [],
  sort: 'category',
  authState: true,
})

export const mutations = {
  setSort(state, payload) {
    state.sort = payload
  },
  logIn(state) {
    state.authState = true
  },
  logOut(state) {
    state.authState = false
  },
}

export const getters = {
  getSort: (state) => state.sort,
  getAuthState: (state) => state.authState,
}

export const actions = {
  SET_SORT({ commit }, payload) {
    commit('setSort', payload)
  },
  LOG_IN({ commit }) {
    commit('logIn')
  },
  LOG_OUT({ commit }) {
    commit('logOut')
  },
}
