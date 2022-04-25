import features from '@/store/app/menu/features'
import routeSpecificMenu from '@/store/app/menu/route-specific-menu'
import featureMenus from '@/store/app/menu/feature-menus'

export default {
  namespaced: true,
  modules: {
    features,
    featureMenus,
    routeSpecificMenu,
  },
}
