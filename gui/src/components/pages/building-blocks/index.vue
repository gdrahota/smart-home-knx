<template>
  <split-of-list-and-details
    :min-left-width-in-px="200"
    :show-add-btn="true"
    add-btn-tooltip="Steuerung hinzufügen"
    @add="addNew"
  >
    <template v-slot:left>
      <q-list
        bordered
        style="height: calc(100vH - 160px); overflow-y: auto"
      >
        <template v-for="item of buildingBlocks">
          <q-item
            :key="'item-' + item._id"
            :active="selected && item._id === selected._id"
            clickable
            @click="select(item)"
          >
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator :key="'sep-' + item._id" />
        </template>
      </q-list>
    </template>

    <template v-slot:right>
      <manage
        v-if="selected"
        :selected="selected"
        @close="select()"
      />
    </template>
  </split-of-list-and-details>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Manage from './manage'
import SplitOfListAndDetails from '@/components/shared/split-of-list-and-details'
import { sortByName } from '@/sorters'

export default {
  components: {
    Manage,
    SplitOfListAndDetails,
  },

  computed: {
    ...mapGetters({
      getAll: 'admin/buildingBlocks/getAll',
    }),
    buildingBlocks() {
      return Object.values(this.getAll).sort(sortByName)
    },
  },

  created() {
    this.loadAll()
  },

  data: () => ({
    selected: null,
  }),

  methods: {
    ...mapActions({
      loadAll: 'admin/buildingBlocks/loadAll',
    }),
    select( item ) {
      this.selected = item
        ? JSON.parse(JSON.stringify(item))
        : null
    },
    addNew() {
      this.select({
        name: null,
        description: null,
        config: {},
      })
    },
  },
}
</script>
