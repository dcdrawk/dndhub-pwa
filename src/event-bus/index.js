import Vue from 'vue'
// import Firebase from 'firebase'
// import VueFire from 'vuefire'

export default class FirebaseSetup {

  static install () {
    const bus = new Vue()
    Object.defineProperty(Vue.prototype, '$bus', {
      get () {
        return bus
      }
    })
  }
}
