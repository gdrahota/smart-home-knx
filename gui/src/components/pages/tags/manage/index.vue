<template>
  <q-form>
    <q-card-section>
      <div class="row">
        <div class="col-3 q-pr-sm">
          <q-select
            v-model="tag.categoryId"
            :options="categories"
            filled
            label="Kategorie"
            option-label="name"
            option-value="_id"
            stack-label
          />
        </div>
        <div class="col-3 q-pr-sm">
          <q-input
            v-model="tag.name"
            filled
            label="Stichwort"
            stack-label
          />
        </div>
        <div class="col-4 q-pr-sm">
          <q-input
            v-model="tag.description"
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
            :icon="tag._id ? 'save' : 'add'"
            color="primary"
            fab-mini
            @click="save"
          />
          <q-btn
            class="q-ml-md"
            color="red"
            fab-mini
            icon="mdi-delete-outline"
            @click="confirmDelete(tag)"
          />
        </div>
      </div>
    </q-card-section>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { sortByName } from '@/sorters'

export default {
  computed: {
    ...mapGetters({
      getAllTags: 'admin/tags/getAll',
      categories: 'admin/tagCategories/getAll',
    }),
    tags() {
      return [ ...this.getAllTags ].sort(sortByName)
    },
  },

  created() {
    this.init()
  },

  data: () => ({
    tag: null,
  }),

  methods: {
    ...mapActions({
      CREATE: 'admin/tags/create',
      UPDATE: 'admin/tags/update',
      REMOVE: 'admin/tags/remove',
    }),
    init() {
      this.tag = JSON.parse(JSON.stringify(this.selected))
    },
    setDescription( text ) {
      this.tag.description = text
    },
    save() {
      if ( this.tag._id ) {
        this.UPDATE(this.tag)
      } else {
        this.CREATE(this.tag)
      }
      this.$emit('close')
    },
    confirmDelete( tag ) {
      const config = {
        title: `Stichwort löschen`,
        message: `Sie sind dabei, das Stichwort "${ tag.name }" zu löschen.`,
        position: 'left',
        class: 'bg-orange',
      }

      const onOk = () => {
        this.$emit('remove', this.REMOVE(tag._id))
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
