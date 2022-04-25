<template>
  <q-btn-dropdown
    v-if="!item.feature.instanceId"
    class="q-ml-md"
    flat
    stretch
  >
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-icon
          v-if="!!item.icon"
          :color="item.iconColor"
          :name="item.icon"
          left
          size="24px"
        />
        <div class="text-center">
          {{ item.name }}
        </div>
      </div>
    </template>

    <q-list>
      <menu-item
        v-for="(child, idx) in item.children"
        :key="idx"
        :item="child"
      />
    </q-list>
  </q-btn-dropdown>

  <menu-item
    v-else
    :item="{ ...item, insertSeparatorAfter: false }"
  />
</template>

<script>
import MenuItem from './menu-item'

export default {
  components: {
    MenuItem,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
