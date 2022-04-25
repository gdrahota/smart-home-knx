export const controlRoutes = [
  {
    path: '/controls/all',
    name: 'controls',
    component: () => import('@/components/pages/controls'),
    meta: {
      appTitle: 'Steuern und Regeln',
      requiresAuth: true,
    },
  },
]
