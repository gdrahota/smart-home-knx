import Vue from 'vue'

const state = {
  items: [],
}

// mutations
const addFeatureMenuItemsMutation = ( state, featureName ) => menuItems => {
  if ( !featureName ) {
    throw Error(`addFeatureMenuItemsMutation: featureName must be provided`)
  }

  if ( menuItems.some(i => !i.name || !i.id) ) {
    throw Error(`addFeatureMenuItemsMutation: at least one menu item misses either the id, name or property`)
  }

  state.items.push(...menuItems.map(i => ({ featureName, ...i })))
}

const removeFeatureMenuItemsMutation = ( state, featureName ) => {
  state.items = state.items.filter(i => i.featureName !== featureName)
}

const updateMenuItemMutation = ( state, payload ) => {
  if ( [ undefined, null ].indexOf(payload) !== -1 ) {
    return
  }

  const { featureName, menuItem } = payload
  const idx = state.items.findIndex(i => i.featureName === featureName && i.name === menuItem.name)

  if ( idx !== -1 ) {
    Vue.set(state.items, idx, menuItem)
  }
}

const removeMenuItemMutation = ( state, { featureName, menuItemName } ) => {
  const idx = state.items.findIndex(i => i.featureName === featureName && i.name === menuItemName)

  if ( idx !== -1 ) {
    Vue.delete(state.items, idx)
  }
}

const mutations = {
  addFeatureMenuItemsMutation,
  removeFeatureMenuItemsMutation,
  updateMenuItemMutation,
  removeMenuItemMutation,
}

// getters
const getChildren = ( parentItem, menuItems ) =>
  menuItems
    .filter(( { parentId } ) => !!parentId && parentId === parentItem.id)
    .map(node => ({ ...node, children: getChildren(node, menuItems) }))

const getMainMenuItemsByFeatureName = state => name => {
  const menuItemsOfFeatureName = state.items.filter(( { parentId, featureName } ) => parentId && featureName === name)

  return state.items
    .filter(( { parentId, featureName } ) => !parentId && featureName === name)
    .map(item => ({ ...item, children: getChildren(item, menuItemsOfFeatureName) }))
}

const getFeatureNames =
  state =>
    state.items
      .map(( { featureName } ) => featureName)
      .filter(( value, index, self ) => self.indexOf(value) === index)

const getters = {
  getMainMenuItemsByFeatureName,
  getFeatureNames,
}

export default {
  namespaced: true,
  mutations,
  state,
  getters,
}
