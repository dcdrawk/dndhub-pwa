import Vue from 'vue'
/**
 * Character
 */
export default class Character {
  /**
   * Creates a character
   */
  constructor (options = {}) {
    this.name = options.name || undefined
    this.level = options.level || 1
    this.experience = options.experience || 0
    this.background = options.background || undefined
    this.alignment = options.alignment || undefined
    this.race = options.race || undefined
    this.subrace = options.subrace || undefined
    this.class = options.class || undefined
    this.archetype = options.archetype || undefined
    this.enableMulticlass = options.enableMulticlass || false
    this.multiclass = options.multiclass || []
    this.weapons = options.weapons || []
    this.armor = options.armor || []
    this.spells = options.spells || []
    this.inventory = options.inventory || []
    this.custom = options.custom || {}
  }

  /**
   * Update
   * @desc Updates a character field
   * @param {String} field
   * @param {Any} value
   */
  update (field, value) {
    this[field] = value
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
  customizeMulticlass (index, field, value) {
    this.multiclass[index].customize = value
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
