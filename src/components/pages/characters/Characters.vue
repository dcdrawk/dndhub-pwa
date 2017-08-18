<template></template>

<script>
/**
 * <characters></characters>
 * @desc user's list of characters
 */
export default {
  // Name
  name: 'characters',

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
      })
    },

    /**
     * Select Character
     * @desc Stop editing
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
