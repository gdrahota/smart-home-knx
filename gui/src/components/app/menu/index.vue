<template>
  <q-header class="db-header shadow-1" elevated reveal>
    <q-toolbar class="q-pt-md">
      <template v-if="isLoggedIn">
        <template v-for="(storedMainMenuItem, idx) in storedMainMenuItems">
          <feature-menus :key="idx" :item="storedMainMenuItem" />
        </template>

        <q-space />

        <template v-if="holdsUserAuthority('AppDeveloper')">
          <route-specific-menu
            v-for="(config, idx) of routeSpecificMenuConfig"
            :key="`route-specific-menu-${idx}`"
            :config="config"
          />

          <q-space />
          <app-config />
        </template>
      </template>

      <template v-if="!isLoggedIn">
        <q-space />
        <q-btn
          :to="{ name: 'login' }"
          class="text-bold"
          flat
          icon="mdi-login"
          label="Anmelden"
          stretch
        />
      </template>
      <q-btn
        v-else
        flat
        icon-right="mdi-logout"
        label="Abmelden"
        stretch
        @click="logout"
      />
    </q-toolbar>

    <q-toolbar class="bg-blue-grey-2 q-mt-md" style="min-height: 33px">
      <q-btn
        :disable="$route.name === 'home'"
        :to="{ name: 'home' }"
        class="q-mr-sm"
        dense
        flat
        label="Startseite"
      />

      <q-toolbar-title>
        <span class="q-pl-sm text-subtitle1 ellipsis">Wohnung</span>
        <span
          v-for="(item, idx) of breadcrumbs"
          :key="idx"
          :class="{ 'text-primary text-bold': (idx + 1) === breadcrumbs.length}"
          class="text-subtitle1 ellipsis"
        >
          <span class="text-subtitle1 q-px-sm text-primary text-bold">&gt;</span>
          {{ item }}
        </span>
      </q-toolbar-title>

      <q-space />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppConfig from './app-config'
import RouteSpecificMenu from './route-specific-menu'
import FeatureMenus from '@/components/app/menu/feature-menus'

export default {
  components: {
    AppConfig,
    FeatureMenus,
    RouteSpecificMenu,
  },

  computed: {
    ...mapGetters({
      getRoles: 'login/getAuthorities',
      getMainMenuItemsByFeatureName: 'app/menus/features/getMainMenuItemsByFeatureName',
      routeSpecificMenuConfig: 'app/menus/routeSpecificMenu/getConfig',
      storedMainMenuItems: 'app/menus/featureMenus/getMenuItemTree',
      subAppTitle: 'app/getAppSubTitle',
      getAll: 'app/menus/featureMenus/getAll',
      getBreadcrumbsStartFromView: 'app/menus/featureMenus/getBreadcrumbsStartFromView',
    }),
  },

  created() {
    this.getBreadCrumbs()
  },

  data: () => ({
    breadcrumbs: [],
  }),

  methods: {
    ...mapMutations({
      logout: 'login/logoutMutation',
    }),
    getBreadCrumbs() {
      this.breadcrumbs = []

      const { name, params, meta } = this.$route

      switch ( name ) {
        case 'tableDefinitions.show': {
          this.breadcrumbs.push('Tabellen-Definition')
          const tableDef = this.getByClassName(params.className)
          this.breadcrumbs.push(tableDef.label)
          break
        }
        case 'treeTable':
        case 'table':
        case 'viewWithFixedFilters':
          this.breadcrumbs = this.getBreadcrumbsStartFromView(params.id)
          break
        case 'entity':
          this.breadcrumbs.unshift('Entität')

          if ( params.entityName ) {
            this.breadcrumbs.unshift(params.entityName)
          }
          break
        default:
          this.breadcrumbs.unshift(meta.appTitle)
      }
    },
  },

  watch: {
    '$route'() {
      this.getBreadCrumbs()
    },
  },
}
</script>

<style lang="sass">
header.q-layout__section--marginal.db-header
  background-color: #fff !important
  color: #222
  height: 99px
  margin-left: 15px
  margin-right: 15px
  top: 4px

.db-header .block
  color: var(--q-color-primary) !important
  padding-top: 2px
  font-size: 16px
  font-weight: bold
</style>
