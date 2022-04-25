export const buildingBlockRoutes = [
  {
    path: '/admin/building-blocks',
    name: 'building-blocks',
    component: () => import('@/components/pages/building-blocks'),
    meta: {
      appTitle: 'Einheiten',
      requiresAuth: true,
    },
  },
]
