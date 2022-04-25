import Vue from 'vue'
import Vuex from 'vuex'

import admin from '@/store/admin'
import app from '@/store/app'
import login from '@/store/login'
import users from '@/store/users'
import knxGroupAddresses from './knx-group-addresses'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    admin,
    app,
    knxGroupAddresses,
    login,
    users,
  },
  strict: process.env.env !== 'production',
})

export default store

export const getters = store.getters
export const commit = store.commit
export const dispatch = store.dispatch
