<template>
  <q-item :disable="menuItem.disabled && menuItem.disabled()" clickable @click="action(menuItem.value)">
    <q-item-section>{{ menuItem.label }}</q-item-section>
    <q-item-section v-if="children" side>
      <q-icon name="keyboard_arrow_right" />
    </q-item-section>
    <q-item-section v-if="menuItem.icon" side>
      <q-icon :color="menuItem.iconColor" :name="menuItem.icon" />
    </q-item-section>

    <q-menu v-if="children" anchor="top right" self="top left">
      <q-list>
        <q-item
          v-for="(child, idx) in children"
          :key="idx"
          :disable="menuItem.disabled && menuItem.disabled()"
          clickable
          @click="menuItem.action(child.value)"
        >
          <q-item-section>{{ child.title }}</q-item-section>
          <q-item-section v-if="child.subTitle" side>
            {{ child.subTitle }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-item>
</template>

<script>
export default {
  computed: {
    children() {
      return this.menuItem.getChildren
        ? this.menuItem.getChildren()
        : false
    },
  },

  methods: {
    action( value ) {
      if ( this.menuItem.action ) {
        this.menuItem.action(value)
      }
    },
  },

  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
}
</script>
