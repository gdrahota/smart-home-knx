<template>
  <container
    :drag-handle-selector="node.isRootNode ? '.column-drag-handle' : null"
    :get-child-payload="() => node"
    :should-accept-drop="() => true"
    behaviour="drop-zone"
    style="display: flex"
    @drop="onDrop"
  >
    <draggable>
      <q-bar
        :class="node.isRootNode ? 'q-pl-sm' : 'q-pl-xs'"
        :style="barStyle"
        class="bg-white text-black-4 bar clickable"
        dense
        @click.prevent.stop="() => {}"
        @click.stop="editNode"
      >
        <q-icon
          v-if="!node.isRootNode"
          class="column-drag-handle q-py-sm q-pr-xs"
          name="mdi-drag"
          size="20px"
          style="float: left;"
        />

        <q-icon v-if="node.icon" :color="node.iconColor" :name="node.icon" size="20px" />

        <div>{{ node.name }}</div>

        <q-space />

        <div class="q-pa-md q-gutter-y-md column items-start">
          <q-btn-group flat push>
            <q-btn
              v-if="node && (node.feature && !node.feature.instanceId) || node.isRootNode"
              color="primary"
              dense
              flat
              icon="add_circle_outline"
              size="10px"
              @click.stop="addNode"
            />

            <delete-node v-if="!node.isRootNode" :node="node" />
          </q-btn-group>
        </div>
      </q-bar>
    </draggable>
  </container>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import DeleteNode from './delete'

export default {
  components: {
    Container,
    DeleteNode,
    Draggable,
  },

  computed: {
    ...mapGetters({
      nodeToEdit: 'app/menus/featureMenus/getItemToEdit',
    }),
    barStyle() {
      const opacity = this.nodeToEdit
        ? this.nodeToEdit.id
          ? this.nodeToEdit.id === this.node.id
            ? 1
            : .5
          : this.nodeToEdit.parentId === this.node.id
            ? 1
            : .5
        : 1

      return `opacity: ${ opacity };`
    },
  },

  methods: {
    ...mapActions({
      update: 'app/menus/featureMenus/updateAction',
    }),
    ...mapMutations({
      setNodeToEdit: 'app/menus/featureMenus/editMutation',
    }),
    addNode() {
      this.setNodeToEdit({
        name: null,
        icon: null,
        iconColor: 'black',
        id: null,
        parentId: this.node.id,
        children: [],
      })
    },
    editNode() {
      if ( !this.node.isRootNode ) {
        this.setNodeToEdit({
          ...this.node,
        })
      }
    },
    onDrop( { addedIndex, payload } ) {
      if ( addedIndex !== null ) {
        this.update({
          ...payload,
          parentId: this.node.id || null,
        })
      }
    },
  },

  props: {
    node: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
.q-pa-md
  padding: 16px 0 16px 16px

.bar
  border: 1px solid #ddd
  border-radius: 4px
  height: 32px
  padding-right: 0

.column-drag-handle
  cursor: grab
</style>
