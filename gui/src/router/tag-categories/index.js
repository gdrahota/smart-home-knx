export const tagCategoriesRoutes = [
  {
    path: '/admin/tag-categories',
    name: 'tag-categories',
    component: () => import('@/components/pages/tag-categories'),
    meta: {
      appTitle: 'Stichwort-Kategorien',
      requiresAuth: true,
    },
  },
]
