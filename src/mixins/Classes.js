export default {
  // Computed
  computed: {
    classes () {
      return this.$store.state.gameData.classes
    },
    classFeatures () {
      return this.$store.state.gameData.classFeatures
    },
    archetypes () {
      const className = this.character.class
      if (!className) return
      for (let i in this.classes) {
        if (className === this.classes[i].name) {
          return this.classes[i].archetypes
        }
      }
    },
    archetypeOptions () {
      if (!this.archetypes) return
      // if (this.character.level < this.archetypes.level) return
      return this.archetypes.options
    },
    archetypeLabel () {
      if (!this.archetypes) return
      // if (this.character.level < this.archetypes.level) return
      return this.archetypes.name
    }
  },

  // Methods
  methods: {
    getArchetypes (className) {
      if (!className) return
      for (let i in this.classes) {
        if (className === this.classes[i].name) {
          return this.classes[i].archetypes
        }
      }
    },

    getArchetypeOptions (className, level) {
      const archetypes = this.getArchetypes(className)
      if (!archetypes) return
      return archetypes.options
    },

    getArchetypeLabel (className) {
      const archetypes = this.getArchetypes(className)
      if (!archetypes) return
      return archetypes.name
    },

    getClass (className) {
      for (let classObj of this.classes) {
        if (classObj.name === className) return classObj
      }
    },

    getFeatures (className) {
      for (let features of this.classFeatures) {
        if (features.class === className) return features.abilities
      }
    },

    /**
     * Set Class
     * @desc Sets a character's class, and related fields
     * @param {String} className
     */
    setClass (className) {
      const classObj = this.getClass(className)
      if (!classObj) {
        this.character.update('class', className)
        return
      }
      // if (!classObj) return
      // if (typeof classObj === 'string') {
      //   this.character.update('class', classObj)
      //   return
      // }
      const features = this.getFeatures(classObj.name)
      this.character.updateMultiple([{
        field: 'class',
        value: classObj.name
      }, {
        field: 'archetype',
        value: ''
      }, {
        field: 'specialization',
        value: ''
      }, {
        field: 'proficiencies',
        value: classObj.proficiencies
      }, {
        field: 'hitDice',
        value: classObj.hitDice
      }, {
        field: 'classFeatures',
        value: features
      }])
    },

    customizeHitDice (value) {
      this.$nextTick(() => {
        this.character.customize('hitDice', value)
        const classObj = this.getClass(this.character.class)
        this.character.update(
          'hitDice',
          classObj ? classObj.hitDice : 'd8'
        )
      })
    }
  }
}
