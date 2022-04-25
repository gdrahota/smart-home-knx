<template>
  <div class="flex">
    <div
      v-for="hanging of buildingBlock.config.hangings"
      :key="hanging._id"
      class="border-all"
      style="width: 150px"
    >
      <hanging
        :hanging="hanging"
        style="height: 331px"
      />
    </div>
  </div>
</template>

<script>
import Hanging from './hanging'

export default {
  components: {
    Hanging,
  },

  props: {
    buildingBlock: {
      type: Object,
      required: true,
    },
  },
}
</script>
