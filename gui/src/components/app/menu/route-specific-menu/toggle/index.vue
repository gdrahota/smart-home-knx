<template>
  <q-item clickable>
    <q-item-section @click="value = !value">
      {{ menuItem.label }}
    </q-item-section>
    <q-item-section side>
      <q-toggle
        v-model="value"
        dense
      />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  computed: {
    value: {
      get() {
        return this.menuItem.getValue()
      },
      set( value ) {
        this.menuItem.action(value)
      },
    },
  },

  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
}
</script>
