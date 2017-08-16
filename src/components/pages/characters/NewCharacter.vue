<template>
  <!-- Card -->
  <v-card>
    <!-- Card Text -->
    <v-card-text>
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
            v-model="character.name"
            v-validate="'required'"
            :error-messages="getError('character_name')"
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
            v-model="character.level"
            v-validate="'required'"
            :error-messages="getError('level')"
          ></v-text-field>
        </v-flex>

        <!-- Experience -->
        <v-flex xs6>
          <v-text-field
            class="pb-0"
            name="experience"
            label="Experience"
            type="number"
            v-model="character.experience"
          ></v-text-field>
        </v-flex>

        <!-- Race Subheader -->
        <h3 class="subheader ma-0 pl-1 pa-0">
          Race
        </h3>

        <!-- Race -->
        <v-flex xs12>
          <custom-select
            ref="race"
            label="Race"
            :items="races"
            item-text="name"
            item-value="name"
            :custom="character.custom.race"
            v-model="character.race"
            @customize="customize('race')"
          ></custom-select>
        </v-flex>

        <!-- Subrace -->
        <v-flex xs12>
          <custom-select
            ref="subrace"
            label="Subrace"
            :items="subraces"
            item-text="name"
            item-value="name"
            :disabled="!character.race"
            :custom="character.custom.subrace"
            v-model="character.subrace"
            @customize="customize('subrace')"
          ></custom-select>
        </v-flex>

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
            v-model="character.class"
            @customize="customize('class')"
          ></custom-select>

          <custom-select
            v-if="archetypeOptions"
            ref="archetype"
            :label="archetypeLabel"
            :items="archetypeOptions"
            item-text="title"
            item-value="title"
            :custom="character.custom.archetype"
            v-model="character.archetype"
            @customize="customize('class')"
          ></custom-select>

          <v-checkbox
            class="pa-0"
            label="Enable Multiclass"
            v-model="character.enableMulticlass"
            @click.native="enableMulticlass()"
          ></v-checkbox>
        </v-flex>

        <!-- Class Subheader -->
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
            v-model="item.name"
            @customize="item.custom.name = !item.custom.name"
          ></custom-select>
          <v-text-field
            class="pb-0"
            label="Class Level"
            type="number"
            :max="20"
            v-model="item.level"
          ></v-text-field>
          <custom-select
            v-if="getArchetypeOptions(item.name)"
            label="Archetype"
            :items="getArchetypeOptions(item.name)"
            item-text="title"
            item-value="title"
            :custom="item.custom.archetype"
            v-model="item.archetype"
            @customize="item.custom.archetype = !item.custom.archetype"
          ></custom-select>
          <div
            v-if="character.multiclass.length > 1"
            class="flexbox justify-end"
          >
            <v-btn icon
            @click="removeMulticlass(index)">
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
          <v-divider></v-divider>
        </v-flex>
        <v-btn
          v-if="character.enableMulticlass"
          flat
          @click="addMultiClass()"
        >
          Add Multiclass
        </v-btn>

      </v-layout>
    </v-card-text>

    <!-- Card Actions -->
    <v-card-actions>
      <v-btn
        class="primary"
        @click="signup()"
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
 * @desc User Creates a new character
 */
import Validation from '../../../mixins/Validation'
import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'new-character',

  // Mixins
  mixins: [Validation],

  // Components
  components: {
    CustomSelect
  },

  // Data
  data () {
    return {
      character: {
        name: undefined,
        level: 1,
        experience: 0,
        race: undefined,
        subrace: undefined,
        class: undefined,
        archetype: undefined,
        enableMulticlass: false,
        multiclass: [],
        custom: {
          race: false,
          subrace: false,
          class: false,
          archetype: false
        }
      },
      loading: false,
      multiclassTemplate: {
        name: undefined,
        level: 1,
        archetype: undefined,
        specialization: undefined,
        custom: {
          name: false,
          archetype: false,
          specialization: false
        }
      }
    }
  },

  // Computed
  computed: {
    races () {
      return this.$store.state.gameData.races
    },
    classes () {
      return this.$store.state.gameData.classes
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
    /**
     * Signup
     * @desc sign the user up with email / password
     * Assign their display name after successful signup
     */
    async signup () {
      try {
        this.loading = true
        await this.validate()
        const data = await this.$firebase.auth()
          .createUserWithEmailAndPassword(this.email, this.password)
        await data.updateProfile({
          displayName: this.displayName
        })
        this.$router.push('/profile')
        this.$bus.$emit('toast', `Created the user ${data.email}`)
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    },

    customize (field) {
      this.character[field] = undefined
      this.character.custom[field] = !this.character.custom[field]
      this.$nextTick(() => {
        if (this.character.custom[field] && this.$refs[field]) {
          this.$refs[field].$refs.input.focus()
        }
      })
    },

    enableMulticlass () {
      if (this.character.enableMulticlass) {
        if (this.character.multiclass.length === 0) {
          this.character.multiclass.push({...this.multiclassTemplate})
        }
      } else {
        this.character.multiclass = []
      }
    },

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
    },

    addMultiClass () {
      this.character.multiclass.push({...this.multiclassTemplate})
    },

    removeMulticlass (index) {
      this.character.multiclass.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.custom {
  display: flex;
}
</style>
