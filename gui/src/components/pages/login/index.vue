<template>
  <q-form ref="signInForm">
    <q-page class="q-pa-lg">
      <q-card class="place-in-center-of-screen">
        <q-bar class="bg-primary text-white" dark>
          Anmeldung
        </q-bar>

        <q-separator />

        <q-card-section class="login-card">
          <div class="full-width q-pa-md">
            <q-input
              v-model="username"
              :disable="loginInProgress"
              :rules="rules.username"
              autocomplete="username"
              class="q-pb-lg"
              filled
              label="Anmeldename"
              @input="validate"
              @keypress.enter="signIn"
            />
            <q-input
              v-model="password"
              :disable="loginInProgress"
              autocomplete="password"
              class="q-pt-lg"
              filled
              label="Kennwort"
              type="password"
              @keypress.enter="signIn"
            />
          </div>
        </q-card-section>

        <q-linear-progress
          v-if="loginInProgress"
          color="blue"
          indeterminate
          rounded
          size="5px"
          track-color="white"
        />

        <q-separator />

        <q-card-actions class="bg-grey-4">
          <q-space />
          <btn-submit :disable="!formValidity || loginInProgress" label="Anmelden" @submit="signIn" />
        </q-card-actions>
      </q-card>
    </q-page>
  </q-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loginInProgress: 'login/getLoginInProgress',
    }),
    rules() {
      return {
        username: [
          v => !!v || 'Bitte den Anmeldenamen eintragen!',
        ],
      }
    },
  },

  data: () => ({
    username: null,
    password: null,
    formValidity: null,
  }),

  methods: {
    ...mapActions({
      login: 'login/loginAction',
    }),
    validate() {
      const view = this.$refs[ 'signInForm' ]

      if ( view ) {
        this.$nextTick(() => {
          view.validate().then(isValid => {
            this.formValidity = isValid
          })
        })
      } else {
        this.formValidity = false
      }
    },
    signIn() {
      if ( this.formValidity ) {
        this.login({
          username: this.username,
          password: this.password,
        })
      }
    },
  },

  validations: {
    username: {
      required,
    },
  },
}
</script>

<style lang="sass">
.login-card
  height: 282px
  align-items: flex-start

.place-in-center-of-screen
  position: absolute
  top: 50%
  left: 50%
  margin-top: -200px
  margin-left: -200px
  width: 400px
  height: 368px
</style>
