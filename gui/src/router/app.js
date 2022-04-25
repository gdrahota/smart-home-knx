import RouterView from '@/components/shared/router-view'

const homeRoute = {
  path: '/',
  name: 'home',
  component: () => import('@/components/pages/home'),
  meta: {
    appTitle: 'Startseite',
  },
}

const loginRoute = {
  path: '/login',
  name: 'login',
  component: () => import('@/components/pages/login'),
  meta: {
    appTitle: 'Anmelden',
  },
}

const appConfig = {
  path: '/app-config',
  name: 'app-config',
  component: RouterView,
  meta: {
    appTitle: 'App-Konfiguration',
    requiresAuth: true,
  },
  children: [
    {
      path: '/app-config/manage-menu-items',
      name: 'manage-menu-items',
      component: () => import('@/components/pages/manage-menus'),
      meta: {
        appTitle: 'Menü-Konfiguration',
      },
    },
  ],
}

export const appRoutes = [
  homeRoute,
  loginRoute,
  appConfig,
]

