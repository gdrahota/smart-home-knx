<template>
  <q-btn-dropdown
    v-close-popup
    flat
    stretch
  >
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-icon
          v-if="config.icon"
          :color="config.iconColor"
          :name="config.icon"
          left
          size="20px"
        />
        <div class="text-center">
          {{ config.label }}
        </div>
      </div>
    </template>

    <q-list>
      <template v-for="(menuItem, idx) in config.items">
        <template v-if="menuItem.type === 'menu-item'">
          <menu-item :key="idx" :menu-item="menuItem" />
        </template>

        <template v-else-if="menuItem.type === 'toggle'">
          <toggle :key="idx" :menu-item="menuItem" />
        </template>

        <template v-else-if="menuItem.type === 'separator'">
          <q-separator :key="idx" />
        </template>

        <q-item v-else :key="idx" clickable>
          <q-item-section>{{ menuItem.label }}???</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import MenuItem from './menu-item'
import Toggle from './toggle'

export default {
  components: {
    MenuItem,
    Toggle,
  },

  data: () => ({
    menu: false,
  }),

  props: {
    config: {
      type: Object,
      required: true,
    },
  },
}
</script>
