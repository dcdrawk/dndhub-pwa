<template>
  <v-card>

  <!-- <div v-if="character"> -->
    <v-card-text>

      <!-- <race-fields
        :character="character"
      ></race-fields> -->

      <race-details
      ></race-details>
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
import RaceFields from '../characters/RaceFields'
import RaceDetails from './RaceDetails'
export default {
  // Name
  name: 'general',

  // Components
  components: {
    RaceFields,
    RaceDetails
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
    },

    race () {
      // const races = this.$store.state.gameData.races
      // for (let i in races) {

      // }
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
