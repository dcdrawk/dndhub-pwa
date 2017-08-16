<template>
  <v-layout row wrap>
    <!-- General Info Subheader -->
    <h3 class="subheader ma-0 pl-1 pa-0">
      General Info
    </h3>
    <!-- Character Name -->
    <v-flex xs12>
      <v-text-field
        class="pb-0"
        name="character_name"
        label="Character Name"
        v-validate="'required'"
        :error-messages="getError('character_name')"
        :value="name"
        @input="$emit('update', {field: 'name', value: $event})"
      ></v-text-field>
    </v-flex>

    <!-- Level -->
    <v-flex xs6>
      <v-text-field
        class="pb-0"
        name="level"
        label="Level"
        type="number"
        :max="20"
        v-validate="'required'"
        :error-messages="getError('level')"
        :value="level"
        @input="$emit('update', {field: 'level', value: $event})"
      ></v-text-field>
    </v-flex>

    <!-- Experience -->
    <v-flex xs6>
      <v-text-field
        class="pb-0"
        name="experience"
        label="Experience"
        type="number"
        :value="experience"
        @input="$emit('update', {field: 'experience', value: $event})"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
/**
 * <general-fields></general-fields>
 * @desc contains all the general-info fields
 */
import Validation from '../../../mixins/Validation'

export default {
  // Name
  name: 'general-fields',

  // Mixins
  mixins: [Validation],

  // Components
  components: {},

  // Props
  props: {
    name: String,
    level: Number,
    experience: Number
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
