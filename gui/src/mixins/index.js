import { mapGetters, mapMutations } from 'vuex'
import { textHighlighter } from '@/functions/text-highligter'
import sanitizeHtml from 'sanitize-html'
import { EventBus } from '@/plugins/event-bus'

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'login/userIsLoggedIn',
      userAuthorities: 'login/getAuthorities',
    }),
  },

  methods: {
    ...mapMutations({
      setAppSubTitle: 'app/setMutation',
    }),
    showDialog( options, onOk = null, onCancel = null, onDismiss = null ) {
      const _options = {}
      if ( !onOk && !onCancel ) {
        _options.ok = {
          label: 'Verstanden',
        }
      }

      if ( !onCancel ) {
        _options.cancel = null
      }

      const dialogOptions = {
        ok: {
          label: 'Ja',
          dark: false,
        },
        cancel: {
          label: 'Nein',
          flat: true,
          dark: false,
          color: 'black', // Never use "red" here! Otherwise, the btn will not be displayed for some unknown reason.
        },
        dismiss: true,
        persistent: true,
        position: 'bottom',
        class: 'bg-red q-ma-md',
        html: true,
        ...options,
        ..._options,
      }

      const dialog = this.$q.dialog(dialogOptions)

      if ( onOk ) {
        dialog.onOk(onOk)
      }

      if ( onCancel ) {
        dialog.onCancel(onCancel)
      }

      if ( onDismiss ) {
        dialog.onDismiss(onDismiss)
      }
    },
    textHighlighter,
    sanitizeHtml,
    number( value, numberOfDecimalDigits = 0 ) {
      const formatOptions = {
        minimumFractionDigits: numberOfDecimalDigits,
        maximumFractionDigits: numberOfDecimalDigits,
      }

      let roundedValue = 0

      if ( value ) {
        const factor = Math.pow(10, numberOfDecimalDigits)
        roundedValue = Math.round(value * factor) / factor
      }

      return new Intl.NumberFormat('de-DE', formatOptions).format(roundedValue)
    },
    routeTo( route ) {
      EventBus.$emit('routeTo', route)
    },
    getEnvVar( name ) {
      return process.env[ name ].toLowerCase() || null
    },
    holdsUserAuthority( roles = [] ) {
      console.log('holdsUserAuthority -> user roles', roles)
      return true
      //
      //if ( this.userAuthorities.length === 0 ) {
      //  return false
      //}
      //
      //if ( [ null, undefined ].includes(roles) ) {
      //  return false
      //}
      //
      //if ( typeof roles !== 'object' && !Array.isArray(roles) ) {
      //  roles = [ roles ]
      //}
      //
      //if ( roles.length === 0 ) {
      //  return false
      //}
      //
      //if ( this.userAuthorities.some(userRole => roles.indexOf(userRole) !== -1) ) {
      //  return true
      //}
      //
      //return this.userAuthorities.some(userRole => userRole === 'AppDeveloper')
    },
    emit( type, msg ) {
      EventBus.$emit(type, msg)
    },
    notify( message, caption, color = 'green', timeout = 5000, position = 'top', closeBtn = true ) {
      this.emit('notify', {
        message,
        caption,
        color,
        position,
        progress: true,
        timeout,
        closeBtn,
        progressClass: 'bg-white',
        classes: 'q-pa-md',
      })
    },
  },

  props: {
    view: {
      type: Object,
      required: false,
    },
  },
}
