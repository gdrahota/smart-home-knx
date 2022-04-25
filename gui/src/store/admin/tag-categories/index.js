import { action } from '@/store/api-action'
import { LoadingState } from '@/store/enums/loading-state'
import Vue from 'vue'

const state = {
  items: {},
  loadingState: LoadingState.NotLoaded,
}

const loadAll = async ( { state, commit } ) => {
  if ( [ LoadingState.Loading ].indexOf(state.loadingState) === -1 ) {
    try {
      commit('SET_LOADING_STATE', LoadingState.Loading)
      const items = await action('tagCategories.getAll')
      commit('SET_LOADING_STATE', LoadingState.Loaded)
      commit('STORE_ALL_ITEMS', items)
    } catch ( err ) {
      commit('SET_LOADING_STATE', LoadingState.Failed)
      console.error('ERROR in store/tagCategories/loadAll', err)
    }
  }
}

const getById = async ( context, _id ) => {
  try {
    const items = await action('tagCategories.getById', null, { _id })
    context.commit('UPDATE', items)
  } catch ( err ) {
    console.error('ERROR in store/tagCategories/getById', err)
  }
}

const create = async ( context, room ) => {
  try {
    const createdItem = await action('tagCategories.create', room)
    context.commit('UPDATE', createdItem)
  } catch ( err ) {
    console.error('ERROR in store/tagCategories/create', err)
  }
}

const update = async ( context, room ) => {
  try {
    const createdItem = await action('tagCategories.update', room, { _id: room._id })
    context.commit('UPDATE', createdItem)
  } catch ( err ) {
    console.error('ERROR in store/tagCategories/update', err)
  }
}
const remove = async ( context, _id ) => {
  try {
    await action('tagCategories.delete', null, { _id })
    context.commit('REMOVE', _id)
  } catch ( err ) {
    console.error('ERROR in store/tagCategories/remove', err)
  }
}

const actions = {
  loadAll,
  getById,
  create,
  update,
  remove,
}

// mutations
const SET_LOADING_STATE = ( state, status ) => {
  state.loadingState = status
}

const STORE_ALL_ITEMS = ( state, itemsFromServer ) => {
  const items = {}
  itemsFromServer.forEach(item => {
    items[ item._id ] = JSON.parse(JSON.stringify(item))
  })

  state.items = items
}

const UPDATE = ( state, item ) => {
  Vue.set(state.items, item._id, item)
}

const REMOVE = ( state, _id ) => {
  Vue.delete(state.items, _id)
}

const mutations = {
  SET_LOADING_STATE,
  STORE_ALL_ITEMS,
  UPDATE,
  REMOVE,
}

// getters
const getters = {
  getAll: state => Object.values(state.items),
  getById: state => _id => state.items[ _id ],
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
