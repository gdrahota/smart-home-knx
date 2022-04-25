<template>
  <component
    :is="component"
    v-if="component"
    :data="data"
    :link="link"
    :prop="prop"
    @set="setValue"
  />
</template>

<script>
import TypeAddress from './type-address'
import TypeLabel from './type-label'

export default {
  computed: {
    component() {
      switch ( this.prop.type ) {
        case 'label':
          return TypeLabel
        case 'address':
          return TypeAddress
        default:
          return null
      }
    },
  },

  methods: {
    setValue( data ) {
      this.$emit('set', data)
    },
  },

  props: {
    prop: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
