import { restClient } from '@/store/http-service'

export const state = {
  items: [],
  hasBeenLoaded: false,
}

const loadAction = async context => {
  try {
    const users = await restClient({
      url: '/api/users',
      method: 'get',
    })

    context.commit('_loadMutation', users)
  } catch ( err ) {
    console.error('ERROR in loadAction', err)
  }
}

export const actions = {
  loadAction,
}

// mutations
const setHasBeenLoadedMutation = ( state, value ) => {
  state.hasBeenLoaded = value
}

const _loadMutation = ( state, users ) => {
  state.items = users || []
}

const mutations = {
  setHasBeenLoadedMutation,
  _loadMutation,
}

const getters = {
  getUsers: state => state.items,
  getUserByUserName: state => name => state.items.find(( { username } ) => username === name) || null,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
