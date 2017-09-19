<template>
  <div>
    <v-tabs dark v-model="active" class="elevation-1">
      <v-tabs-bar class="blue">
        <v-tabs-item
          v-for="(tab, index) in tabs"
          :key="index"
          ripple
          :href="'#' + tab.component"
        >
          {{ tab.text }}
        </v-tabs-item>
        <v-tabs-slider class="white"></v-tabs-slider>
      </v-tabs-bar>
      <!-- test -->
      <v-tabs-items>
        <!-- test -->
        <v-tabs-content
          v-for="(tab, index) in tabs"
          :key="index"
          :id="tab.component"
        >
          <component :is="tab.component"></component>
          <!-- <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card> -->
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    <!-- {{ active }} -->
    <!-- <div class="text-xs-center mt-3">
      <v-btn @click.native="next">next tab</v-btn>
    </div> -->
  </div>
</template>

<script>
/**
 * <race-fields></race-fields>
 * @desc contains race fields
 */
import Races from '../../../mixins/Races'
import CustomSelect from '../../inputs/CustomSelect'
import ClassFeatures from './class/ClassFeatures'
import ClassHitpoints from './class/ClassHitpoints'
import ClassProficiencies from './class/ClassProficiencies'
import ClassInfo from './class/ClassInfo'

export default {
  // Name
  name: 'race-details',

  // Components
  components: {
    CustomSelect,
    ClassFeatures,
    ClassHitpoints,
    ClassProficiencies,
    ClassInfo
  },

  mixins: [Races],

  // Props
  props: {
    // character: Object
  },

  data () {
    return {
      // tabs: ['Class Features', 'Proficiencies', 'Hit Points'],
      tabs: [{
        text: 'Class Info',
        component: 'class-info'
      }, {
        text: 'Features',
        component: 'class-features'
      }, {
        text: 'Proficiencies',
        component: 'class-proficiencies'
      }, {
        text: 'Hit Points',
        component: 'class-hitpoints'
      }],
      active: 'class-info',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
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
  },

  methods: {
    next () {
      // console.log('next')
      // const test = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length].component
      // console.log(test)
      // this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length].component
    }
  }
}
</script>

<style scoped lang="scss">
</style>
