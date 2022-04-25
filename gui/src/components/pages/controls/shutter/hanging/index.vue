<template>
  <div>
    <q-bar class="bg-primary text-white">
      <q-btn
        color="yellow"
        fab-mini
        flat
        icon="refresh"
        @click="requestValue"
      />
      <div style="font-size: 13px; white-space: nowrap">{{ hanging.name }}</div>
    </q-bar>

    <q-slider
      :label-value="currentPositionValue + ' %'"
      :max="100"
      :min="0"
      :step="5"
      :value="currentPositionValue"
      class="q-pa-lg"
      color="grey-7"
      inner-track-color="yellow"
      label-always
      switch-marker-labels-side
      track-size="10px"
      vertical
      @change="data => setPosition(positionSet.address, data)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getDefByAddress: 'knxGroupAddresses/defs/getByAddress',
      getValueByAddress: 'knxGroupAddresses/values/getByAddress',
    }),
    positionSet() {
      return this.getAddressByControlEndpointType('positionSet')
    },
    positionListen() {
      return this.getAddressByControlEndpointType('positionListen')
    },
    positionListenValue() {
      return this.getValue(this.positionListen.address)
    },
    currentPositionValue() {
      const setValueObj = this.getValueByAddress(this.positionSet.address)
      const listenValueObj = this.getValueByAddress(this.positionListen.address)

      let response = 0

      if ( setValueObj && listenValueObj ) {
        response = setValueObj.timestamp > listenValueObj.timestamp
          ? setValueObj.value
          : listenValueObj.value
      }

      if ( setValueObj?.value ) {
        response = setValueObj.value
      }

      if ( listenValueObj?.value ) {
        response = listenValueObj.value
      }

      return Math.round(response / 10) * 10
    },
  },

  methods: {
    ...mapActions({
      propagate: 'knxGroupAddresses/values/propagate',
      readFromKnxBus: 'knxGroupAddresses/values/readFromKnxBus',
    }),
    getValue( address ) {
      return this.getValueByAddress(address)?.value || 0
    },
    getAddressByControlEndpointType( name ) {
      return this.hanging.addresses.find(( { type } ) => type === name)
    },
    setPosition( address, value ) {
      const def = this.getDefByAddress(address)
      this.propagate({ _id: def._id, value, dataPointType: def.dataPointType })
    },
    requestValue() {
      this.hanging.addresses.filter(addressObj => addressObj.address).map(addressObj => {
        const def = this.getDefByAddress(addressObj.address)
        if ( !def ) {
          console.error(`Unknown KNX group address "${ addressObj.address }"`)
        }

        return this.readFromKnxBus(def._id).then()
      })
    },
  },

  props: {
    hanging: {
      type: Object,
      required: true,
    },
  },
}
</script>
