<template>
  <q-btn-dropdown v-if="holdsUserAuthority('ROLE_MANAGE_FORMS')" flat stretch>
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-icon color="white" left name="filter_vintage" size="20px" />
        <div class="text-center">
          App-Konfiguration
        </div>
      </div>
    </template>

    <q-list>
      <menu-item
        v-for="(item, idx) of menuItems"
        :key="idx"
        :item="item"
      />
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import MenuItem from '../menu-item'
import { mapGetters } from 'vuex'

export default {
  components: {
    MenuItem,
  },

  computed: {
    ...mapGetters({}),
    menuItems() {
      return [
        {
          featureName: 'app-config',
          context: 'manage-menu-items',
          name: 'Menü-Konfiguration',
          icon: 'menu',
        },
        {
          featureName: '',
          context: '',
          name: 'Admin',
          icon: 'settings',
          children: [
            {
              featureName: 'admin',
              context: 'building-blocks',
              name: 'Steuerungen',
              icon: 'sports_esports',
            },
            {
              featureName: 'knx-group-addresses',
              context: 'defs',
              name: 'KNX-Gruppenadressen',
              icon: 'dns',
            },
            {
              featureName: 'admin',
              context: 'tag-categories',
              name: 'Stichwort-Kategorien',
              icon: 'my_location',
            },
            {
              featureName: 'admin',
              context: 'tags',
              name: 'Stichwörter',
              icon: 'my_location',
            },
          ],
        },
        {
          featureName: 'controls',
          context: 'all',
          name: 'Steuern und Regeln',
          icon: 'upload',
        },
      ]
    },
  },
}
</script>
