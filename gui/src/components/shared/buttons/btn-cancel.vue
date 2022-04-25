<template>
  <q-btn
    :color="disable ? 'grey' : color"
    :dense="dense"
    :disable="disable"
    :flat="flat"
    :icon-right="icon"
    :label="label"
    @click="$emit('cancel')"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'red',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Abbrechen',
    },
    cancel: {
      type: Function,
      default: () => {
        console.error('btn-cancel: cancel prop is missing')
      },
    },
    icon: {
      type: String,
      required: false,
    },
    flat: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
