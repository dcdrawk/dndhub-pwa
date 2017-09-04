const Races = {
  // created: function () {
  //   console.log('mixin hook called')
  // },
  computed: {
    races () {
      return this.$store.state.gameData.races
    },
    subraces () {
      const race = this.character.race
      if (race) {
        for (let i in this.races) {
          if (race === this.races[i].name) {
            return this.races[i].subraces
          }
        }
      }
    }
  },

  methods: {
    getRace (name) {
      for (let i in this.races) {
        if (name === this.races[i].name) {
          return this.races[i]
        }
      }
    }
  }
}

export default Races
