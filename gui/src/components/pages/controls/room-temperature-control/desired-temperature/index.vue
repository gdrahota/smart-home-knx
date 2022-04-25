<template>
  <div class="border-all">
    <q-slider
      v-model="localValue"
      :label-value="number(localValue, 1) + ' °C'"
      :max="24"
      :min="18"
      :step="0.5"
      class="q-pa-md"
      color="orange"
      label-always
      label-color="grey-7"
      reverse
      style="height: 240px; padding-top: 30px; padding-left: 95px"
      switch-label-side
      track-size="10px"
      vertical
      @change="data => $emit('propagate', data)"
    />

    <q-bar class="bg-grey-7 full-width text-white" style="margin-top: 60px">
      <div class="text-center" style="width: 200px; font-size: 14px">
        Sollwert
      </div>
      <div class="text-center" style="width: 200px">
        {{ value | number(1) }} °C
      </div>
    </q-bar>
  </div>
</template>

<script>
export default {
  created() {
    this.init()
  },

  data: () => ({
    localValue: 0,
  }),

  methods: {
    init() {
      this.localValue = this.value
    },
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    value() {
      this.init()
    },
  },
}

</script>
