<template>
  <q-card class="q-mt-lg q-ma-md">
    <div style="height: calc(100vh - 160px); overflow-y: hidden">
      <q-splitter
        v-model="splitModel"
        :limits="[400, Infinity]"
        unit="px"
      >
        <template v-slot:before>
          <select-def
            :selected="selectedKnxGroupAddress"
            @create="createNewKnxGroupAddress"
            @select="selectKnxGroupAddress"
          />
        </template>

        <template v-if="selectedKnxGroupAddress" v-slot:separator>
          <q-avatar color="primary" icon="drag_indicator" size="30px" text-color="white" />
        </template>

        <template v-slot:after>
          <manage-def
            v-if="selectedKnxGroupAddress"
            :selected="selectedKnxGroupAddress"
            @close="() => selectKnxGroupAddress()"
          />

          <mutate-state
            v-if="selectedKnxGroupAddress"
            :selected="selectedKnxGroupAddress"
          />
        </template>
      </q-splitter>
    </div>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ManageDef from './manage-def'
import MutateState from './mutate-state'
import SelectDef from './select-def'

export default {
  components: {
    ManageDef,
    MutateState,
    SelectDef,
  },

  computed: {
    ...mapGetters({
      knxGroupAddresses: 'knxGroupAddresses/defs/getAll',
    }),
  },

  created() {
    this.loadAll()
  },

  data: () => ({
    tab: 'index',
    splitModel: 400,
    selectedKnxGroupAddress: null,
  }),

  methods: {
    ...mapActions({
      loadAll: 'knxGroupAddresses/defs/loadAll',
    }),
    createNewKnxGroupAddress() {
      this.selectedKnxGroupAddress = {
        address: null,
        description: null,
        dataPointType: null,
      }
    },
    selectKnxGroupAddress( id ) {
      this.selectedKnxGroupAddress = this.knxGroupAddresses.find(( { _id } ) => _id === id)
    },
  },
}
</script>
