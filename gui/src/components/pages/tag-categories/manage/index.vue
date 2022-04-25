<template>
  <q-form>
    <q-card-section>
      <div class="row">
        <div class="col-4 q-pr-sm">
          <q-input
            v-model="tagCategory.name"
            filled
            label="Bezeichnung"
            stack-label
          />
        </div>
        <div class="col-6 q-pr-sm">
          <q-input
            v-model="tagCategory.description"
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
            :icon="tagCategory._id ? 'save' : 'add'"
            color="primary"
            fab-mini
            @click="save"
          />
          <q-btn
            class="q-ml-md"
            color="red"
            fab-mini
            icon="mdi-delete-outline"
            @click="confirmDelete(tagCategory)"
          />
        </div>
      </div>
    </q-card-section>

    <q-separator />
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.init()
  },

  data: () => ({
    tagCategory: null,
  }),

  methods: {
    ...mapActions({
      CREATE: 'admin/tagCategories/create',
      UPDATE: 'admin/tagCategories/update',
      REMOVE: 'admin/tagCategories/remove',
    }),
    init() {
      this.tagCategory = JSON.parse(JSON.stringify(this.selected))
    },
    setDescription( text ) {
      this.tagCategory.description = text
    },
    save() {
      if ( this.tagCategory._id ) {
        this.UPDATE(this.tagCategory)
      } else {
        this.CREATE(this.tagCategory)
      }
      this.$emit('close')
    },
    confirmDelete( tagCategory ) {
      const config = {
        title: `Raum löschen`,
        message: `Sie sind dabei, den Raum "${ tagCategory.name }" zu löschen.`,
        position: 'left',
        class: 'bg-orange',
      }

      const onOk = () => {
        this.$emit('remove', this.REMOVE(tagCategory._id))
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
