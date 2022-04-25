<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      :nodes="treeNodes"
      default-expand-all
      label-key="name"
      no-nodes-label=""
      node-key="id"
    >
      <template v-slot:default-header="{ node }">
        <tree-node :node="node" />
      </template>
    </q-tree>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import TreeNode from './tree-node'

export default {
  components: {
    TreeNode,
  },

  computed: {
    ...mapGetters({
      mainMenus: 'app/menus/featureMenus/getMenuItemTree',
    }),
    treeNodes() {
      return [ {
        isRootNode: true,
        name: 'Hauptmenüs',
        children: this.mainMenus,
      } ]
    },
  },

  created() {
    this.setNodeToEdit()
  },

  methods: {
    ...mapMutations({
      setNodeToEdit: 'app/menus/featureMenus/editMutation',
    }),
  },
}
</script>
