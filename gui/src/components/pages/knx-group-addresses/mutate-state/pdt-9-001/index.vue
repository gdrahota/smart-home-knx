<template>
  <div>
    <vue-thermometer
      :max="24"
      :min="18"
      :value="endpoint.value"
    />
    <q-chip
      color="teal-2"
      icon="thermostat"
      square
    >
      <span class="text-body1">
      {{ endpoint.value | number(1) }} °C
      </span>
    </q-chip>
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
