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
    this.multiclass = options.multiclass || []
    // this.weapons = options.weapons || []
    // this.armor = options.armor || []
    // this.spells = options.spells || []
    // this.inventory = options.inventory || []
    // this.save = Debounce(this.save, 250)
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
    Vue.set(this, field, value)
    if (this.savable) this.save(field, value)
  }

  /**
   * Update / Save Multiple Fields at once
   * @param {Array} fields
   */
  updateMultiple (fields) {
    const uid = Store.state.uid
    const cid = Store.state.characterId
    console.log('update multiple...')
    fields.forEach(item => {
      Vue.set(this, item.field, item.value)
      const update = {}
      update[item.field] = item.value
      Firebase.database().ref(`characters/${uid}/${cid}`)
        .update(update)
    })
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
   * @desc Sets a character's race, and related fields
   * @param {String} field
   * @param {Any} value
   */
  setRace (race) {
    this.updateMultiple([{
      field: 'race',
      value: race.name
    }, {
      field: 'subrace',
      value: ''
    }, {
      field: 'abilityScoreIncrease',
      value: race.abilityScoreIncrease || ''
    }, {
      field: 'speed',
      value: race.speed || ''
    }, {
      field: 'languages',
      value: race.languages || ''
    }, {
      field: 'traits',
      value: race.traits || ''
    }])
  }

  /**
   * Set Subrace
   * @desc Sets a character's subrace, and related fields
   * @param {String} field
   * @param {Any} value
   */
  setSubrace (race, subrace) {
    if (!subrace || !race) return
    if (subrace.abilityScoreIncrease) {
      this.updateMultiple([{
        field: 'abilityScoreIncrease',
        value: `${race.abilityScoreIncrease}, ${subrace.abilityScoreIncrease}`
      }, {
        field: 'subrace',
        value: subrace.name
      }])
    } else {
      this.update('subrace', subrace.name)
    }
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
    // this.enableMulticlass = event
    console.log('multiclass!', event)
    if (event) {
      // this.multiclass = []
      this.update('multiclass', [])
      if (this.multiclass.length === 0) {
        console.log('multiclass 2!', event)
        console.log(this.multiclass)
        this.multiclass.push({...multiclassTemplate})
        this.save('multiclass', this.multiclass)
        // this.multiclass.push({...multiclassTemplate})
      }
    } else {
      this.multiclass = []
      this.save('multiclass', this.multiclass)
    }
    this.update('enableMulticlass', event)
  }

  /**
   * Add Multiclass
   * @desc push a multiclassTemplate to the multiclass array
   */
  addMulticlass () {
    // this.multiclass.push({...multiclassTemplate})
    this.multiclass.push({...multiclassTemplate})
    this.save('multiclass', this.multiclass)
  }

  /**
   * Remove Multiclass
   * @param {Number} index
   */
  removeMulticlass (index) {
    this.multiclass.splice(index, 1)
    this.save('multiclass', this.multiclass)
  }

  /**
   * Update Multiclass
   * @desc push a multiclassTemplate to the multiclass array
   */
  updateMulticlass (index, field, value) {
    if (value === this.multiclass[index][field]) return
    this.multiclass[index][field] = value
    if (field === 'name') {
      this.multiclass[index].archetype = ''
    }
    this.update('multiclass', this.multiclass)
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
  name: '',
  level: 1,
  archetype: '',
  specialization: '',
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
