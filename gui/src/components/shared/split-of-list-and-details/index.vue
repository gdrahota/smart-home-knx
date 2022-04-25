<template>
  <q-card class="q-mt-lg q-ma-md" flat>
    <div style="height: calc(100vh - 160px); overflow-y: hidden">
      <q-splitter
        v-model="splitModel"
        :limits="[minLeftWidthInPx, Infinity]"
        separator-class="bg-grey-3"
        separator-style="width: 36px"
        unit="px"
      >
        <template v-slot:before>
          <div style="height: calc(100vh - 160px); overflow-y: hidden">
            <slot name="left"></slot>
          </div>
        </template>

        <template v-if="showSplitterControl" v-slot:separator>
          <div>
            <q-btn
              v-if="showAddBtn"
              class="q-my-lg"
              color="secondary"
              round
              size="10px"
              @click="$emit('add')"
            >
              <q-tooltip
                v-if="addBtnTooltip"
                :delay="400"
                :offset="[10, 10]"
                anchor="center right"
                content-class="bg-teal"
                self="center left"
              >
                {{ addBtnTooltip }}
              </q-tooltip>
              <q-icon name="add" />
            </q-btn>
            <q-avatar
              color="grey-8"
              icon="drag_indicator"
              size="30px"
              text-color="white"
            />
          </div>
        </template>

        <template v-slot:after>
          <div style="height: calc(100vh - 160px); overflow-y: hidden">
            <slot name="right"></slot>
          </div>
        </template>
      </q-splitter>
    </div>
  </q-card>
</template>

<script>
export default {
  data: () => ({
    splitModel: 50,
  }),

  props: {
    showSplitterControl: {
      type: Boolean,
      default: true,
    },
    minLeftWidthInPx: {
      type: Number,
      default: 200,
    },
    showAddBtn: {
      type: Boolean,
      default: false,
    },
    addBtnTooltip: {
      type: String,
      default: null,
    },
  },
}
</script>
