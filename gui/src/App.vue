<template>
  <q-layout class="bg-grey-3" style="overflow-y: hidden" view="hhh lpR fff">
    <div class="window-height">
      <q-resize-observer @resize="resize" />
      <Menu />
      <q-page-container>
        <router-view />
      </q-page-container>
      <Footer />
    </div>
  </q-layout>
</template>

<script>
import Footer from './components/app/footer'
import Menu from './components/app/menu'

import { mapGetters } from 'vuex'

export default {
  components: {
    Footer,
    Menu,
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'login/userIsLoggedIn',
    }),
  },

  created() {
    if ( this.isLoggedIn ) {
      this.emit('login-success')
    }
  },

  data: () => ({
    height: 500,
  }),

  methods: {
    resize( size ) {
      this.height = size - 130
    },
  },
}
</script>

<style lang="sass">
[clickable], .clickable
  cursor: pointer !important

.font-weight-bold-on-hover:hover
  font-weight: bold
</style>
