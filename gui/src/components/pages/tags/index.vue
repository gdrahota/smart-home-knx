<template>
  <split-of-list-and-details
    :min-left-width-in-px="200"
    :show-add-btn="true"
    add-btn-tooltip="Tag hinzufügen"
    @add="addNew"
  >
    <template v-slot:left>
      <q-list>
        <template v-for="tag of tags">
          <q-item
            :key="'item-' + tag._id"
            :active="selected && tag._id === selected._id"
            clickable
            @click="select(tag)"
          >
            <q-item-section>
              <q-item-label>{{ tag.name }}</q-item-label>
              <q-item-label caption>{{ getCategoryNameById(tag.categoryId) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator :key="'sep-' + tag._id" />
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
      getAll: 'admin/tags/getAll',
      getCategoryById: 'admin/tagCategories/getById',
    }),
    tags() {
      return [ ...this.getAll ].sort(sortByName)
    },
  },

  data: () => ({
    selected: null,
  }),

  methods: {
    getCategoryNameById( id ) {
      return this.getCategoryById(id)?.name
    },
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
