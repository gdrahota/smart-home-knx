import store from '@/store'
import { EventBus } from '@/plugins/event-bus'

// Route Guard
export const routeGuard = async ( to, from, next ) => {
  const isNotLoggedIn = !store.getters[ 'login/userIsLoggedIn' ]

  if ( to.matched.length === 0 ) {
    const msgConfig = {
      type: 'negative',
      message: 'Diese Route existiert nicht!',
      timeout: 10000,
      badgeColor: 'red',
      textColor: 'white',
    }
    EventBus.$emit('notify', msgConfig)
    next(false)
  } else if ( to.matched.some(( { meta } ) => meta.requiresAuth) && isNotLoggedIn ) {
    store.commit('login/setRequestedRouteBeforeLoginMutation', to)
    next('/login')
  } else {
    if ( to.matched.some(( { meta } ) => meta?.requiredRole) ) {
      const roleNeeded = to.matched.map(( { meta } ) => meta.requiredRole).flat()

      const userAuthorities = [ ...store.getters[ 'login/user' ].userAuthorities ]

      if ( roleNeeded.some(rn => userAuthorities.indexOf(rn) !== -1) ) {
        next()
      } else {
        this.$q.notify('Sie sind nicht berechtigt, diese Funktion auszuführen!')
        next(false)
      }
    } else {
      next()
    }
  }
}
