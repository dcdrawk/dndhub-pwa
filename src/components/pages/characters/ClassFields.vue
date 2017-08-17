<template>
  <v-layout row wrap>
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
        @input="character.update('class', $event)"
        @customize="$emit('customize', 'class')"
      ></custom-select>

      <custom-select
        v-if="archetypeOptions"
        ref="archetype"
        :label="archetypeLabel"
        :items="archetypeOptions"
        item-text="title"
        item-value="title"
        :custom="character.custom.archetype"
        :value="character.archetype"
        @input="character.update('archetype', $event)"
        @customize="$emit('customize', 'archetype')"
      ></custom-select>

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
        :value="item.level"
        @input="character.updateMulticlass(index, 'level', $event)"
        @customize="character.customizeMulticlass(index, 'level', $event)"
      ></v-text-field>
        <!-- v-model="item.level" -->

      <custom-select
        v-if="getArchetypeOptions(item.name)"
        label="Archetype"
        :items="getArchetypeOptions(item.name)"
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
/**
 * <class-fields></class-fields>
 * @desc contains class / multiclass fields
 */
import CustomSelect from '../../inputs/CustomSelect'
export default {
  // Name
  name: 'class-fields',

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
    classes () {
      return this.$store.state.gameData.classes
    },
    archetypes () {
      const className = this.character.class
      if (!className) return
      for (let i in this.classes) {
        if (className === this.classes[i].name) {
          return this.classes[i].archetypes
        }
      }
    },
    archetypeOptions () {
      if (!this.archetypes) return
      if (this.character.level < this.archetypes.level) return
      return this.archetypes.options
    },
    archetypeLabel () {
      if (!this.archetypes) return
      if (this.character.level < this.archetypes.level) return
      return this.archetypes.name
    }
  },

  // Methods
  methods: {
    getArchetypes (className) {
      if (!className) return
      for (let i in this.classes) {
        if (className === this.classes[i].name) {
          return this.classes[i].archetypes
        }
      }
    },

    getArchetypeOptions (className) {
      const archetypes = this.getArchetypes(className)
      if (!archetypes) return
      if (this.character.level < archetypes.level) return
      return archetypes.options
    },

    getArchetypeLabel (className) {
      const archetypes = this.getArchetypes(className)
      if (!archetypes) return
      if (this.character.level < archetypes.level) return
      return archetypes.name
    }
  }
}
</script>

<style scoped lang="scss">
</style>
