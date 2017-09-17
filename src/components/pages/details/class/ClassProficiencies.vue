<template>
  <div>Component</div>
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
