<template>
  <q-separator v-if="item.separator" />

  <div v-else>
    <q-item :to="route" clickable dense>
      <q-item-section side>
        <q-icon :color="item.iconColor" :name="item.icon" size="20px" />
      </q-item-section>

      <q-item-section>{{ item.name }}</q-item-section>

      <q-item-section v-if="Array.isArray(item.children) && item.children.length > 0" side>
        <q-icon name="mdi-chevron-right" />
      </q-item-section>

      <q-menu v-if="Array.isArray(item.children)" anchor="top right" self="top left">
        <q-list>
          <menu-item
            v-for="(child, idx) in item.children"
            :key="idx"
            :item="child"
          />
        </q-list>
      </q-menu>
    </q-item>
    <q-separator />
  </div>
</template>

<script>

export default {
  components: {
    'menu-item': () => import('../menu-item'),
  },

  computed: {
    route() {
      if ( !this.item.context ) {
        return
      }

      return `/${ this.item.featureName }/${ this.item.context }`
    },
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
