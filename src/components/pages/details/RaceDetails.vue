<template>
  <v-layout row wrap v-if="character">

    <!-- Subheader -->
    <!-- <h3 class="title mt-2 pl-1">
      Race Details
    </h3> -->

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
        @input="character.setRace(getRace($event))"
        @customize="character.customize('race')"
      ></custom-select>

      <custom-select
        ref="race"
        label="Subrace"
        :items="subraces"
        item-text="name"
        item-value="name"
        :custom="character.custom.subrace"
        :value="character.subrace"
        @input="character.update('subrace', $event)"
        @customize="character.customize('subrace')"
      ></custom-select>

      <v-text-field
        class="pb-0"
        label="Ability Score Increase"
        :value="character.abilityScoreIncrease"
      ></v-text-field>
      <v-text-field
        class="pb-0"
        label="Speed"
        :value="character.speed"
        @input="character.update('speed', $event)"
      ></v-text-field>
      <v-text-field
        class="pb-0"
        label="Languages"
        :value="character.languages"
      ></v-text-field>
    </v-flex>


    <!-- Subrace -->
    <v-flex xs12>
      <!-- <v-expansion-panel expand>
        <v-expansion-panel-content
          v-for="(item, index) in character.traits"
          :key="index"
        >
          <div slot="header">{{item.title}}</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              {{ item.description }}
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel> -->
      <!-- <custom-select
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
      ></custom-select> -->
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
export default {
  // Name
  name: 'race-details',

  // Components
  components: {
    CustomSelect
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
