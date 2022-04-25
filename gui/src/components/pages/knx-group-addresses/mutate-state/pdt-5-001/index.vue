<template>
  <div>
    <q-slider
      v-model="value"
      label="0..100%"
      step="10"
    />
    {{ endpoint }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    value: {
      get() {
        return this.endpoint.value
      },
      set( value ) {
        this.propagate({ _id: this.endpoint._id, value, dataPointType: this.endpoint.dataPointType })
      },
    },
  },

  methods: {
    ...mapActions({
      propagate: 'knxGroupAddresses/values/propagate',
    }),
  },

  props: {
    endpoint: {
      type: Object,
      required: true,
    },
  },
}
</script>
