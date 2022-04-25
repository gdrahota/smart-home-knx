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
      <span style="font-size: 13px; white-space: nowrap">{{ channel.name }}</span>
    </q-bar>

    <div style="height: 40px">
      <q-toggle
        v-if="setBinaryValueAddress.address"
        :color="setBinaryValueAddressValue ? 'yellow-8' : 'grey-5'"
        :false-value="false"
        :indeterminate-value="null"
        :true-value="true"
        :value="setBinaryValueAddressValue"
        class="q-pl-md"
        @input="data => setValue(setBinaryValueAddress.address, data)"
      />
    </div>

    <div style="height: 168px">
      <q-slider
        v-if="setRelativeValueAddress.address"
        :label-value="setRelativeValueAddressValue + ' %'"
        :max="100"
        :min="0"
        :step="5"
        :value="setRelativeValueAddressValue"
        class="q-pa-lg"
        color="yellow"
        inner-track-color="grey-7"
        label-always
        label-color="grey-7"
        reverse
        style="height: 180px"
        switch-marker-labels-side
        track-size="10px"
        vertical
        @change="data => setValue(setRelativeValueAddress.address, data)"
      />
    </div>

    <q-bar class="bg-grey-7 full-width text-white" style="margin-top: 60px">
      <template v-if="luminousFluxValueAddress">
        <div class="text-center" style="font-size: 14px">
          Messwert
        </div>
        <div class="text-center" style="width: 200px">
          {{ luminousFluxValueAddressValue | number(0) }} Lux
        </div>
      </template>
    </q-bar>
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
    setBinaryValueAddress() {
      return this.getAddressByControlEndpointType('setBinaryValue')
    },
    setBinaryValueAddressValue() {
      return this.getValue(this.setBinaryValueAddress.address, false)
    },
    setRelativeValueAddress() {
      return this.getAddressByControlEndpointType('setRelativeValue')
    },
    setRelativeValueAddressValue() {
      return this.getValue(this.setRelativeValueAddress.address, 0)
    },
    luminousFluxValueAddress() {
      return this.getAddressByControlEndpointType('luminousFluxValue')
    },
    luminousFluxValueAddressValue() {
      return this.getValue(this.getAddressByControlEndpointType('luminousFluxValue')?.address || '', 0)
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
    getValue( address, defaultValue ) {
      return this.getValueByAddress(address)?.value === null
        ? defaultValue
        : this.getValueByAddress(address)?.value
    },
    getAddressByControlEndpointType( name ) {
      return this.channel.addresses.find(( { type } ) => type === name)
    },
    setValue( address, value ) {
      const def = this.getDefByAddress(address)
      this.propagate({ _id: def._id, value, dataPointType: def.dataPointType })
    },
    requestValue() {
      this.channel.addresses.filter(addressObj => addressObj.address).map(addressObj => {
        const def = this.getDefByAddress(addressObj.address)
        if ( !def ) {
          console.error(`Unknown KNX group address "${ addressObj.address }"`)
        }

        return this.readFromKnxBus(def._id).then()
      })
    },
  },

  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
}
</script>
