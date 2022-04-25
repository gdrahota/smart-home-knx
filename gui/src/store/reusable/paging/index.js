import Vue from 'vue'

const state = {
  page: {},
  rowsPerPage: {},
  rowsPerPageOptions: [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ],
}

//mutations
const SET_PAGE = ( state, { id, page } ) => {
  Vue.set(state.page, id, page || 1)
}

const SET_ROWS_PER_PAGE = ( state, { id, rowsPerPage } ) => {
  Vue.set(state.rowsPerPage, id, rowsPerPage || 10)
}

const mutations = {
  SET_PAGE,
  SET_ROWS_PER_PAGE,
}

const getters = {
  getPage: state => id => state.page[ id ] || 1,
  getRowsPerPage: state => id => state.rowsPerPage[ id ] || 10,
  getRowsPerPageOptions: state => state.rowsPerPageOptions,
}

export default {
  namespaced: true,
  mutations,
  state,
  getters,
}
