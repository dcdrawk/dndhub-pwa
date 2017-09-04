import Vue from 'vue'
import Store from '../../../store'
import Firebase from 'firebase'
import Debounce from 'lodash.debounce'
/**
 * Character
 */
export default class Character {
  /**
   * Creates a character
   */
  constructor (options = {}) {
    console.log('test', options)
    Object.assign(this, {...options})
    // this.name = options.name || undefined
    // this.level = options.level || 1
    // this.experience = options.experience || 0
    // this.background = options.background || undefined
    // this.alignment = options.alignment || undefined
    // this.race = options.race || undefined
    // this.subrace = options.subrace || undefined
    // this.class = options.class || undefined
    // this.archetype = options.archetype || undefined
    // this.enableMulticlass = options.enableMulticlass || false
    // this.multiclass = options.multiclass || []
    // this.weapons = options.weapons || []
    // this.armor = options.armor || []
    // this.spells = options.spells || []
    // this.inventory = options.inventory || []
    this.save = Debounce(this.save, 500)
    this.abilityScores = options.abilityScores || abilityScoreTemplate
    this.custom = options.custom || {}
    if (options) this.savable = true
  }

  /**
   * Update
   * @desc Updates a character field
   * @param {String} field
   * @param {Any} value
   */
  update (field, value) {
    console.log('update', this)
    Vue.set(this, field, value)
    if (this.savable) this.save(field, value)
  }

  /**
   * Save
   * @desc Updates a character field
   * @param {String} field
   * @param {Any} value
   */
  save (field, value) {
    console.log('save')
    const uid = Store.state.uid
    const cid = Store.state.characterId
    const update = {}
    update[field] = value
    console.log(update)
    console.log(`characters/${uid}/${cid}`)
    Firebase.database().ref(`characters/${uid}/${cid}`)
      .update(update)
  }

  /**
   * Set Race
   * @desc Sets a character's race
   * @param {String} field
   * @param {Any} value
   */
  setRace (race) {
    // console.log()
    this.update('race', race.name)
    Vue.set(this, 'abilityScoreIncrease', race.abilityScoreIncrease)
    Vue.set(this, 'speed', race.speed)
    Vue.set(this, 'languages', race.languages)
    Vue.set(this, 'traits', race.traits)
  }

  /**
   * Customize
   * @desc Sets a 'custom' field, uses Vue to make custom field reactive
   * @param {String} field
   */
  customize (field) {
    this[field] = undefined
    const value = !this.custom[field]
    Vue.set(this.custom, field, value)
  }

  /**
   * Toggle Multiclass
   * @desc if multiclass is empty, push a template object
   * @param {Boolean} event
   */
  toggleMulticlass (event) {
    this.enableMulticlass = event
    if (event) {
      if (this.multiclass.length === 0) {
        this.multiclass.push({...multiclassTemplate})
      }
    } else {
      this.multiclass = []
    }
  }

  /**
   * Add Multiclass
   * @desc push a multiclassTemplate to the multiclass array
   */
  addMulticlass () {
    this.multiclass.push({...multiclassTemplate})
  }

  /**
   * Remove Multiclass
   * @param {Number} index
   */
  removeMulticlass (index) {
    this.multiclass.splice(index, 1)
  }

  /**
   * Update Multiclass
   * @desc push a multiclassTemplate to the multiclass array
   */
  updateMulticlass (index, field, value) {
    this.multiclass[index][field] = value
  }

  /**
   * Customize Multiclass
   * @desc push a multiclassTemplate to the multiclass array
   */
  getProficiencyBonus () {
    const defaultBonus = Math.floor((+this.level + 7) / 4)
    if (!this.custom) return defaultBonus
    return this.custom.profiencyBonus
      ? this.profiencyBonus
      : defaultBonus
  }
}

const multiclassTemplate = {
  name: undefined,
  level: 1,
  archetype: undefined,
  specialization: undefined,
  custom: {
    name: false,
    archetype: false,
    specialization: false
  }
}

const abilityScoreTemplate = {
  Strength: { base: 10, bonus: 0 },
  Dexterity: { base: 10, bonus: 0 },
  Constitution: { base: 10, bonus: 0 },
  Intelligence: { base: 10, bonus: 0 },
  Wisdom: { base: 10, bonus: 0 },
  Charisma: { base: 10, bonus: 0 }
}
