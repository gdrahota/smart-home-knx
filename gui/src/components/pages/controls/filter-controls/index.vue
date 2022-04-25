<template>
  <div>
    <div v-for="cat of tagCategories" :key="cat._id">
      <div class="q-pb-sm" style="overflow-x: auto; width: calc(100vW - 60px); white-space: nowrap; float: left; display: flex">
        <q-chip square>{{ cat.name }}</q-chip>
        <div v-for="tag of tagsByCategoryId(cat._id)" :key="tag._id">
          <div class="border-all q-pr-md q-ma-xs">
            <q-checkbox
              v-model="selectedTags"
              :label="tag.name"
              :val="tag"
              color="teal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortByName } from '@/sorters'

export default {
  computed: {
    ...mapGetters({
      getAllTags: 'admin/tags/getAll',
      getAllTagCategories: 'admin/tagCategories/getAll',
      getCategoryById: 'admin/tagCategories/getById',
    }),
    tagCategories() {
      return [ ...this.getAllTagCategories ].sort(sortByName)
    },
    selectedTags: {
      get() {
        return this.values
      },
      set( tags ) {
        this.$emit('setTags', tags)
      },
    },
  },

  methods: {
    tagsByCategoryId( id ) {
      return [ ...this.getAllTags.filter(i => i.categoryId === id) ].sort(sortByName)
    },
  },

  props: {
    values: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>
