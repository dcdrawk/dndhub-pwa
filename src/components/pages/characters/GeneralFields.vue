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
        :value="character.name"
        @input="character.update('name', $event)"
      ></v-text-field>
        <!-- @input="$emit('update', {field: 'name', value: $event})" -->
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
        :value="+character.level"
        @input="character.update('level', $event)"
      ></v-text-field>
    </v-flex>

    <!-- Experience -->
    <v-flex xs6>
      <v-text-field
        class="pb-0"
        name="experience"
        label="Experience"
        type="number"
        :value="+character.experience"
        @input="character.update('experience', $event)"
      ></v-text-field>
    </v-flex>

    <v-flex xs12>
      <custom-select
        label="Background"
        :items="backgrounds"
        item-value="name"
        item-text="name"
        :custom="character.custom.background"
        :value="character.background"
        @input="character.update('background', $event)"
        @customize="character.customize('background')"
      ></custom-select>

      <custom-select
        label="Alignments"
        :items="alignments"
        item-value="name"
        item-text="name"
        :custom="character.custom.alignment"
        :value="character.alignment"
        @input="character.update('alignment', $event)"
        @customize="character.customize('alignment')"
      ></custom-select>
    </v-flex>
  </v-layout>
</template>

<script>
/**
 * <general-fields></general-fields>
 * @desc contains all the general-info fields
 */
import Validation from '../../../mixins/Validation'
import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'general-fields',

  // Mixins
  mixins: [Validation],

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
    alignments () {
      return this.$store.state.gameData.alignments
    },
    backgrounds () {
      return this.$store.state.gameData.backgrounds
    }
  }
}
</script>

<style scoped lang="scss">
</style>
