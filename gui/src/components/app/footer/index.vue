<template>
  <q-footer class="bg-blue-grey-6 text-white" elevated>
    <q-bar dense>
      <div class="text-white text-caption jump-to-supplier">
        Created by
        <a class="text-white text-bold" href="https://www.db-training.de/" target="_blank">DB Training</a>
      </div>

      <q-space />

      <q-chip v-if="isAdmin" color="transparent" flat square>
        <q-icon color="orange" left name="mdi-account-circle" size="20px" />
        <span id="is-admin" class="text-white capitalize">Entwickler</span>
      </q-chip>

      <q-chip v-if="userName" color="transparent" flat square>
        <q-icon color="teal-12" left name="mdi-account" size="20px" />
        <span id="user-name" class="text-white capitalize">{{ userName }}</span>
      </q-chip>
    </q-bar>
  </q-footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      username: 'login/getUserName',
    }),
    userName() {
      return this.username || null
    },
    isAdmin() {
      return this.holdsUserAuthority('AppDeveloper')
    },
  },
}
</script>

<style lang="sass">
.jump-to-supplier
  > a
    text-decoration: none

.jump-to-supplier:hover
  > a
    text-decoration: underline
</style>
