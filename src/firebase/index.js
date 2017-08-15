import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'

export default class FirebaseSetup {
  static firebaseConfig = {
    apiKey: 'AIzaSyDqHKWWOtFJx2flGqp04NwLTVUpMJFD_KQ',
    authDomain: 'dndhub-7c47f.firebaseapp.com',
    databaseURL: 'https://dndhub-7c47f.firebaseio.com',
    storageBucket: 'dndhub-7c47f.appspot.com',
    messagingSenderId: '134165505386'
  }

  static install () {
    Vue.use(VueFire)
    const firebaseApp = Firebase.initializeApp(this.firebaseConfig)
    const db = firebaseApp.database()

    Object.defineProperty(Vue.prototype, '$firebase', {
      get () {
        return firebaseApp
      }
    })

    Object.defineProperty(Vue.prototype, '$db', {
      get () {
        return db
      }
    })
  }
}
