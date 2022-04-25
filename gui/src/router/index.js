import Vue from 'vue'
import VueRouter from 'vue-router'
import { routeGuard } from '@/router/auth-guard'
import { EventBus } from '@/plugins/event-bus'

import store from '@/store'

import { appRoutes } from '@/router/app'
import { knxDataPointRoutes } from '@/router/knx-data-points'
import { tagCategoriesRoutes } from '@/router/tag-categories'
import { buildingBlockRoutes } from '@/router/building-blocks'
import { controlRoutes } from '@/router/controls'
import { tagRoutes } from '@/router/tags'

Vue.use(VueRouter)

export const routes = [
  ...appRoutes,
  ...buildingBlockRoutes,
  ...controlRoutes,
  ...knxDataPointRoutes,
  ...tagCategoriesRoutes,
  ...tagRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(routeGuard)

router.afterEach(() => {
  EventBus.$emit('reset-subtitle')
  EventBus.$emit('clear-feature-menu-items')
})

store.subscribe(mutation => {
  if ( mutation.type === 'login/logoutMutation' ) {
    if ( router.history.current && router.history.current.name !== 'home' ) {
      router.replace({ name: 'home' })
    }
  }
})

export default router
