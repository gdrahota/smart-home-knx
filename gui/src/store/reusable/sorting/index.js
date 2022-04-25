import Vue from 'vue'

const state = {
  items: {},
}

//mutations
const CLEAR_SORTING = ( state, id ) => {
  Vue.set(state.items, id, { sortBy: null, descending: false })
}

const SET_SORTING = ( state, { id, sortBy, descending } ) => {
  Vue.set(state.items, id, { sortBy, descending })
}

const mutations = {
  CLEAR_SORTING,
  SET_SORTING,
}

// getters
const getSorting = state => id => {
  return {
    direction: state.items[ id ]?.descending ? 'DESC' : 'ASC',
    name: state.items[ id ]?.sortBy || 'id',
  }
}

const getters = {
  getDescending: state => id => state.items[ id ]
    ? state.items[ id ].descending
    : false,
  getSortBy: state => id => state.items[ id ]
    ? state.items[ id ].sortBy
    : null,
  getSorting,
}

export default {
  namespaced: true,
  mutations,
  state,
  getters,
}
