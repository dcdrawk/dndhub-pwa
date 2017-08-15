<template></template>

<script>
/**
 * <firebase></firebase>
 * @desc handle global firebase events
 */
export default {
  // Name
  name: 'firebase',

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {
      msg: 'Hello World'
    }
  },

  // Computed
  computed: {},

  // Watch
  watch: {},

  // Methods
  methods: {},

  // Created
  created () {},

  // Mounted
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(`Signed in as ${user.email}.`)
      } else {
        console.log('No User.')
      }
    })
  }
}
</script>

<style scoped lang="scss">
</style>
