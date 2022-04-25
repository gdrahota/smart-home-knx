export const knxDataPointRoutes = [
  {
    path: '/knx-group-addresses/defs',
    name: 'knx-group-address-defs',
    component: () => import('@/components/pages/knx-group-addresses'),
    meta: {
      appTitle: 'KNX Endpunkt-Definition',
      requiresAuth: true,
    },
  },
  //{
  //  path: '/knx-group-addresses/values',
  //  name: 'knx-group-address-values',
  //  component: () => import('@/components/pages/external-apis'),
  //  meta: {
  //    appTitle: 'KNX Endpunkt-Definition',
  //    requiresAuth: true,
  //  },
  //},
]
