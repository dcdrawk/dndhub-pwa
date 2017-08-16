<template>
  <v-layout row wrap>
    <h3 class="subheader ma-0 pl-1 pa-0">
      Race
    </h3>

    <!-- Race -->
    <v-flex xs12>
      <custom-select
        ref="race"
        label="Race"
        :items="races"
        item-text="name"
        item-value="name"
        :custom="customRace"
        :value="race"
        @input="$emit('update', {field: 'race', value: $event})"
        @customize="$emit('customize', 'race')"
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
        :disabled="!race"
        :custom="customSubrace"
        :value="subrace"
        @input="$emit('update', {field: 'subrace', value: $event})"
        @customize="$emit('customize', 'subrace')"
      ></custom-select>
    </v-flex>
  </v-layout>
</template>

<script>
/**
 * <component></component>
 * Component
 * @desc description
 */
import CustomSelect from '../../inputs/CustomSelect'
export default {
  // Name
  name: 'component',

  // Components
  components: {
    CustomSelect
  },

  // Props
  props: {
    race: String,
    subrace: String,
    customRace: Boolean,
    customSubrace: Boolean
  },

  // Data
  data () {
    return {
      msg: 'Hello World'
    }
  },

  // Computed
  computed: {
    races () {
      return this.$store.state.gameData.races
    },
    subraces () {
      const race = this.race
      if (race) {
        for (let i in this.races) {
          if (race === this.races[i].name) {
            return this.races[i].subraces
          }
        }
      }
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
