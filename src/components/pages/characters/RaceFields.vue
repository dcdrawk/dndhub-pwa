<template>
  <v-layout row wrap>
    <!-- Subheader -->
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
        :custom="character.custom.race"
        :value="character.race"
        @input="character.update('race', $event)"
        @customize="character.customize('race')"
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
        :value="character.subrace"
        @input="character.update('subrace', $event)"
        @customize="character.customize('subrace')"
      ></custom-select>
    </v-flex>
  </v-layout>
</template>

<script>
/**
 * <race-fields></race-fields>
 * @desc contains race fields
 */
import CustomSelect from '../../inputs/CustomSelect'
export default {
  // Name
  name: 'race-fields',

  // Components
  components: {
    CustomSelect
  },

  // Props
  props: {
    character: Object
  },

  // Computed
  computed: {
    races () {
      return this.$store.state.gameData.races
    },
    subraces () {
      const race = this.character.race
      if (race) {
        for (let i in this.races) {
          if (race === this.races[i].name) {
            return this.races[i].subraces
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
