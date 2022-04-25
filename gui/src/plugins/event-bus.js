import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import { Notify } from 'quasar'

export const EventBus = new Vue()

const routeTo = route => router.push(route)

const resetSubtitle = () => store.commit('app/setMutation')

const clearFeatureMenuItems = () => {
  store.commit('app/menus/routeSpecificMenu/removeMutation')
}

const notify = config => Notify.create(config)

const loginSuccess = async () => {
  await store.dispatch('app/menus/featureMenus/loadAction')
  await store.dispatch('knxGroupAddresses/defs/loadAll')
  await store.dispatch('knxGroupAddresses/values/loadAll')
  await store.dispatch('admin/tagCategories/loadAll')
  await store.dispatch('admin/tags/loadAll')
  await store.dispatch('admin/buildingBlocks/loadAll')

  const route = store.getters[ 'login/getRequestedRouteBeforeLogin' ] || '/'
  await router.push(route)
}

const onApiError = msg => {
  const config = {
    type: 'negative',
    message: msg,
    caption: 'Bitte versuchen Sie es erneut.',
    timeout: 10000,
    badgeColor: 'error',
    textColor: 'white',
  }
  Notify.create(config)
}

const onTokenExpired = async () => {
  const msgConfig = {
    type: 'negative',
    message: 'Ihre Anmeldung ist abgelaufen. Bitte melden Sie sich erneut an!',
    timeout: 0,
    badgeColor: 'error',
    textColor: 'white',
    position: 'bottom',
  }
  notify(msgConfig)
  store.commit('login/logoutMutation')
  await routeTo({ name: 'login' })
}

EventBus
  .$on('routeTo', routeTo)
  .$on('reset-subtitle', resetSubtitle)
  .$on('clear-feature-menu-items', clearFeatureMenuItems)
  .$on('notify', notify)
  .$on('login-success', loginSuccess)
  .$on('apiError', onApiError)
  .$on('token-expired', onTokenExpired)
