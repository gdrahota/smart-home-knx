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
      const items = await action('tags.getAll')
      commit('SET_LOADING_STATE', LoadingState.Loaded)
      commit('STORE_ALL_ITEMS', items)
    } catch ( err ) {
      commit('SET_LOADING_STATE', LoadingState.Failed)
      console.error('ERROR in store/tags/loadAll', err)
    }
  }
}

const getById = async ( context, _id ) => {
  try {
    const items = await action('tags.getById', null, { _id })
    context.commit('UPDATE', items)
  } catch ( err ) {
    console.error('ERROR in store/tags/getById', err)
  }
}

const create = async ( context, room ) => {
  try {
    const createdItem = await action('tags.create', room)
    context.commit('UPDATE', createdItem)
  } catch ( err ) {
    console.error('ERROR in store/tags/create', err)
  }
}

const update = async ( context, room ) => {
  try {
    const createdItem = await action('tags.update', room, { _id: room._id })
    context.commit('UPDATE', createdItem)
  } catch ( err ) {
    console.error('ERROR in store/tags/update', err)
  }
}

const remove = async ( context, _id ) => {
  try {
    await action('tags.delete', null, { _id })
    context.commit('REMOVE', _id)
  } catch ( err ) {
    console.error('ERROR in store/tags/remove', err)
  }
}

const removeBuildingBlockFromTag = async ( context, { tagId, buildingBlockId } ) => {
  try {
    const item = await action('tags.removeBuildingBlock', null, { tagId, buildingBlockId })
    context.commit('UPDATE', item)
  } catch ( err ) {
    console.error('ERROR in store/building-blocks/removeBuildingBlockFromTag', err)
  }
}

const addBuildingBlockToTag = async ( context, { tagId, buildingBlockId } ) => {
  try {
    const item = await action('tags.addBuildingBlock', null, { tagId, buildingBlockId })
    context.commit('UPDATE', item)//context.commit('REMOVE', _id)
  } catch ( err ) {
    console.error('ERROR in store/building-blocks/addBuildingBlockToTag', err)
  }
}

const actions = {
  loadAll,
  getById,
  create,
  update,
  remove,
  removeBuildingBlockFromTag,
  addBuildingBlockToTag,
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
  getByBuildingBlockId: state => buildingBlockId => Object.values(state.items).filter(i => i.buildingBlocks.includes(buildingBlockId)),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
