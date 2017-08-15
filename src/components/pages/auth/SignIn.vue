<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-0">Sign In</h3>
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
              :error-messages="getError('email')"
            ></v-text-field>
          </v-flex>

          <!-- Email -->
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

      <v-card-actions>
        <v-btn
          class="primary"
          @click="login()"
        >
          Sign In
        </v-btn>
        <v-btn
          flat
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
 * <sign-in></sign-in>
 * @desc User can sign in to firebase
 */
export default {
  // Name
  name: 'sign-in',

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {
      email: undefined,
      password: undefined
    }
  },

  // Computed
  computed: {},

  // Watch
  watch: {},

  // Methods
  methods: {
    async login () {
      try {
        const valid = await this.$validator.validate()
        if (!valid) { throw this.$validator.all() }
        const data = await this.$firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // console.log(test)
        this.$bus.$emit('toast', `Signed in as ${data.email}`)
      } catch (error) {
        // console.warn(error)
      }
    },

    getError (field) {
      const error = this.errors.first(field)
      return error ? [error] : undefined
    }
  },

  // Created
  created () {},

  // Mounted
  mounted () {}
}
</script>

<style scoped lang="scss">
</style>
