<template>
  <q-btn
    :color="color"
    :dense="dense"
    :disable="disable"
    :flat="flat"
    :icon-right="icon"
    :label="label"
    @click="$emit('submit')"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Speichern',
    },
    submit: {
      type: Function,
      default: () => {
        console.error('btn-submit: submit prop is missing')
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
