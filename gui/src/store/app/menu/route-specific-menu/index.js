const state = {
  config: null,
}

// mutations
const setMutation = ( state, menuItemConfig ) => {
  if ( [ undefined, null ].indexOf(menuItemConfig) === -1 ) {
    state.config = Array.isArray(menuItemConfig)
      ? menuItemConfig
      : [ menuItemConfig ]
  } else {
    state.config = []
  }
}

const removeMutation = state => {
  state.config = null
}

const mutations = {
  setMutation,
  removeMutation,
}

const getters = {
  getConfig: state => state.config,
}

export default {
  namespaced: true,
  mutations,
  state,
  getters,
}
