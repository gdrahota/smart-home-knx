<template>
  <div class="flex">
    <div
      v-for="channel of buildingBlock.config.channels"
      :key="channel._id"
      class="border-all"
      style="width: 175px"
    >
      <channel
        :channel="channel"
        style="height: 323px"
      />
    </div>
  </div>
</template>

<script>
import Channel from './channel'
import { mapGetters } from 'vuex'

export default {
  components: {
    Channel,
  },

  computed: {
    ...mapGetters({
      getTagsByBuildingBlockId: 'admin/tags/getByBuildingBlockId',
    }),
  },

  props: {
    buildingBlock: {
      type: Object,
      required: true,
    },
  },
}
</script>
