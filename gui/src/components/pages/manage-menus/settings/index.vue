<template>
  <div v-if="node" class="q-pl-md">
    <q-card>
      <q-bar class="shadow-2 bg-primary text-white">
        <q-icon :name="node._id ? 'edit' : 'mdi-plus-circle'" size="22px" />
        <div class="text-body2">
          Menüeintrag
          <template v-if="node._id">
            ändern
          </template>
          <template v-else>
            hinzufügen
          </template>
        </div>
        <q-space />
        <q-btn dense flat icon="close" @click="close" />
      </q-bar>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              v-model="name"
              filled
              label="Menüeintragsname"
              stack-label
            />
          </div>

          <div class="col-4">
            <q-select
              v-model="featureGroup"
              :options="featureGroups"
              clearable
              emit-value
              filled
              label="Feature-Gruppe"
              map-options
              stack-label
            />
          </div>

          <div class="col-4">
            <q-select
              v-model="feature"
              :disable="!canBecomeLeafNode"
              :options="features"
              clearable
              emit-value
              filled
              label="Feature"
              map-options
              stack-label
            />
          </div>

          <div class="col-4">
            <q-input
              :value="icon"
              class="clickable"
              clearable
              filled
              label="Icon"
              outlined
              stack-label
              @clear="clearIcon"
              @click="showEditIconDialog = true"
            >
              <template v-slot:before>
                <q-icon
                  :color="iconColor"
                  :name="icon"
                  size="20px"
                />
              </template>
              <template v-if="icon" v-slot:append>
                <q-icon
                  color="red"
                  name="delete"
                  size="20px"
                  @click="clearIcon"
                />
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-select
              v-model="instanceId"
              :disable="!canBecomeLeafNode || !featureGroup || !feature"
              :options="targetOptions"
              :readonly="!canBecomeLeafNode || !featureGroup || !feature"
              clearable
              emit-value
              filled
              label="Diese Seite aufrufen"
              map-options
              option-label="name"
              option-value="context"
              outlined
              stack-label
            >
              <template v-slot:option="{ opt, toggleOption }">
                <q-item clickable @click="toggleOption(opt)">
                  <q-item-section>
                    <q-item-label>{{ opt.name }}</q-item-label>
                    <q-item-label caption>
                      {{ opt.targetType }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    {{ opt.covered }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>

        <div class="row q-gutter-md q-pt-md">
          <div class="col">
            <q-checkbox
              v-model="insertSeparatorAfter"
              label="Trennlinie am Ende anfügen"
            />
          </div>
        </div>

        <manage-icon
          v-if="showEditIconDialog === true"
          :envelope="{ icon: icon, color: iconColor }"
          @close="showEditIconDialog = false"
          @update="updateIconAndColor"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-grey-4">
        <btn-cancel dense @cancel="close" />
        <q-space />
        <btn-submit dense @submit="save" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import ManageIcon from '@/components/shared/manage-icon'

export default {
  components: {
    ManageIcon,
  },

  computed: {
    ...mapGetters({
      node: 'app/menus/featureMenus/getItemToEdit',
      nodes: 'app/menus/featureMenus/getAll',
      allTableDefinitions: 'genericViews/table/definitions/getAll',
      allTreeTableDefinitions: 'genericViews/treeTable/definitions/getAll',
    }),
    canBecomeLeafNode() {
      if ( !this.node._id ) {
        return true
      }

      return this.node.children.length === 0
    },
    featureGroups() {
      const options = [
        { label: 'Ansicht', value: 'generic-views' },
      ]
      return Object.freeze(options)
    },
    features() {
      if ( this.featureGroup ) {
        switch ( this.featureGroup ) {
          case 'generic-views': {
            const options = [
              { label: 'Tabellen-Ansicht', value: 'table' },
              { label: 'Baum-Tabellen-Ansicht', value: 'tree-table' },
            ]
            return Object.freeze(options)
          }
          case 'generic-charts': {
            const options = [
              { label: 'Diagramm', value: 'chart' },
            ]
            return Object.freeze(options)
          }
          default: {
            const options = [
              { label: 'keine Ahnung', value: 'chart' },
            ]
            return Object.freeze(options)
          }
        }
      }

      return null
    },
    targetOptions() {
      switch ( this.feature ) {
        case 'table': {
          return this.allTableDefinitions.map(table => ({
            ...table,
            targetType: 'Tabelle',
            context: `${ table.id }`,
            feature: {
              group: this.featureGroup,
              feature: this.feature,
              instanceId: table.id,
            },
            covered: this.occurrences[ table.id ]
              ? 'wird verwendet'
              : this.node.context === table.id
                ? 'aktuell ausgewählt'
                : 'offen',
          }))
        }
        case 'tree-table': {
          return this.allTreeTableDefinitions.map(table => ({
            ...table,
            targetType: 'Baum-Tabelle',
            context: `${ table.id }`,
            feature: {
              group: this.featureGroup,
              feature: this.feature,
              instanceId: table.id,
            },
            covered: this.occurrences[ table.id ]
              ? 'wird verwendet'
              : this.node.context === table.id
                ? 'aktuell ausgewählt'
                : 'offen',
          }))
        }
        default: {
          return []
        }
      }
    },
    occurrences() {
      const occurrences = {}
      this.nodes
        .filter(node => node._id)
        .filter(( { id } ) => id !== this.node._id)
        .forEach(n => {
          if ( !occurrences[ n._id ] ) {
            occurrences[ n._id ] = 0
          }

          occurrences[ n._id ]++
        })

      return occurrences
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    showEditIconDialog: false,

    name: null,
    featureGroup: null,
    feature: null,
    instanceId: null,
    icon: null,
    iconColor: null,
    parentId: null,
    insertSeparatorAfter: null,
  }),

  methods: {
    ...mapActions({
      add: 'app/menus/featureMenus/addAction',
      update: 'app/menus/featureMenus/updateAction',
      remove: 'app/menus/featureMenus/removeAction',
    }),
    ...mapMutations({
      setNodeToEdit: 'app/menus/featureMenus/editMutation',
    }),
    init() {
      if ( this.node ) {
        this.name = this.node.name

        if ( this.node.feature ) {
          this.feature = this.node.feature.name
          this.featureGroup = this.node.feature.group
          this.instanceId = this.node.feature.instanceId
        }

        this.icon = this.node.icon
        this.iconColor = this.node.iconColor
        this.parentId = this.node.parentId
        this.insertSeparatorAfter = this.node.insertSeparatorAfter
      } else {
        this.name = null
        this.feature = null
        this.featureGroup = null
        this.instanceId = null
        this.icon = null
        this.iconColor = null
        this.parentId = null
        this.insertSeparatorAfter = false
      }
    },
    updateIconAndColor( { icon, color } ) {
      this.icon = icon
      this.iconColor = color
      this.showEditIconDialog = false
    },
    clearIcon() {
      this.icon = null
    },
    save() {
      let featureName = ''

      if ( this.context ) {
        featureName = this.context.includes('view')
          ? 'generic-views'
          : 'generic-charts'
      }

      const payload = {
        featureName,
        name: this.name,
        icon: this.icon,
        iconColor: this.iconColor,
        parentId: this.parentId,
        feature: {
          group: this.featureGroup,
          name: this.feature,
          instanceId: this.instanceId,
        },
        insertSeparatorAfter: this.insertSeparatorAfter,
      }

      if ( this.node.children.length === 0 ) {
        payload.context = this.context
      }

      if ( [ undefined, null ].indexOf(this.node._id) !== -1 ) {
        this.add(payload)
      } else {
        payload._id = this.node._id
        this.update(payload)
      }

      this.setNodeToEdit()
    },
    close() {
      this.setNodeToEdit()
    },
  },

  watch: {
    node() {
      this.init()
    },
    featureGroup( newValue ) {
      if ( newValue === null ) {
        this.feature = null
        this.instanceId = null
      }
    },
    feature( newValue ) {
      if ( newValue === null ) {
        this.instanceId = null
      }
    },
  },
}
</script>
