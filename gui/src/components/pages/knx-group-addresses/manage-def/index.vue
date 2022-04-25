<template>
  <q-form>
    <q-card-section class="q-pl-lg">
      <div class="row">
        <div class="col-2 q-pr-sm">
          <q-input
            v-model="knxGA.address"
            label="KNX-Gruppenadresse"
            outlined
            stack-label
          />
        </div>

        <div class="col-2 q-pr-sm">
          <q-select
            v-model="knxGA.dataPointType"
            :options="dataPointTypeOptions"
            emit-value
            label="DPT"
            option-value="value"
            outlined
            stack-label
          >
            <template v-slot:option="{ opt, toggleOption }">
              <q-item clickable dense @click="toggleOption(opt)">
                <q-item-section>
                  <q-item-label>{{ opt.value }}</q-item-label>
                  <q-item-label caption>
                    {{ opt.description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle :value="selected" @input="toggleOption(opt)" />
                </q-item-section>
              </q-item>
              <q-separator />
            </template>
          </q-select>
        </div>
        <div class="col-6 q-pr-sm">
          <q-input
            v-model="knxGA.description"
            autogrow
            class="q-mb-md"
            clearable
            filled
            hide-bottom-space
            label="Beschreibung"
            stack-label
          />
        </div>
        <div class="col-2 q-pr-sm">
          <q-btn
            :icon="knxGA._id ? 'save' : 'add'"
            color="primary"
            fab
            @click="save"
          />
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="q-pa-md q-pl-lg">
    </q-card-actions>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
import { KnxDataPointTypes } from '@/store/enums/knx-data-point-type'

export default {
  computed: {
    dataPointTypeOptions() {
      return KnxDataPointTypes
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    knxGA: null,
  }),

  methods: {
    ...mapActions({
      SAVE: 'knxGroupAddresses/defs/update',
    }),
    init() {
      this.knxGA = JSON.parse(JSON.stringify(this.selected))
    },
    setDescription( text ) {
      this.knxGA.description = text
    },
    save() {
      this.SAVE(this.knxGA)
      this.$emit('close')
    },
  },

  props: {
    selected: {
      type: Object,
      required: true,
    },
  },

  watch: {
    selected() {
      this.init()
    },
  },
}
</script>
