<template>
  <q-form>
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-2 q-pr-sm">
            <q-input
              v-model="item.name"
              filled
              label="Bezeichnung / Ort"
              stack-label
            />
          </div>
          <div class="col-3 q-px-sm">
            <q-select
              v-model="item.type"
              :options="typeOptions"
              emit-value
              filled
              label="Typ"
              map-options
              option-label="label"
              option-value="value"
              stack-label
              @input="onTypeChange"
            />
          </div>
          <div class="col-5 q-pr-sm">
            <q-input
              v-model="item.description"
              autogrow
              class="q-mb-md"
              clearable
              filled
              hide-bottom-space
              label="Beschreibung"
              stack-label
            />
          </div>
          <div class="col-2 q-pa-sm">
            <q-btn
              :icon="item._id ? 'save' : 'add'"
              color="primary"
              fab-mini
              @click="save"
            />
            <q-btn
              class="q-ml-md"
              color="red"
              fab-mini
              icon="mdi-delete-outline"
              @click="confirmDelete(item)"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-10 q-pr-sm">
            <tags
              v-if="selected"
              :building-block-id="selected._id"
            />
          </div>

          <div class="col-9">
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <div v-if="item.type">
        <q-splitter
          v-model="splitterModel"
          style="height: calc(100vH - 265px)"
          unit="px"
        >
          <template v-slot:before>
            <div class="q-ma-md">
              <tree-view
                :building-block="item"
                @addChild="addChild"
                @removeChild="removeChild"
                @select="select"
              />
            </div>
          </template>

          <template v-slot:after>
            <div v-if="selectedNode && selectedNode.editableProperties" class="q-ma-md">
              <template v-for="prop of selectedNode.editableProperties">
                <edit
                  :key="prop.name"
                  :data="selectedNode.data"
                  :link="selectedNode.link"
                  :prop="prop"
                  @set="setValue"
                />
              </template>
            </div>
          </template>
        </q-splitter>
      </div>
    </q-card>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'

import Edit from './edit'
import Tags from './tags'
import TreeView from './tree-view'

export default {
  components: {
    Edit,
    Tags,
    TreeView,
  },

  computed: {
    typeOptions() {
      return [
        {
          label: 'Licht',
          value: 'LIGHT',
        },
        {
          label: 'Raumtemperatur-Steuerung (RTC)',
          value: 'ROOM_TEMPERATURE_CONTROL',
        },
        {
          label: 'Rollladen',
          value: 'SHUTTER',
        },
      ]
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    item: null,
    splitterModel: 500,
    selectedNode: null,
  }),

  methods: {
    ...mapActions({
      CREATE: 'admin/buildingBlocks/create',
      UPDATE: 'admin/buildingBlocks/update',
      REMOVE: 'admin/buildingBlocks/remove',
    }),
    init() {
      this.item = JSON.parse(JSON.stringify(this.selected))
    },
    onTypeChange( type ) {
      switch ( type ) {
        case 'SHUTTER':
          this.item.config = {
            hangings: [],
          }
          break
        case 'LIGHT':
          this.item.config = {
            channels: [],
          }
          break
        case 'ROOM_TEMPERATURE_CONTROL':
          this.item.config = {
            name: 'Temperatursteuerung',
            addresses: [
              { name: 'Soll-Temperatur in °C', address: null, type: 'setDesiredTemperature', dtp: '9.001' },
              { name: 'Ist-Temperatur in °C', address: null, type: 'listenActualTemperature', dtp: '9.001' },
              { name: 'Stellwert (An/Aus)', address: null, type: 'binaryValueOfValve', dtp: '1.001' },
              { name: 'Stellwert (0..100%)', address: null, type: 'relativeValueOfValve', dtp: '5.001' },
            ],
          }
          break
        default: {
          this.item.config = null
        }
      }
    },
    setDescription( text ) {
      this.item.description = text
    },
    select( node ) {
      this.selectedNode = node
    },
    setValue( { property, value, link } ) {
      if ( link === 'root' ) {
        return
      }

      const parts = link.split('.')

      let target = this.item

      parts.forEach(part => {
        if ( part.substring(0, 1) === '$' ) {
          target = target[ parseInt(part.substring(1)) ]
        } else {
          target = target[ part ]
        }
      })

      target[ property ] = value
    },
    addChild( { link, property, data } ) {
      const parts = link.split('.')

      let target = this.item

      parts.forEach(part => {
        if ( part.substring(0, 1) === '$' ) {
          target = target[ parseInt(part.substring(1)) ]
        } else {
          target = target[ part ]
        }
      })

      target[ property ].push(data)
    },
    removeChild( link ) {
      const parts = link.split('.')

      let target = this.item

      const lastPart = parts.pop()

      for ( const part of parts ) {
        if ( part.substring(0, 1) === '$' ) {
          target = target[ parseInt(part.substring(1)) ]
        } else {
          target = target[ part ]
        }
      }

      if ( lastPart.substring(0, 1) === '$' ) {
        target = target.splice(parseInt(lastPart.substring(1)), 1)
      } else {
        delete target[ lastPart ]
      }
    },
    save() {
      if ( this.item._id ) {
        this.UPDATE(this.item)
      } else {
        this.CREATE(this.item)
      }
      this.$emit('close')
    },
    confirmDelete( item ) {
      const config = {
        title: `Raum löschen`,
        message: `Sie sind dabei, den Raum "${ item.name }" zu löschen.`,
        position: 'left',
        class: 'bg-orange',
      }

      const onOk = () => {
        this.$emit('remove', this.REMOVE(item._id))
      }

      const onCancel = () => {}

      this.showDialog(config, onOk, onCancel)
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
