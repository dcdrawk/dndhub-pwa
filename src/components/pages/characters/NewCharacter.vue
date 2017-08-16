<template>
  <!-- Card -->
  <v-card>
    <!-- Card Text -->
    <v-card-text>
      <v-layout row wrap>
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
        <!-- <v-divider></v-divider> -->
        <h3 class="subheader ma-0 pl-1 pa-0">
          Race
        </h3>
        <!-- Race -->
        <v-flex xs12 class="custom">
          <v-select
            class="pb-0"
            label="Race"
            :items="races"
            item-text="name"
            item-value="name"
            v-model="character.race"
            bottom
          ></v-select>
          <v-btn icon class="mb-0 mt-3">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-flex>
        <!-- Confirm Password -->
        <v-flex xs12 class="custom">
          <v-select
            class="pb-0"
            label="Subrace"
            :items="subraces"
            item-text="name"
            item-value="name"
            v-model="character.subrace"
            bottom
          ></v-select>
          <v-btn icon class="mb-0 mt-3">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-flex>
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
 * <sign-up></sign-up>
 * @desc User can sign up for dndhub
 */
import Validation from '../../../mixins/Validation'

export default {
  // Name
  name: 'sign-up',

  // Mixins
  mixins: [Validation],

  // Data
  data () {
    return {
      character: {
        name: undefined,
        level: 1,
        experience: 0,
        race: undefined,
        subrace: undefined
      },
      // email: undefined,
      // password: undefined,
      // displayName: undefined,
      // confirmPassword: undefined,
      loading: false
    }
  },

  // Computed
  computed: {
    races () {
      return this.$store.state.gameData.races
    },
    subraces () {
      const race = this.character.race
      if (race) {
        for (let i in this.races) {
          if (race === this.races[i].name) {
            return this.races[i].subraces
          }
        }
        // this.races.forea
        // return this.
      }
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
    }
  }
}
</script>

<style scoped lang="scss">
.custom {
  display: flex;
}
</style>
