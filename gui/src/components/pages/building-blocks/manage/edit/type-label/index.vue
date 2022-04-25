<template>
  <q-input
    :label="prop.label"
    :value="data[prop.name]"
    class="q-mb-md"
    dense
    filled
    @input="setValue"
  />
</template>

<script>
export default {
  methods: {
    setValue( value ) {
      this.$emit('set', {
        property: this.prop.name,
        value,
        link: this.link,
      })
    },
  },

  props: {
    prop: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: null,
    },
  },
}
</script>
