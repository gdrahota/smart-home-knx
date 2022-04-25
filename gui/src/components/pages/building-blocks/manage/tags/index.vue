<template>
  <q-select
    v-model="tags"
    :options="filteredOptions"
    filled
    hide-bottom-space
    label="Schlagwörter"
    multiple
    option-label="name"
    option-value="_id"
    use-chips
    use-input
    @filter="filterOptions"
  >
    <template v-slot:option="{ opt, itemProps, itemEvents }">
      <q-item
        clickable
        dense
        v-bind="itemProps"
        v-on="itemEvents"
      >
        <q-item-section>
          <q-item-label>{{ opt.name }}</q-item-label>
          <q-item-label caption>{{ getCategoryNameById(opt.categoryId) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>

    <template v-slot:selected-item="scope">
      <q-chip
        :tabindex="scope.tabindex"
        color="white"
        removable
        text-color="secondary"
        @remove="scope.removeAtIndex(scope.index)"
      >
        {{ scope.opt.name }}
      </q-chip>
    </template>
  </q-select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { sortByName } from '@/sorters'

export default {
  computed: {
    ...mapGetters({
      getAllTags: 'admin/tags/getAll',
      getTagsByBuildingBlockId: 'admin/tags/getByBuildingBlockId',
      getAllCategories: 'admin/tagCategories/getAll',
      getCategoryById: 'admin/tagCategories/getById',
    }),
    allTags() {
      return [ ...this.getAllTags ].sort(sortByName)
    },
    categories() {
      return [ ...this.getAllCategories ].sort(sortByName)
    },
    tags: {
      get() {
        return this.getTagsByBuildingBlockId(this.buildingBlockId)
      },
      set( newTagsForThisBuildingBlock ) {
        const currentTagsForThisBuildingBlock = this.getTagsByBuildingBlockId(this.buildingBlockId)

        const newTagsForThisBuildingBlockIds = newTagsForThisBuildingBlock.map(( { _id } ) => _id)
        const currentTagsForThisBuildingBlockIds = currentTagsForThisBuildingBlock.map(( { _id } ) => _id)

        const toBeDeleted = currentTagsForThisBuildingBlockIds.filter(x => !newTagsForThisBuildingBlockIds.includes(x))
        const toBeAdded = newTagsForThisBuildingBlockIds.filter(x => !currentTagsForThisBuildingBlockIds.includes(x))

        toBeDeleted.forEach(tagId => this.removeBuildingBlockFromTag({ tagId, buildingBlockId: this.buildingBlockId }))
        toBeAdded.forEach(tagId => this.addBuildingBlockToTag({ tagId, buildingBlockId: this.buildingBlockId }))
      },
    },
  },

  data: () => ({
    filteredOptions: [],
  }),

  methods: {
    ...mapActions({
      removeBuildingBlockFromTag: 'admin/tags/removeBuildingBlockFromTag',
      addBuildingBlockToTag: 'admin/tags/addBuildingBlockToTag',
    }),
    getCategoryNameById( id ) {
      return this.getCategoryById(id)?.name
    },
    filterOptions( val, update ) {
      if ( val === null || val === '' ) {
        update(() => {
          this.filteredOptions = this.allTags
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.allTags.filter(tag => {
          return tag.name.toLowerCase().indexOf(needle) > -1
        })
      })
    },
  },

  props: {
    buildingBlockId: {
      type: String,
      required: true,
    },
  },
}
</script>
