<template>
  <q-dialog
    id="manage-form-action-icon"
    :value="true"
    persistent
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-icon name="mdi-emoticon-outline" />
        <div>Icon</div>

        <q-space />

        <q-btn dense flat icon="close" @click="close" />
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col q-col-gutter-lg-md q-px-md">
            <q-field
              readonly
              stack-label
            >
              <template v-slot:control>
                <q-btn
                  :color="localIconColor"
                  :icon="localIcon"
                  flat
                  round
                  size="md"
                />
                {{ localIcon }}
              </template>
            </q-field>

            <q-input
              v-model="searchIconName"
              class="q-pt-md"
              clearable
              hide-bottom-space
              label="Icon-Suche nach Namen"
              outlined
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-scroll-area class="q-mt-md q-card--bordered q-pa-sm" style="height: calc(80vH - 300px); width: 100%;">
              <div class="row">
                <div
                  v-for="icon of filteredIcons"
                  :key="icon"
                  class="col-2"
                >
                  <q-btn
                    :icon="icon"
                    flat
                    round
                    size="md"
                    @click="localIcon = icon"
                  />
                </div>
              </div>
            </q-scroll-area>
          </div>

          <div class="col q-col-gutter-lg-md q-px-md">
            <q-field
              label="Farbe"
              outlined
              stack-label
            >
              <template v-slot:control>
                {{ localIconColor }}
              </template>
            </q-field>

            <q-scroll-area class="q-mt-md q-card--bordered" style="height: calc(80vH - 229px); width: 100%;">
              <div
                v-for="color of colors"
                :key="color"
                class="row"
              >
                <div
                  :class="`text-${color}-14`"
                  class="col-4 text-bold"
                  style="padding-top: 14px; padding-right: 10px; text-align: right;"
                >
                  {{ color.toUpperCase() }}
                </div>
                <div
                  v-for="i in 4"
                  :key="i"
                  class="col-2"
                >
                  <q-btn
                    :color="`${color}-${i * 2}`"
                    :icon="localIcon"
                    flat
                    round
                    size="md"
                    @click="localIconColor = `${color}-${i * 2}`"
                  />
                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-grey-4">
        <btn-cancel @cancel="close" />
        <q-space />
        <btn-submit @submit="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { icons } from './icons'

export default {
  computed: {
    saveIconColor() {
      return this.envelope.icon === this.localIcon
        ? 'grey-4'
        : 'primary'
    },
    filteredIcons() {
      if ( !this.searchIconName || this.searchIconName.length === 0 ) {
        return icons
      }

      return icons.filter(iconName => iconName.indexOf(this.searchIconName.toLowerCase()) !== -1)
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    options: icons,
    localIcon: null,
    localIconColor: null,
    colors: [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime',
      'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey' ],
    searchIconName: null,
  }),

  methods: {
    init() {
      this.localIcon = this.envelope.icon
      this.localIconColor = this.envelope.color
    },
    filterIcons( val, update ) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = icons.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    restoreIcon() {
      this.localIcon = this.envelope.icon
      this.editMode = false
    },
    save() {
      this.$emit('update', { ...this.envelope, icon: this.localIcon, color: this.localIconColor })
    },
    close() {
      this.$emit('close')
    },
  },

  props: {
    envelope: {
      type: Object,
      required: true,
    },
  },

  watch: {
    'envelope.icon'() {
      this.init()
    },
  },
}
</script>

<style lang="sass">
#manage-form-action-icon .q-dialog__inner--minimized > div
  max-width: 80% !important
  width: 900px !important
  max-height: 80%
</style>
