<template>
  <!-- Card -->
  <v-card>
    <!-- Card Title -->
    <v-card-title primary-title>
      <h3 class="headline mb-0">Sign In</h3>
    </v-card-title>

    <!-- Card Text -->
    <v-card-text>
      <v-layout row wrap>
        <!-- Email -->
        <v-flex xs12>
          <v-text-field
            class="pb-0"
            name="email"
            label="Email"
            v-model="email"
            v-validate="'required'"
            :error-messages="getError('email')"
          ></v-text-field>
        </v-flex>

        <!-- Password -->
        <v-flex xs12>
          <v-text-field
            class="pb-0"
            name="password"
            label="Password"
            id="testing"
            type="password"
            v-model="password"
            v-validate="'required'"
            :error-messages="getError('password')"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <!-- Card Actions -->
    <v-card-actions>
      <v-btn
        class="primary"
        @click="login()"
        :loading="loading"
      >
        Sign In
      </v-btn>
      <v-btn
        flat
        to="/sign-up"
      >
        Sign Up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/**
 * <sign-in></sign-in>
 * @desc User can sign in to firebase
 */
import Validation from '../../../mixins/Validation'
export default {
  // Name
  name: 'sign-in',

  // Mixins
  mixins: [Validation],

  // Data
  data () {
    return {
      email: undefined,
      password: undefined,
      loading: false
    }
  },

  // Methods
  methods: {
    /**
     * Login
     * @desc Sign in to firebase using email / password
     */
    async login () {
      try {
        this.loading = true
        await this.validate()
        const data = await this.$firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
        this.$router.push('/profile')
        this.$bus.$emit('toast', `Signed in as ${data.email}`)
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
</style>
