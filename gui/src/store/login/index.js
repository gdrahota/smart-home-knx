import { decode } from 'jsonwebtoken'

import { EventBus } from '@/plugins/event-bus'
import { restClient } from '@/store/http-service'

export const state = {
  requestedRouteBeforeLogin: null,
  user: null,
  loginInProgress: false,
  error: null,
  token: null,
}

const url = '/api/login'

const loginAction = async ( context, { username, password } ) => {
  try {
    context.commit('setLoginInProgressMutation')

    const payload = {
      url,
      method: 'post',
      payload: { username, password },
    }

    await restClient(payload)

    EventBus.$emit('login-success')
  } catch ( err ) {
    context.commit('loginFailedMutation', err)

    const msgConfig = {
      type: 'negative',
      message: 'Ihre Anmeldung war NICHT erfolgreich.',
      caption: 'Bitte versuchen Sie es erneut.',
      timeout: 10000,
      badgeColor: 'yellow',
      textColor: 'white',
    }

    EventBus.$emit('notify', msgConfig)
  }
}

const logoutAction = async context => {
  try {
    await restClient({
      url: '/api/logout',
      method: 'get',
    })
  } finally {
    context.commit('logoutMutation')
    EventBus.$emit('logout-success')
    EventBus.$emit('routeTo', { name: 'login' })
  }
}

export const actions = {
  loginAction,
  logoutAction,
}

// mutations
const loginMutation = state => {
  state.error = null
  state.loginInProgress = false
}

const loginFailedMutation = ( state, error ) => {
  state.error = error
  state.loginInProgress = false
  state.user = null
}

const logoutMutation = state => {
  state.user = null
  state.loginInProgress = false
}

const setLoginInProgressMutation = state => {
  state.loginInProgress = true
}

const resetErrorMutation = state => {
  state.error = null
}

const setRequestedRouteBeforeLoginMutation = ( state, routeObj ) => {
  state.requestedRouteBeforeLogin = routeObj
}

const setTokenMutation = ( state, token ) => {
  state.token = token

  if ( token !== undefined ) {
    try {
      const { user } = decode(token, { json: true })

      state.user = user
    } catch
      ( err ) {
      console.error(err)
    }
  }
}

const mutations = {
  loginMutation,
  loginFailedMutation,
  logoutMutation,
  resetErrorMutation,
  setLoginInProgressMutation,
  setRequestedRouteBeforeLoginMutation,
  setTokenMutation,
}

const getters = {
  userIsLoggedIn: state => !!state.user,
  getLoginError: state => state.error,
  getLoginInProgress: state => state.loginInProgress,
  getToken: state => state.token,
  getAuthorities: state => state.user?.authorities || [],
  getUserName: state => state.user ? `${ state.user?.firstName } ${ state.user?.lastName }` : null,
  getRequestedRouteBeforeLogin: state => state.requestedRouteBeforeLogin,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
