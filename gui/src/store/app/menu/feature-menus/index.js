import Vue from 'vue'
import { action } from '@/store/api-action'

import possibleRoutes from './possible-routes'
import { sortByUpdatedAt } from '@/sorters'

const state = {
  items: [],
  getPossibleRoutes: [],
  editItem: null,
}

// actions
const loadAction = async context => {
  try {
    const menuItems = await action('menuItems.getAll')
    context.commit('LOAD', menuItems)
  } catch ( err ) {
    console.debug('ERROR in action "menuItems.getAll":', err)
  }
}

const addAction = async ( context, menuItem ) => {
  try {
    const storedMenuItem = await action('menuItems.add', menuItem)
    context.commit('ADD', storedMenuItem)
    return storedMenuItem
  } catch ( err ) {
    console.debug('ERROR on addAction', err)
  }
}

const updateAction = async ( context, menuItem ) => {
  try {
    const savedMenuItem = await action('menuItems.update', menuItem)
    context.commit('UPDATE', savedMenuItem)
  } catch ( err ) {
    console.error('ERROR on _updateActions', err)
  }
}

const removeAction = async ( context, menuItemId ) => {
  try {
    await action('menuItems.delete', menuItemId)
    context.commit('REMOVE', menuItemId)
  } catch ( err ) {
    console.error('ERROR on removeAction', err)
  }
}
const actions = {
  addAction,
  loadAction,
  removeAction,
  updateAction,
}

// mutations
const ADD = ( state, menuItem ) => {
  if ( !menuItem.name && !menuItem._id && !menuItem.featureName ) {
    throw Error(`_addMutation: item misses either the id, name or featureName property`)
  }

  if ( !menuItem.parentId && menuItem.context ) {
    throw Error(`_addMutation: if context property is provided then the parentId property must be provided as well`)
  }

  state.items.push(menuItem)
}

const LOAD = ( state, items ) => {
  if ( items.some(i => !i.name && !i._id && !i.featureName) ) {
    throw Error(`LOAD: at least one item misses either the id, name or featureName property`)
  }

  if ( items.some(( { parentId, context } ) => !parentId && context) ) {
    throw Error(`LOAD: if context property is provided then the parentId property must be provided as well`)
  }

  state.items = items
}

const UPDATE = ( state, item ) => {
  const idx = state.items.findIndex(i => i._id === item._id)

  if ( idx !== -1 ) {
    Vue.set(state.items, idx, item)
  }
}

const REMOVE = ( state, menuItemId ) => {
  const idx = state.items.findIndex(i => i._id === menuItemId)

  if ( idx !== -1 ) {
    Vue.delete(state.items, idx)
  }
}

const editMutation = ( state, item ) => {
  state.editItem = item
}

const mutations = {
  ADD,
  LOAD,
  REMOVE,
  UPDATE,
  editMutation,
}

// getters
const getChildren = ( parentNode, menuItems ) =>
  menuItems
    .filter(( { parentId } ) => !!parentId && parentId === parentNode._id)
    .map(node => ({ ...node, children: getChildren(node, menuItems) }))
    .sort(sortByUpdatedAt)

const getMenuItemTree = state =>
  state.items
    .filter(( { parentId } ) => !parentId)
    .map(node => ({ ...node, children: getChildren(node, state.items) }))
    .sort(sortByUpdatedAt)

const getBreadcrumbsStartFromView = state => _id => {
  const responseStack = []

  const start = state.items.find(item => item.feature.instanceId === _id)

  if ( start ) {
    responseStack.unshift({
      _id: start._id,
      parentId: start.parentId,
      name: start.name,
      feature: start.feature,
    })

    while ( responseStack[ 0 ][ 'parentId' ] ) {
      const parent = state.items.find(item => item._id === responseStack[ 0 ][ 'parentId' ])

      if ( parent ) {
        responseStack.unshift({
          _id: start._id,
          parentId: parent.parentId,
          name: parent.name,
          context: parent.context,
        })
      }
    }
  }

  return responseStack.map(( { name } ) => name)
}

const getters = {
  getAll: state => state.items,
  getMenuItemTree,
  getItemToEdit: state => state.editItem,
  getPossibleRoutes: state => state.getPossibleRoutes,
  getBreadcrumbsStartFromView,
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
  modules: {
    possibleRoutes,
  },
}
