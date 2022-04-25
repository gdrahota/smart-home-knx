<template>
  <q-list bordered class="q-mr-lg q-ml-md q-my-md" style="height: calc(100vh - 190px); overflow-y: auto;">
    <q-page-sticky :offset="[0, 10]" position="top-left">
      <q-btn
        color="secondary"
        fab-mini
        icon="add"
        @click="$emit('create')"
      />
    </q-page-sticky>
    <template v-for="item of knxGroupAddresses">
      <q-item
        :key="`item-${item._id}`"
        :active="selected && selected._id === item._id"
        clickable
        @click="$emit('select', item._id)"
      >
        <q-item-section avatar>
          <q-item-label>{{ item.address }}</q-item-label>
          <q-item-label caption>DPT {{ item.dataPointType }}</q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label>{{ getKnxGAValue(item.address) }}</q-item-label>
          <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator :key="`separator-${item._id}`" />
    </template>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      knxGroupAddresses: 'knxGroupAddresses/defs/getAll',
      getByAddress: 'knxGroupAddresses/values/getByAddress',
    }),
  },

  data: () => ({
    menu: false,
    showCreateMenu: false,
  }),

  methods: {
    getKnxGAValue( address ) {
      return this.getByAddress(address)?.value
    },
  },

  props: {
    selected: {
      type: Object,
      required: false,
      default: null,
    },
  },
}
</script>
