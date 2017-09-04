<template>
  <v-layout row wrap v-if="character">

    <!-- <h3 class="subheader ma-0 pl-1 pa-0">
      Race Traits
    </h3> -->
    <!-- Subrace -->
    <!-- {{ character.traits || 'dsadad' }} -->
    <v-flex xs12>
      <v-list two-line>
        <v-list-tile
          v-for="(item, index) in character.traits"
          :key="index"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

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

  // Computed
  computed: {
    character () {
      return this.$store.state.character
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
