<template>
  <div>Component

    <!-- {{ character.classFeatures }} -->
  </div>
</template>

<script>
import CustomSelect from '../../../inputs/CustomSelect'

export default {

  // Name
  name: 'component',

  // Components
  components: {
    CustomSelect
  },

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
