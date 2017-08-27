<template>
  <v-card>

  <!-- <div v-if="character"> -->
    <v-card-text>

      <general-fields
        :character="character"
      ></general-fields>

    </v-card-text>
  </v-card>
  <!-- </div> -->
</template>

<script>
/**
 * <component></component>
 * Component
 * @desc description
 */
import GeneralFields from '../characters/GeneralFields'
export default {
  // Name
  name: 'general',

  // Components
  components: {
    GeneralFields
  },

  // Props
  props: {},

  // Data
  data () {
    return {
      msg: 'Hello World'
    }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    }
  },

  // Watch
  watch: {},

  // Methods
  methods: {},

  // Created
  created () {},

  // Mounted
  mounted () {}
}
</script>

<style scoped lang="scss">
</style>
