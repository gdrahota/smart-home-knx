import menus from '@/store/app/menu'

const state = {
  appSubTitle: null,
}

const setMutation = ( state, value ) => {
  state.appSubTitle = value
}

const mutations = {
  setMutation,
}

const getters = {
  getAppSubTitle: state => state.appSubTitle,
}

export default {
  namespaced: true,
  mutations,
  state,
  getters,
  modules: {
    menus,
  },
}
