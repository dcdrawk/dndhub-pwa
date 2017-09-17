<template>
  <div>Component

    {{ character.classFeatures }}
  </div>
</template>

<script>
export default {

  // Name
  name: 'component',

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {}
  },

  // Computed
  computed: {
    computedProperty () {
      return 'something'
    },

    // features () {
    //   return this.$store.state.character.classFeatures
    // },

    character () {
      return this.$store.state.character
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    myFunction () {
      return 'something'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
