<template>
  <!-- Race -->
  <v-flex xs12>
    <custom-select
      ref="race"
      label="Race"
      :items="races"
      item-text="name"
      item-value="name"
      :custom="character.custom.race"
      v-model="character.race"
      @customize="customize('race')"
    ></custom-select>
  </v-flex>

  <!-- Subrace -->
  <v-flex xs12>
    <custom-select
      ref="subrace"
      label="Subrace"
      :items="subraces"
      item-text="name"
      item-value="name"
      :disabled="!character.race"
      :custom="character.custom.subrace"
      v-model="character.subrace"
      @customize="customize('subrace')"
    ></custom-select>
  </v-flex>
</template>

<script>
/**
 * <component></component>
 * Component
 * @desc description
 */
export default {
  // Name
  name: 'component',

  // Components
  components: {},

  // Props
  props: {
    character: Object
  },

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
  mounted () {}
}
</script>

<style scoped lang="scss">
</style>
