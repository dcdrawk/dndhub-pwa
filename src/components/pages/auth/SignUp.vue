<template>
  <!-- Card -->
  <v-card>
    <!-- Card Title -->
    <v-card-title primary-title>
      <h3 class="headline mb-0">Sign Up</h3>
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
            v-validate="'required|email'"
            :error-messages="getError('email')"
          ></v-text-field>
        </v-flex>

        <!-- Display Name -->
        <v-flex xs12>
          <v-text-field
            class="pb-0"
            name="display_name"
            label="Display Name"
            v-model="displayName"
            v-validate="'required'"
            :error-messages="getError('display_name')"
          ></v-text-field>
        </v-flex>

        <!-- Password -->
        <v-flex xs12>
          <v-text-field
            class="pb-0"
            name="password"
            label="Password"
            type="password"
            v-model="password"
            v-validate="'required|confirmed:confirm_password'"
            :error-messages="getError('password')"
          ></v-text-field>
        </v-flex>

        <!-- Confirm Password -->
        <v-flex xs12>
          <v-text-field
            class="pb-0"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"
            v-validate="'required'"
            :error-messages="getError('confirm_password')"
            autocomplete="false"
          ></v-text-field>
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
        Sign Up
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
      email: undefined,
      password: undefined,
      displayName: undefined,
      confirmPassword: undefined,
      loading: false
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
</style>
