<template></template>

<script>
/**
 * <characters></characters>
 * @desc user's list of characters
 */
export default {
  // Name
  name: 'characters',

  // Data
  data () {
    return {
      init: false
    }
  },

  // Computed
  computed: {
    user () { return this.$store.state.user },
    characters () { return this.$store.state.characters },
    characterId () { return this.$store.state.characterId }
  },

  // Watch
  watch: {
    user (newValue, oldValue) {
      this.getCharacters()
    }
  },

  // Methods
  methods: {
    /**
     * Get Characters
     * @desc get the user's list of characters
     */
    getCharacters () {
      if (!this.user) return
      this.$db.ref(`characters/${this.user.uid}`).on('value', (snapshot) => {
        this.$store.commit('update_characters', snapshot.val())
        if (this.characterId && !this.init) {
          this.init = true
          this.selectCharacter(this.characterId)
        }
      })
    },

    /**
     * Select Character
     */
    selectCharacter (id) {
      this.$store.commit('select_character', id)
    }
  },

  // Mounted
  mounted () {
    this.getCharacters()
  }

}
</script>

<style scoped lang="scss"></style>
