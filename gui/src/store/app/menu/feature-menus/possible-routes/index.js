import Vue from 'vue'

const state = {
  items: [],
}

// mutations
const addMutation = ( state, payload ) => {
  if ( [ undefined, null ].indexOf(payload) !== -1 ) {
    throw Error(`addMutation: item must be an object`)
  }

  const { featureName, name, context } = payload

  if ( !featureName || !name || !context ) {
    throw Error(`addMutation: item misses either the featureName, name or context property`)
  }

  const idx = state.items.findIndex(i => i.featureName === featureName && i.name === name && i.context === context)

  if ( idx === -1 ) {
    state.items.push({ featureName, name, context })
  }
}

const removeMutation = ( state, payload ) => {
  if ( [ undefined, null ].indexOf(payload) !== -1 ) {
    throw Error(`removeMutation: item must be an object`)
  }

  const { featureName, name, context } = payload

  if ( !featureName || !name || !context ) {
    throw Error(`removeMutation: item misses either the featureName, name or context property`)
  }

  const idx = state.items.findIndex(i => i.featureName === featureName && i.name === name && i.context === context)

  if ( idx !== -1 ) {
    Vue.delete(state.items, idx)
  }
}

const mutations = {
  addMutation,
  removeMutation,
}

// getters
const getters = {
  getAll: state => state.items,
}

export default {
  namespaced: true,
  mutations,
  state,
  getters,
}
