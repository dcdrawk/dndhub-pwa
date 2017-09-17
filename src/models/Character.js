import Vue from 'vue'
import Store from '../../../store'
import Firebase from 'firebase'
// import Debounce from 'lodash.debounce'
/**
 * Character
 */
export default class Character {
  /**
   * Creates a character
   */
  constructor (options = {}) {
    Object.assign(this, {...options})
    // this.update = Debounce(this.update, 250)
    // this.abilityScores = options.abilityScores || abilityScoreTemplate
    this.custom = options.custom || {}
    this.uid = Store.state.uid
    this.cid = Store.state.characterId
    if (options) this.savable = true
  }

  /**
   * Update
   * @desc Updates a character field
   * @param {String} field
   * @param {Any} value
   */
  update (field, value) {
    Vue.set(this, field, value)
    if (!this.savable) return
    // const uid = Store.state.uid
    // const cid = Store.state.characterId
  }

  // /**
  //  * Update / Save Multiple Fields at once
  //  * @param {Array} fields
  //  */
  // updateMultiple (fields) {
  //   const uid = Store.state.uid
  //   const cid = Store.state.characterId
  //   fields.forEach(item => {
  //     Vue.set(this, item.field, item.value)
  //     const update = {}
  //     update[item.field] = item.value
  //     Firebase.database().ref(`characters/${uid}/${cid}`)
  //       .update(update)
  //   })
  // }

  // /**
  //  * Save
  //  * @desc Updates a character field
  //  * @param {String} field
  //  * @param {Any} value
  //  */
  // save (field, value) {
  //   const uid = Store.state.uid
  //   const cid = Store.state.characterId
  //   const update = {}
  //   update[field] = value
  //   Vue.set(this, field, value)
  //   Firebase.database().ref(`characters/${uid}/${cid}`)
  //     .update(update)
  // }
}
