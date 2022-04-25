<template>
  <split-of-list-and-details
    :min-left-width-in-px="200"
    :show-add-btn="true"
    add-btn-tooltip="Tag-Kategorie hinzufügen"
    @add="addNew"
  >
    <template v-slot:left>
      <q-list>
        <template v-for="tagCategory of tagCategories">
          <q-item
            :key="'item-' + tagCategory._id"
            :active="selected && tagCategory._id === selected._id"
            clickable
            @click="select(tagCategory)"
          >
            <q-item-section>
              <q-item-label>{{ tagCategory.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator :key="'sep-' + tagCategory._id" />
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
import { mapGetters } from 'vuex'

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
      tagCategories: 'admin/tagCategories/getAll',
    }),
    rooms() {
      return Object.values(this.getAll).sort(sortByName)
    },
  },

  data: () => ({
    selected: null,
  }),

  methods: {
    select( tagCategory ) {
      this.selected = tagCategory
        ? JSON.parse(JSON.stringify(tagCategory))
        : null
    },
    addNew() {
      this.select({
        name: null,
        description: null,
      })
    },
  },
}
</script>
