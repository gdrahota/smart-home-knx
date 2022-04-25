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
      const items = await action('knxGroupAddressValues.getAll')
      commit('SET_LOADING_STATE', LoadingState.Loaded)
      commit('STORE_ALL_ITEMS', items)
    } catch ( err ) {
      commit('SET_LOADING_STATE', LoadingState.Failed)
      console.error('ERROR in store/knx-group-address-values/loadAction', err)
    }
  }
}

const getById = async ( context ) => {
  try {
    const items = await action('knxGroupAddressValues.getById')
    context.commit('UPDATE', items)
  } catch ( err ) {
    console.error('ERROR in store/knx-group-address-values/getById', err)
  }
}

const propagate = async ( context, { _id, value, dataPointType } ) => {
  try {
    const updatedItem = await action('knxGroupAddressValues.propagate', { value, dataPointType }, { _id })
    context.commit('UPDATE', updatedItem)
  } catch ( err ) {
    console.error('ERROR in store/knx-group-address-values/update', err)
  }
}

const readFromKnxBus = async ( context, _id ) => {
  try {
    await action('knxGroupAddressValues.readFromKnxBus', null, { _id })
  } catch ( err ) {
    console.error('ERROR in store/knx-group-address-values/readFromKnxBus', err)
  }
}

const actions = {
  loadAll,
  getById,
  propagate,
  readFromKnxBus,
}

// mutations
const SET_LOADING_STATE = ( state, status ) => {
  state.loadingState = status
}

const STORE_ALL_ITEMS = ( state, knxGroupAddresses ) => {
  const items = {}
  knxGroupAddresses.forEach(item => {
    items[ item.address ] = JSON.parse(JSON.stringify(item))
  })

  state.items = items
}

const UPDATE = ( state, knxGroupAddress ) => {
  state.items[ knxGroupAddress._id ] = knxGroupAddress
}

const SOCKET_KNX_DATAPOINT_UPDATE = ( state, value ) => {
  Vue.set(state.items, value.address, value)
}

const mutations = {
  SET_LOADING_STATE,
  STORE_ALL_ITEMS,
  UPDATE,
  SOCKET_KNX_DATAPOINT_UPDATE,
}

// getters
const getters = {
  getAll: state => Object.values(state.items),
  getByAddress: state => address => state.items[ address ],
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
