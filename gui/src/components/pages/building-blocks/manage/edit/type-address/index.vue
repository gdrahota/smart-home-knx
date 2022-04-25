<template>
  <q-select
    :label="`GA ${prop.label}`"
    :option-value="prop.name"
    :options="filteredOptions"
    :value="selectedOption"
    class="q-mb-md"
    clearable
    emit-value
    filled
    map-options
    stack-label
    style="max-width: 500px"
    use-input
    @filter="filterOptions"
    @input="setValue"
  >
    <template v-slot:option="{ opt, itemProps, itemEvents }">
      <q-item
        clickable
        v-bind="itemProps"
        v-on="itemEvents"
      >
        <q-item-section avatar style="width: 100px">
          <q-item-label>{{ opt.address }}</q-item-label>
          <q-item-label style="font-size: 10px">DPT {{ opt.dataPointType }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>

    <template v-slot:selected-item="{ opt }">
      <q-item clickable dense>
        <q-item-section avatar style="width: 100px">
          <q-item-label>{{ opt.address }}</q-item-label>
          <q-item-label style="font-size: 10px">DPT {{ opt.dataPointType }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section>
          <q-item-label>Keine Gruppenadresse vom Typ "{{ data.dtp }}" vorhanden</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortByAddress } from '@/sorters'

export default {
  computed: {
    ...mapGetters({
      getAll: 'knxGroupAddresses/defs/getAll',
    }),
    selectedOption() {
      return this.options.find(( { address } ) => address === this.localValue)
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    localValue: null,
    options: [],
    filteredOptions: [],
  }),

  methods: {
    init() {
      this.localValue = this.data[ this.prop.name ]
      this.options = this.getAll.filter(( { dataPointType } ) => dataPointType === this.data.dtp).sort(sortByAddress)
    },
    filterOptions( val, update ) {
      if ( val === null || val === '' ) {
        update(() => {
          this.filteredOptions = this.options
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.options.filter(v => {
          return v.address.toLowerCase().indexOf(needle) > -1 || (v.description && v.description.toLowerCase().indexOf(needle) > -1)
        })
      })
    },
    setValue( value ) {
      this.localValue = value
      this.$emit('set', {
        property: this.prop.name,
        value,
        link: this.link,
      })
    },
  },

  props: {
    prop: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: null,
    },
  },

  watch: {
    data() {
      this.init()
    },
  },
}
</script>
