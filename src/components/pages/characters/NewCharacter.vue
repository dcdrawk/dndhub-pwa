<template>
  <!-- Card -->
  <v-card>
    <!-- Card Text -->
    <v-card-text>
      <!-- General Fields -->
      <general-fields
        :character="character"
      ></general-fields>

      <!-- Race Fields -->
      <race-fields
        :character="character"
      ></race-fields>

      <!-- Class Fields -->
      <class-fields
        :character="character"
      ></class-fields>
    </v-card-text>

    <!-- Card Actions -->
    <v-card-actions>
      <v-btn
        class="primary"
        @click="create()"
        :loading="loading"
      >
        Create
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
/**
 * <new-character></new-character>
 * @desc User creates a new character
 */
import Character from './Character'
import Validation from '../../../mixins/Validation'
import CustomSelect from '../../inputs/CustomSelect'
import GeneralFields from './GeneralFields'
import RaceFields from './RaceFields'
import ClassFields from './ClassFields'
export default {
  // Name
  name: 'new-character',

  // Mixins
  mixins: [Validation],

  // Components
  components: {
    CustomSelect,
    GeneralFields,
    RaceFields,
    ClassFields
  },

  // Data
  data () {
    return {
      character: new Character(),
      loading: false
    }
  },

  computed: {
    user () {
      return this.$store.state.user
    }
  },

  methods: {
    async create () {
      try {
        const character = await this.$db.ref(`characters/${this.user.uid}`).push(this.character)
        console.log(character)
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
