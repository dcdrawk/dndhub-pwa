export default {
  // Computed
  computed: {
    classes () {
      return this.$store.state.gameData.classes
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
    }
  }
}
