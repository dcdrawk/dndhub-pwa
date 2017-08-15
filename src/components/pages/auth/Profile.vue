<template>
  <!-- Card -->
  <v-card>

    <!-- Card Title -->
    <v-card-title>
      <h3 class="headline ma-0">Profile</h3>
    </v-card-title>

    <!-- Card Text -->
    <v-card-text v-if="user">
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

    <!-- Card Actions -->
    <v-card-actions>
      <!-- Edit Button -->
      <div v-if="!edit">
        <v-btn
          flat
          class="mr-0"
          @click="editUser()"
        >
          Edit
        </v-btn>
      </div>
      <!-- Save / Cancel Buttons -->
      <div v-else>
        <v-btn
          class="primary mr-0"
          :loading="loading"
          @click="updateUser()"
        >
          Save
        </v-btn>
        <v-btn
          flat
          :disabled="loading"
          @click="cancelEdit()"
        >
          Cancel
        </v-btn>
      </div>
    </v-card-actions>

    <!-- Progress Bar -->
    <v-progress-linear
      indeterminate
      v-if="!user"
    ></v-progress-linear>
  </v-card>
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

  // Methods
  methods: {
    /**
     * Edit User
     * @desc copy the user, set edit to true
     */
    editUser  () {
      this.userCopy = {...this.user}
      this.edit = true
    },

    /**
     * Update User
     * @desc update the user in firebase
     */
    async updateUser () {
      try {
        this.loading = true
        await this.validate()
        await this.$firebase.auth().currentUser
          .updateProfile(this.userCopy)
        this.$store.commit('update_user', this.userCopy)
        this.$bus.$emit('toast', 'Profile updated.')
        this.edit = false
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Cancel Edit
     * @desc Stop editing
     */
    cancelEdit () {
      this.edit = false
    }
  }
}
</script>

<style scoped lang="scss">
</style>
