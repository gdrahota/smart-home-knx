<template>
  <q-card-section class="q-pl-lg">
    <div class="row">
      <div class="col-2 q-pr-sm">
        <component
          :is="controlComponent"
          v-if="controlComponent"
          :endpoint="value"
        />
      </div>
    </div>
  </q-card-section>
</template>

<script>
import { mapGetters } from 'vuex'

import DPT_1_001 from './pdt-1-001'
import DPT_5_001 from './pdt-5-001'
import DPT_9_001 from './pdt-9-001'

export default {
  computed: {
    ...mapGetters({
      getByAddress: 'knxGroupAddresses/values/getByAddress',
    }),
    value() {
      return this.getByAddress(this.selected.address)
    },
    controlComponent() {
      if ( !this.value ) {
        return null
      }

      switch ( this.selected.dataPointType ) {
        case '1.001':
          return DPT_1_001
        case '5.001':
          return DPT_5_001
        case '9.001':
          return DPT_9_001
        default:
          return null
      }
    },
  },

  props: {
    selected: {
      type: Object,
      required: true,
    },
  },
}
</script>
