<template>
  <q-btn
    color="red"
    dense
    flat
    icon="mdi-delete-outline"
    size="10px"
    @click.stop="confirmRemove"
  />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapActions({
      remove: 'app/menus/featureMenus/removeAction',
    }),
    ...mapMutations({
      setNodeToEdit: 'app/menus/featureMenus/editMutation',
    }),
    confirmRemove() {
      const config = {
        title: `Menüeintrag "${ this.node.name }" entfernen`,
        message: `Wenn Sie den Menüeintrag entfernen, bleibt das Formular erhalten.`,
        position: 'left',
        class: 'bg-orange',
      }

      const onOk = () => {
        this.remove(this.node.id)
        this.setNodeToEdit()
      }

      const onCancel = () => {}

      this.showDialog(config, onOk, onCancel)
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
