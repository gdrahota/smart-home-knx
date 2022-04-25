<template>
  <div class="row" style="width: 300px!important;">
    <div class="col-6">
      <desired-temperature
        :value="setDesiredTemperatureValue"
        @propagate="propagateDesiredTemperature"
      />
    </div>
    <div class="col-6">
      <actual-temperature :value="actualTemperatureValue" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ActualTemperature from './actual-temperature'
import DesiredTemperature from './desired-temperature'

export default {
  components: {
    ActualTemperature,
    DesiredTemperature,
  },

  computed: {
    ...mapGetters({
      getDefByAddress: 'knxGroupAddresses/defs/getByAddress',
      getValueByAddress: 'knxGroupAddresses/values/getByAddress',
    }),
    actualTemperatureAddress() {
      return this.getAddressByControlEndpointType('listenActualTemperature')
    },
    actualTemperatureValue() {
      return this.getValue(this.actualTemperatureAddress.address, 0)
    },
    setDesiredTemperatureAddress() {
      return this.getAddressByControlEndpointType('setDesiredTemperature')
    },
    setDesiredTemperatureValue() {
      return this.getValue(this.setDesiredTemperatureAddress.address, 0)
    },
  },

  methods: {
    ...mapActions({
      propagate: 'knxGroupAddresses/values/propagate',
    }),
    getValue( address, defaultValue ) {
      return this.getValueByAddress(address)?.value === null
        ? defaultValue
        : this.getValueByAddress(address)?.value
    },
    getAddressByControlEndpointType( name ) {
      return this.buildingBlock.config.addresses.find(( { type } ) => type === name)
    },
    setValue( address, value ) {
      const def = this.getDefByAddress(address)
      this.propagate({ _id: def._id, value, dataPointType: def.dataPointType })
    },
    propagateDesiredTemperature( value ) {
      const def = this.getDefByAddress(this.setDesiredTemperatureAddress.address)
      this.propagate({ _id: def._id, value, dataPointType: def.dataPointType })
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
