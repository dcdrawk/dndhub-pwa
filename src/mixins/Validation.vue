<template>
</template>

<script>
/**
 * <get-error></get-error>
 * @desc mixin for returning validation errors
 */
export default {
  // Name
  name: 'get-error',

  // Methods
  methods: {
    async validate () {
      try {
        const valid = await this.$validator.validate()
        if (!valid) { throw this.errors.all() }
        return true
      } catch (error) {
        // console.warn(error)
        throw error
      }
    },

    getError (field) {
      const error = this.errors.first(field)
      return error ? [error] : undefined
    }
  }
}
</script>

<style scoped lang="scss">
</style>
