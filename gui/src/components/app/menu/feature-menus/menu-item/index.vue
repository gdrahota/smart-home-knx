<template>
  <div>
    <q-item v-if="userAccessAllowed" :to="route" clickable>
      <q-item-section v-if="item.icon" side>
        <q-icon :color="item.iconColor" :name="item.icon" size="20px" />
      </q-item-section>

      <q-item-section>{{ item.name }}</q-item-section>

      <q-item-section v-if="Array.isArray(item.children) && item.children.length > 0" side>
        <q-icon name="mdi-chevron-right" />
      </q-item-section>

      <q-menu v-if="Array.isArray(item.children)" anchor="top right" self="top left">
        <q-list>
          <menu-item
            v-for="(menuItem, idx) in item.children"
            :key="idx"
            :item="menuItem"
          />
        </q-list>
      </q-menu>
    </q-item>
    <q-separator v-if="item.insertSeparatorAfter" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    'menu-item': () => import('../menu-item'),
  },

  computed: {
    ...mapGetters({
      getTableDefinitionById: 'genericViews/table/definitions/getById',
      getTreeTableDefinitionById: 'genericViews/treeTable/definitions/getById',
      getEntityByName: 'genericViews/entityMetadata/getEntityByName',
    }),
    featureName() {
      return this.item.featureName
    },
    userAccessAllowed() {
      if ( !this.item.feature?.instanceId ) {
        return false
      }

      switch ( this.item.feature.name ) {
        case 'chart':
          return true
        case 'tree-table': {
          const table = this.getTreeTableDefinitionById(this.item.feature.instanceId)
          if ( table ) {
            const entityName = table.entityName
            const requiredAuthority = `${ entityName[ 0 ].toUpperCase() + entityName.slice(1) }.read`
            return this.holdsUserAuthority(requiredAuthority)
          }
          return false
        }
        case 'table': {
          const table = this.getTableDefinitionById(this.item.feature.instanceId)
          if ( table ) {
            const entityName = table.entityName
            const requiredAuthority = `${ entityName[ 0 ].toUpperCase() + entityName.slice(1) }.read`
            return this.holdsUserAuthority(requiredAuthority)
          }
          return false
        }
        default:
          return false
      }

    },
    route() {
      if ( !this.item.feature ) {
        return
      }

      return `/${ this.item.feature.group }/${ this.item.feature.name }/${ this.item.feature.instanceId }`
    },
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
