<template>
  <v-card>
    <v-progress-linear
      indeterminate
      v-if="loading || !user"
    ></v-progress-linear>
    <v-card-title>
      <h3 class="headline ma-0">Profile</h3>
    </v-card-title>
    <v-card-text v-if="user">
      <!-- Test -->
      <v-layout row wrap>
        <!-- Email -->
        <v-flex xs12>
          <v-text-field
            class="pb-0"
            name="email"
            label="Email"
            v-model="!edit ? user.email : userCopy.email"
            :readonly="!edit"
            v-validate="'required'"
            :error-messages="getError('email')"
          ></v-text-field>
        </v-flex>

        <!-- Display Name -->
        <v-flex xs12>
          <v-text-field
            class="pb-0"
            name="display_name"
            label="Display Name"
            v-model="!edit ? user.displayName : userCopy.displayName"
            :readonly="!edit"
            v-validate="'required'"
            :error-messages="getError('display_name')"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <div v-if="!edit">
        <v-btn
          flat
          class="mr-0"
          @click="editUser()"
        >
          Edit
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          class="primary mr-0"
          @click="updateUser()"
        >
          Save
        </v-btn>
        <v-btn
          flat
          @click="cancelEdit()"
        >
          Cancel
        </v-btn>
      </div>
      </v-card-actions>
  </v-card>
  <!-- <v-list two-line subheader>
    <v-subheader>General</v-subheader>
    <v-list-tile avatar>
      <v-list-tile-content>
        <v-list-tile-title>Profile photo</v-list-tile-title>
        <v-list-tile-sub-title>Change your Google+ profile photo</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile avatar>
      <v-list-tile-content>
        <v-list-tile-title>Show your status</v-list-tile-title>
        <v-list-tile-sub-title>Your status is visible to everyone</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list> -->
</template>

<script>
/**
 * <profile></profile>
 * @desc user profile / settings
 */
import Validation from '../../../mixins/Validation'
export default {
  // Name
  name: 'profile',

  // Mixins
  mixins: [Validation],

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {
      edit: false,
      userCopy: undefined,
      loading: false
    }
  },

  // Computed
  computed: {
    user () { return this.$store.state.user }
  },

  // Watch
  watch: {},

  // Methods
  methods: {
    editUser  () {
      this.edit = true
      this.userCopy = {...this.user}
      console.log(this.userCopy)
    },

    async updateUser () {
      try {
        await this.validate()
        await this.$firebase.auth().currentUser
          .updateProfile(this.userCopy)
        this.$store.commit('update_user', this.userCopy)
        this.$bus.$emit('toast', 'Profile updated.')
        this.edit = false
      } catch (error) {
        console.warn(error)
      }
    },

    cancelEdit () {
      this.edit = false
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
