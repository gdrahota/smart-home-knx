<template>
  <q-card class="q-ma-md">
    <q-card-section class="border-all--no-border-radius" style="height: 150px">
      <filter-controls
        :values="selectedTags"
        @setTags="setTags"
      />
    </q-card-section>

    <div style="height: calc(100vh - 310px); overflow-y: auto">
      <div class="fit row wrap justify-start items-start content-start q-pa-sm">
        <q-card
          v-for="buildingBlock of filteredBuildingBlocks"
          :key="buildingBlock._id"
          class="q-pa-sm q-pb-lg"
          flat
          style="overflow: auto;"
        >
          <q-bar class="bg-primary text-white">
            <q-chip
              v-for="(tag, pos) of getTagNames(buildingBlock)"
              :key="buildingBlock._id + pos"
              color="primary"
              dark
              dense
              square
              text-color="white"
            >
              <span style="font-size: 14px; font-weight: bold">{{ tag }}</span>
            </q-chip>
          </q-bar>
          <component
            :is="getControlComponent(buildingBlock)"
            :building-block="buildingBlock"
          />
        </q-card>
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { sortByName } from '@/sorters'

import SplitOfListAndDetails from '@/components/shared/split-of-list-and-details'
import Shutter from './shutter'
import Light from './light'
import RTC from './room-temperature-control'
import FilterControls from './filter-controls'

export default {
  components: {
    FilterControls,
    SplitOfListAndDetails,
  },

  computed: {
    ...mapGetters({
      getAll: 'admin/buildingBlocks/getAll',
      getById: 'admin/buildingBlocks/getById',
      getAllTags: 'admin/tags/getAll',
      getTagsByBuildingBlockId: 'admin/tags/getByBuildingBlockId',
    }),
    buildingBlocks() {
      return Object.values(this.getAll).sort(sortByName)
    },
    filteredBuildingBlocks() {
      const categories = {}

      this.selectedTags.forEach(tag => {
        if ( !categories[ tag.categoryId ] ) {
          categories[ tag.categoryId ] = []
        }

        tag.buildingBlocks.forEach(bb => {
          categories[ tag.categoryId ].push(bb)
        })
      })

      let response = []

      Object.keys(categories)
        .filter(catId => categories[ catId ].length > 0)
        .map(catId => categories[ catId ])
        .forEach(( a, pos ) => {
          if ( pos === 0 ) {
            response = a
          } else {
            response = response.filter(x => a.includes(x))
          }
        })

      return response.map(buildingBlockId => this.getById(buildingBlockId))
    },
  },

  created() {
    this.loadAll()
  },

  data: () => ({
    selected: null,
    selectedTags: [],
  }),

  methods: {
    ...mapActions({
      loadAll: 'admin/buildingBlocks/loadAll',
    }),
    getTagNames( buildingBlock ) {
      return this.getTagsByBuildingBlockId(buildingBlock._id).map(tag => tag.name)
    },
    getControlComponent( buildingBlock ) {
      if ( !buildingBlock ) {
        return null
      }

      switch ( buildingBlock.type ) {
        case 'SHUTTER':
          return Shutter
        case 'LIGHT':
          return Light
        case 'ROOM_TEMPERATURE_CONTROL':
          return RTC
        default:
          return null
      }
    },

    setTags( tags ) {
      this.selectedTags = tags
    },
    select( item ) {
      this.selected = item
        ? JSON.parse(JSON.stringify(item))
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
