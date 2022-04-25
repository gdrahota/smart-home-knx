import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import rootMixin from './mixins'
import { installFormValidators } from './plugins/validators'
import { registerSharedComponents } from './components/shared'
import { configureAxios } from './store/http-client'
import './plugins/event-bus'
import './quasar'
import { registerFilters } from './filters'
import '@/assets/styles/index.sass'
import VueCurrencyFilter from 'vue-currency-filter'
import VueThermometer from 'vuejs-thermometer'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

//options object to pass into SocketIO
localStorage.debug = '#*'

const url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
export const socket = SocketIO(url)

Vue.use(VueThermometer)

Vue.use(new VueSocketIO({
  debug: false,
  connection: socket,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}))

Vue.use(VueCurrencyFilter,
  {
    symbol: '€',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'trailing',
    symbolSpacing: true,
    avoidEmptyDecimals: undefined,
  })

Vue.config.productionTip = false

Vue.mixin(rootMixin)

installFormValidators()
registerSharedComponents()
configureAxios()
registerFilters()

const vueConfig = {
  router,
  store,
  render: h => h(App),
}

new Vue(vueConfig).$mount('#app')
