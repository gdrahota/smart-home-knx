<template>
  <q-tree
    v-if="nodes"
    :nodes="nodes"
    default-expand-all
    node-key="link"
  >
    <template v-slot:default-header="prop">
      <div class="row items-center">

        <span class="q-pr-sm">{{ prop.node.label }}</span>

        <q-btn
          v-if="prop.node.editableProperties"
          color="primary"
          round
          size="6px"
          @click.stop="$emit('select',prop.node)"
        >
          <q-icon name="edit" size="12px" />
        </q-btn>

        <q-btn
          v-if="prop.node.addChild"
          color="secondary"
          round
          size="6px"
          @click.stop="addChild(prop.node)"
        >
          <q-icon name="add" size="18px" />
        </q-btn>

        <q-btn
          v-if="prop.node.deletable"
          class="q-ml-sm"
          color="red"
          round
          size="6px"
          @click.stop="removeMyself(prop.node)"
        >
          <q-icon name="delete" size="14px" />
        </q-btn>
      </div>
      <!--      {{ config }}-->
    </template>
  </q-tree>
</template>

<script>
import { lightNodes } from '@/components/pages/building-blocks/manage/tree-view/light'
import { rtcNodes } from '@/components/pages/building-blocks/manage/tree-view/room-temperature-control'
import { shutterNodes } from '@/components/pages/building-blocks/manage/tree-view/shutter'

export default {
  computed: {
    nodes() {
      switch ( this.buildingBlock.type ) {
        case 'LIGHT':
          return lightNodes(this.buildingBlock)
        case 'ROOM_TEMPERATURE_CONTROL':
          return rtcNodes(this.buildingBlock)
        case 'SHUTTER':
          return shutterNodes(this.buildingBlock)
        default:
          return null
      }
    },
  },

  methods: {
    addChild( node ) {
      this.$emit('addChild', {
        link: node.link,
        property: node.addChild.property,
        data: node.addChild.data,
      })
    },
    removeMyself( node ) {
      const { link, label } = node
      const config = {
        title: `"${ label }" entfernen`,
        message: `Wenn Sie den Menüeintrag entfernen, bleibt das Formular erhalten.`,
        position: 'left',
        class: 'bg-orange',
      }

      const onOk = () => {
        this.$emit('removeChild', link)
      }

      const onCancel = () => {}

      this.showDialog(config, onOk, onCancel)
    },
  },

  props: {
    buildingBlock: {
      type: Object,
      required: true,
    },
  },
}
</script>
