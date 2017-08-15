<template>
  <!-- Toolbar -->
  <v-toolbar dark dense class="primary">

    <!-- Toolbar Menu Icon -->
    <v-toolbar-side-icon
      @click.stop="$emit('toggle')"
    ></v-toolbar-side-icon>

    <!-- Title -->
    <v-toolbar-title class="white--text">
      DnD Hub - {{$route.name}}
    </v-toolbar-title>

    <!-- Spaces -->
    <v-spacer></v-spacer>
    <v-menu v-if="user" class="mr-2" bottom left>
      <v-btn icon slot="activator">
        <v-icon >more_vert</v-icon>
      </v-btn>
      <!-- <v-btn primary dark slot="activator">Dropdown</v-btn> -->
      <v-list>
        <v-list-tile
          @click="signout"
        >
          <v-list-tile-action>
            <v-icon>
              exit_to_app
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Sign Out
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
/**
 * <toolbar></toolbar>
 * @desc toolbar, has user signout menu (if logged in)
 */
export default {
  // Name
  name: 'toolbar',

  // Computed
  computed: {
    user () { return this.$store.state.user }
  },

  // Methods
  methods: {
    async signout () {
      try {
        await this.$firebase.auth().signOut()
        this.$router.push('/sign-in')
        this.$bus.$emit('toast', 'Signed out successfully.')
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
