<template></template>

<script>
/**
 * <firebase></firebase>
 * @desc handle global firebase events
 */
export default {
  // Name
  name: 'firebase',

  // Mounted
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      this.$store.commit('update_user', user)
    })
  }
}
</script>

<style scoped lang="scss">
</style>
