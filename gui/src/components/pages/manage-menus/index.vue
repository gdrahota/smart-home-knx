<template>
  <div class="q-pa-md q-gutter-sm q-mt-none">
    <q-splitter
      v-model="splitterModel"
      class="bg-white shadow-0"
      style="height: calc(100vH - 163px); border: 1px solid #ddd;"
    >
      <template v-slot:before>
        <tree-view class="q-pa-lg" />
      </template>

      <template v-slot:separator>
        <q-avatar color="primary" icon="drag_indicator" size="40px" text-color="white" />
      </template>

      <template v-slot:after>
        <div class="q-pa-lg">
          <settings />
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Settings from './settings'
import TreeView from './tree-view'

export default {
  components: {
    Settings,
    TreeView,
  },

  data: () => ({
    splitterModel: 50,
  }),

  methods: {
    ...mapMutations({
      setNodeToEdit: 'app/menus/featureMenus/editMutation',
    }),
    addNode() {
      this.setNodeToEdit({
        name: null,
        icon: null,
        iconColor: 'black',
        context: null,
        parentId: null,
        children: [],
      })
    },
    editNode() {
      this.setNodeToEdit({
        ...this.node,
      })
    },
  },
}
</script>
