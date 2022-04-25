import Vue from 'vue'
import BtnSubmit from './buttons/btn-submit'
import BtnCancel from './buttons/btn-cancel'
import Confirm from './confirm'

export const registerSharedComponents = () => {
  Vue.component('btn-submit', BtnSubmit)
  Vue.component('btn-cancel', BtnCancel)
  Vue.component('Confirm', Confirm)
}
