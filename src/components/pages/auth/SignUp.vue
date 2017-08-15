<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-0">Sign Up</h3>
      </v-card-title>
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
              autocomplete="false"
              :error-messages="getError('email')"
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
              autocomplete="false"
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

      <v-card-actions>
        <v-btn
          class="primary"
          @click="signup()"
        >
          Sign Up
        </v-btn>
        <!-- <v-btn flat class="orange--text">Explore</v-btn> -->
      </v-card-actions>

    </v-card>
  </div>
</template>

<script>
/**
 * <sign-up></sign-up>
 * @desc User can sign up for dndhub
 */
export default {
  // Name
  name: 'sign-up',

  // Data
  data () {
    return {
      email: undefined,
      password: undefined,
      confirmPassword: undefined
    }
  },

  // Methods
  methods: {
    async signup () {
      try {
        const valid = await this.$validator.validate()
        console.log(this.$validator)
        if (!valid) { throw this.errors.all() }
        const data = await this.$firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        this.$bus.$emit('toast', `Created the user ${data.email}`)
      } catch (error) {
        console.warn(error)
      }
    },

    getError (field) {
      const error = this.errors.first(field)
      return error ? [error] : undefined
    }
  }
}
</script>

<style scoped lang="scss">
</style>
