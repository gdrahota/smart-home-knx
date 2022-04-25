<template>
  <div class="border-all">
    <vue-thermometer
      :max="24"
      :min="18"
      :options="options"
      :value="value"
      class="q-pa-md"
      style="height: 300px"
    />

    <q-bar class="bg-grey-7 full-width text-white">
      <div class="text-center" style="width: 200px; font-size: 14px">
        Messwert
      </div>
      <div class="text-center" style="width: 200px">
        {{ value | number(1) }} °C
      </div>
    </q-bar>
  </div>
</template>

<script>
export default {
  computed: {
    options() {
      return {
        layout: {
          height: 250,
          width: 80,
        },
      }
    },
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
}
</script>
