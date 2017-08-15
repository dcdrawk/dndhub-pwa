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
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn class="primary">Sign In</v-btn>
        <v-btn flat>Sign Up</v-btn>
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
