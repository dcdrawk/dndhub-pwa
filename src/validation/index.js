import Vue from 'vue'
import VeeValidate from 'vee-validate'

export default class Validation {

  static install () {
    Vue.use(VeeValidate)
  }
}
