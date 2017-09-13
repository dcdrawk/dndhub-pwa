<template>
  <v-layout row wrap v-if="character">

    <!-- Subheader -->
    <!-- <h3 class="title mt-2 pl-1">
      Race Details
    </h3> -->
    <!-- {{ race }}test -->
    <!-- Race -->
    <v-flex xs12>
      <custom-select
        label="Race"
        :items="races"
        item-text="name"
        item-value="name"
        :custom="character.custom.race"
        :value="character.race"
        @input="character.setRace(getRace($event))"
        @customize="character.customize('race')"
      ></custom-select>

      <custom-select
        label="Subrace"
        :items="subraces"
        item-text="name"
        item-value="name"
        :custom="character.custom.subrace"
        :value="character.subrace"
        @input="character.setSubrace(getRace(character.race), getSubrace($event))"
        @customize="character.customize('subrace')"
      ></custom-select>

      <custom-input
        label="Ability Score Increase"
        :custom="character.custom.abilityScoreIncrease"
        :value="character.abilityScoreIncrease"
        @input="character.update('abilityScoreIncrease', $event);"
        @customize="character.customize('abilityScoreIncrease');"
      ></custom-input>

      <custom-input
        label="Speed"
        :custom="character.custom.speed"
        :value="character.speed"
        @input="character.update('speed', $event);"
        @customize="character.customize('speed');"
      ></custom-input>
      <!-- <v-text-field
        class="pb-0"
        label="Ability Score Increase"
        :value="character.abilityScoreIncrease"
      ></v-text-field> -->
      <!-- <v-text-field
        class="pb-0"
        label="Speed"
        :value="character.speed"
        @input="character.update('speed', $event)"
      ></v-text-field>
      <v-text-field
        class="pb-0"
        label="Languages"
        :value="character.languages"
      ></v-text-field> -->
    </v-flex>
  </v-layout>
</template>

<script>
/**
 * <race-fields></race-fields>
 * @desc contains race fields
 */
import Races from '../../../mixins/Races'
import CustomSelect from '../../inputs/CustomSelect'
import CustomInput from '../../inputs/CustomInput'

export default {
  // Name
  name: 'race-details',

  // Components
  components: {
    CustomSelect,
    CustomInput
  },

  mixins: [Races],

  // Props
  props: {
    // character: Object
  },

  data () {
    return {
      active: null
    }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    },
    race () {
      const races = this.$store.state.gameData.races
      // return races
      for (let i in races) {
        if (races[i].name === this.character.race) {
          return races[i]
        }
      }
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
    // races () {
    //   return this.$store.state.gameData.races
    // },
    // subraces () {
    //   const race = this.character.race
    //   if (race) {
    //     for (let i in this.races) {
    //       if (race === this.races[i].name) {
    //         return this.races[i].subraces
    //       }
    //     }
    //   }
    // },
    // traits () {
    //   if (!this.character) return
    //   for (let i in this.races) {
    //     if (this.character.race === this.races[i].name) {
    //       return this.races[i].traits
    //     }
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
</style>
