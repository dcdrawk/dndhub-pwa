<template>
  <v-layout row wrap v-if="character" class="pa-3">
    <!-- Class Subheader -->
    <h3 class="subheader ma-0 pl-1 pa-0">
      Class
    </h3>

    <!-- Class -->
    <v-flex xs12>
      <custom-select
        ref="class"
        label="Class"
        :items="classes"
        item-text="name"
        item-value="name"
        :custom="character.custom.class"
        :value="character.class"
        @input="setClass($event)"
        @customize="character.customize('class', $event)"
      ></custom-select>
      <custom-select
        ref="archetype"
        :label="archetypeLabel || 'Archetype'"
        :items="archetypeOptions"
        item-text="title"
        item-value="title"
        :disabled="!character.class"
        :custom="character.custom.archetype || character.custom.class"
        :value="character.archetype"
        :show-action="!character.custom.class || !!character.class"
        @input="character.update('archetype', $event)"
        @customize="$emit('customize', 'archetype')"
      ></custom-select>
      <custom-select
        label="Hit Dice"
        :value="character.hitDice"
        :custom="character.custom.hitDice"
        @customize="customizeHitDice($event)"
        :items="dice"
        @input="character.update('hitDice', $event)"
      ></custom-select>
      <!-- <custom-input
        label="Hit Dice"
        :value="character.hitDice"
        :custom="character.custom.hitDice"
        @customize="character.customize('hitDice', $event)"
        @input="character.update('hitDice', $event)"
      ></custom-input> -->

      <v-checkbox
        class="pa-0"
        label="Enable Multiclass"
        :true-value="true"
        :false-value="false"
        :input-value="character.enableMulticlass"
        @click.native="character.toggleMulticlass(!character.enableMulticlass)"
      ></v-checkbox>
    </v-flex>

    <!-- Multiclass Subheader -->
    <h3
      v-if="character.enableMulticlass"
      class="subheader ma-0 pl-1 pa-0"
    >
      Multiclass
    </h3>

    <!-- Multiclass -->
    <v-flex xs12
      v-for="(item, index) in character.multiclass"
      :key="index"
    >
      <custom-select
        label="Class Name"
        :items="classes"
        item-text="name"
        item-value="name"
        :custom="item.custom.name"
        :value="item.name"
        @input="character.updateMulticlass(index, 'name', $event)"
        @customize="character.customizeMulticlass(index, 'name', $event)"
      ></custom-select>

      <v-text-field
        class="pb-0"
        label="Class Level"
        type="number"
        :max="20"
        :min="1"
        :value="item.level"
        @input="character.updateMulticlass(index, 'level', $event)"
        @customize="character.customizeMulticlass(index, 'level', $event)"
      ></v-text-field>

      <custom-select
        v-if="item.name"
        :label="getArchetypeLabel(item.name)"
        :items="getArchetypeOptions(item.name)"
        hint-text="test"
        item-text="title"
        item-value="title"
        :custom="item.custom.archetype"
        :value="item.archetype"
        @input="character.updateMulticlass(index, 'archetype', $event)"
        @customize="character.customizeMulticlass(index, 'archetype', $event)"
      ></custom-select>

      <div
        v-if="character.multiclass.length > 1"
        class="flexbox justify-end"
      >
        <v-btn icon
        @click="character.removeMulticlass(index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
    </v-flex>

    <v-btn
      v-if="character.enableMulticlass"
      flat
      @click="character.addMulticlass()"
    >
      Add Multiclass
    </v-btn>

  </v-layout>
</template>

<script>
import Classes from '../../../../mixins/Classes'
import CustomSelect from '../../../inputs/CustomSelect'
import CustomInput from '../../../inputs/CustomInput'

export default {

  // Name
  name: 'class-info',

  // Components
  components: {
    CustomSelect,
    CustomInput
  },

  // Mixins
  mixins: [Classes],

  // Props
  props: {},

  // Data
  data () {
    return {
      dice: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']
    }
  },

  // Computed
  computed: {
    computedProperty () {
      return 'something'
    },

    // features () {
    //   return this.$store.state.character.classFeatures
    // },

    character () {
      return this.$store.state.character
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    myFunction () {
      return 'something'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
