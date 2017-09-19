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

    setFeatures (newClass, oldClass) {
      const features = {...this.character.classFeatures || {}}
      // const features = {}
      if (oldClass && features[oldClass]) {
        delete features[oldClass]
      }
      features[newClass] = this.getFeatures(newClass) || []
      this.character.update('classFeatures', features)
    },

    /**
     * Set Class
     * @desc Sets a character's class, and related fields
     * @param {String} className
     */
    setClass (className) {
      if (classObj.name === this.character.class) return

      const classObj = this.getClass(className)
      this.setFeatures(classObj.name, this.character.class)
      if (!classObj) {
        this.character.update('class', className)
        return
      }

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
      }])
    },

    setArchetype (archetype) {
      this.setFeatures(archetype)
      this.character.update('archetype', archetype)
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
