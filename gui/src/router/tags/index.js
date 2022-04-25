export const tagRoutes = [
  {
    path: '/admin/tags',
    name: 'tags',
    component: () => import('@/components/pages/tags'),
    meta: {
      appTitle: 'Stichworte',
      requiresAuth: true,
    },
  },
]
