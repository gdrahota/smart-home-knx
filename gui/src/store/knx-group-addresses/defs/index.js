import Vue from 'vue'

import { action } from '@/store/api-action'

import { EventBus } from '@/plugins/event-bus'
import { LoadingState } from '@/store/enums/loading-state'
import { sortByAddress } from '@/sorters'

const state = {
  items: {},
  loadingState: LoadingState.NotLoaded,
}

const loadAll = async ( context ) => {
  if ( [ LoadingState.Loading, LoadingState.Loaded ].indexOf(context.state.loadingState) === -1 ) {
    try {
      context.commit('SET_LOADING_STATE', LoadingState.Loading)
      const items = await action('knxGroupAddressDefs.getAll')
      context.commit('SET_LOADING_STATE', LoadingState.Loaded)
      context.commit('STORE_ALL_ITEMS', items)
    } catch ( err ) {
      context.commit('SET_LOADING_STATE', LoadingState.Failed)
      console.error('ERROR in store/knx-group-address-defs/loadAction', err)
    }
  }
}

const create = async ( context, item ) => {
  try {
    const newItem = await action('knxGroupAddressDefs.create', item)
    context.commit('CREATE', newItem)
    return newItem
  } catch ( err ) {
    console.error('ERROR in store/knx-group-address-defs/create', err)
  }
}

const update = async ( context, item ) => {
  try {
    const updatedItem = await action('knxGroupAddressDefs.update', item, { _id: item._id })
    context.commit('UPDATE', updatedItem)
  } catch ( err ) {
    console.error('ERROR in store/knx-group-address-defs/update', err)
  }
}

const remove = async ( context, _id ) => {
  try {
    await action('knxGroupAddressDefs.delete', null, { _id })
    context.commit('REMOVE', _id)
  } catch ( err ) {
    console.error('ERROR in store/knx-group-address-defs/remove', err)
  }
}

const actions = {
  loadAll,
  create,
  update,
  remove,
}

// mutations
const SET_LOADING_STATE = ( state, status ) => {
  state.loadingState = status
}

const STORE_ALL_ITEMS = ( state, knxGroupAddresses ) => {
  const items = {}
  knxGroupAddresses.forEach(item => {
    items[ item._id ] = JSON.parse(JSON.stringify(item))
  })

  state.items = items
}

const CREATE = ( state, item ) => {
  Vue.set(state.items, item._id, item)
}

const UPDATE = ( state, item ) => {
  Vue.set(state.items, item._id, item)
}

const REMOVE = ( state, _id ) => {
  Vue.delete(state.items, _id)

  const msgConfig = {
    type: 'info',
    message: 'Die KNX-Gruppenadresse wurde gelöscht!',
    timeout: 10000,
    badgeColor: 'primary',
    textColor: 'white',
  }

  EventBus.$emit('notify', msgConfig)

  EventBus.$emit('routeTo', { name: 'home' })
}

const mutations = {
  SET_LOADING_STATE,
  STORE_ALL_ITEMS,
  CREATE,
  UPDATE,
  REMOVE,
}

// getters
const getters = {
  getAll: state => Object.values(state.items).sort(sortByAddress),
  getById: state => id => state.items[ id ],
  getByAddress: state => address => Object.values(state.items).find(item => item.address === address),
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
